import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error : 'Method not allowed' });

  try {
    console.log('handler started');

    const data = req.body;
    console.log('incoming data keys:', Object.keys(data || {}));
    console.log('incoming status:', data?.status);

    const client_email = process.env.GOOGLE_CLIENT_EMAIL;
    const private_key = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');
    const sheetId = process.env.GOOGLE_SHEET_ID;

    console.log('has client email:', !!client_email);
    console.log('has private key:', !!private_key);
    console.log('has sheet id:', !!sheetId);

    if (!client_email || !private_key || !sheetId) {
      return res.status(500).json({ error : 'Missing Google environment variables' });
    }

    const token = jwt.sign(
      {
        iss : client_email,
        scope : 'https://www.googleapis.com/auth/spreadsheets',
        aud : 'https://oauth2.googleapis.com/token',
        exp : Math.floor(Date.now() / 1000) + 3600,
        iat : Math.floor(Date.now() / 1000),
      },
      private_key,
      { algorithm : 'RS256' }
    );

    const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
      method : 'POST',
      headers : { 'Content-Type' : 'application/x-www-form-urlencoded' },
      body : new URLSearchParams({
        grant_type : 'urn:ietf:params:oauth:grant-type:jwt-bearer',
        assertion : token,
      }),
    });

    const tokenData = await tokenRes.json();
    console.log('token response:', tokenData);

    if (!tokenData.access_token) {
      console.error('Token error:', tokenData);
      return res.status(500).json({ error : 'Token failed', details : tokenData });
    }

    const accessToken = tokenData.access_token;

    const graduatesLink = 'https://live.payme.io/sale/template/SALE1774-602901WM-MDBG3GV8-65VKIUXZ';
    const studentsLink = 'https://live.payme.io/sale/template/SALE1774-6028450H-7MVRQMBF-0NIP3KXR';

    const isStudent = data.status === 'סטודנט/ית אייסף';

    const paymentAmount = isStudent ? 50 : 100;
    const paymentLink = isStudent ? studentsLink : graduatesLink;

    const now = new Date().toLocaleString('he-IL', { timeZone : 'Asia/Jerusalem' });

    const row = [
      now,
      data.fullName || '',
      data.phone || '',
      data.email || '',
      data.status || '',
      data.institution || '',
      data.city || '',
      Array.isArray(data.challenges) ? data.challenges.join(', ') : (data.challenges || ''),
      data.role || '',
      data.hasIdea || '',
      data.ideaDescription || '',
      data.wantsToLead || '',
      data.teamPreference || '',
      data.partnerName || '',
      data.webinar1 ? 'כן' : 'לא',
      data.webinar2 ? 'כן' : 'לא',
      data.preferredTime || '',
      'כן',
      paymentAmount,
      paymentLink,
      'ממתין לתשלום',
    ];

    console.log('row to append:', row);

    const appendRes = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/A:U:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`,
      {
        method : 'POST',
        headers : {
          Authorization : `Bearer ${accessToken}`,
          'Content-Type' : 'application/json',
        },
        body : JSON.stringify({ values : [row] }),
      }
    );

    const result = await appendRes.json();
    console.log('append response ok:', appendRes.ok);
    console.log('append response body:', result);

    if (!appendRes.ok) {
      console.error('Sheets error:', result);
      return res.status(500).json({ error : 'Sheets failed', details : result });
    }

    return res.status(200).json({
      success : true,
      paymentAmount,
      paymentLink,
      sheetsResult : result,
    });
  } catch (err) {
    console.error('Handler crash:', err);
    return res.status(500).json({ error : err.message });
  }
}
