import React from 'react';

const ISEF_BLUE = '#1B2F6E';
const ISEF_ORANGE = '#F5821F';

const GRADUATES_PAYMENT_LINK = 'https://live.payme.io/sale/template/SALE1774-602901WM-MDBG3GV8-65VKIUXZ';
const STUDENTS_PAYMENT_LINK = 'https://live.payme.io/sale/template/SALE1774-6028450H-7MVRQMBF-0NIP3KXR';

export function RegistrationForm() {
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submittedStatus, setSubmittedStatus] = React.useState('');

  if (isSubmitted) {
    const paymentLink = submittedStatus === 'סטודנט/ית אייסף' ? STUDENTS_PAYMENT_LINK : GRADUATES_PAYMENT_LINK;
    const paymentLabel = submittedStatus === 'סטודנט/ית אייסף'
      ? 'לתשלום 50 ש״ח לסטודנטים'
      : 'לתשלום 100 ש״ח לבוגרים';

    return (
      <div
        style={{
          padding : '40px',
          textAlign : 'center',
          backgroundColor : '#f0fdf4',
          border : '2px solid #22c55e',
          borderRadius : '12px',
          maxWidth : '600px',
          margin : '0 auto',
        }}
      >
        <div style={{ fontSize : '3rem', marginBottom : '12px' }}>🎉</div>
        <h3 style={{ fontSize : '1.5rem', fontWeight : 'bold', color : ISEF_BLUE, marginBottom : '8px' }}>
          תודה שנרשמת!
        </h3>
        <p style={{ color : '#166534', marginBottom : '20px', lineHeight : 1.6 }}>
          הפרטים שלך התקבלו. כדי להשלים את ההרשמה יש לבצע תשלום לפי הסטטוס שבחרת.
        </p>

        <a
          href={paymentLink}
          target="_blank"
          rel="noreferrer"
          style={{
            display : 'inline-block',
            padding : '14px 24px',
            textDecoration : 'none',
            backgroundColor : ISEF_ORANGE,
            color : ISEF_BLUE,
            fontWeight : 'bold',
            borderRadius : '12px',
          }}
        >
          {paymentLabel}
        </a>
      </div>
    );
  }

  const onSubmit = async (event : React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);

    const data = {
      fullName : String(formData.get('fullName') || ''),
      email : String(formData.get('email') || ''),
      phone : String(formData.get('phone') || ''),
      status : String(formData.get('status') || ''),
      institution : String(formData.get('institution') || ''),
      city : '',
      challenges : String(formData.get('challenge') || ''),
      role : String(formData.get('background') || ''),
      hasIdea : 'לא',
      ideaDescription : '',
      wantsToLead : '',
      teamPreference : String(formData.get('arrivingWithTeam') || ''),
      partnerName : String(formData.get('teamDetails') || ''),
      webinar1 : false,
      webinar2 : false,
      preferredTime : '',
      linkedin : String(formData.get('linkedin') || ''),
      participatedBefore : String(formData.get('participatedBefore') || ''),
      arrivingWithTeam : String(formData.get('arrivingWithTeam') || ''),
      teamDetails : String(formData.get('teamDetails') || ''),
      challenge : String(formData.get('challenge') || ''),
      background : String(formData.get('background') || ''),
      motivation : String(formData.get('motivation') || ''),
      notes : String(formData.get('notes') || ''),
    };

    try {
      const response = await fetch('/api/register', {
        method : 'POST',
        headers : {
          'Content-Type' : 'application/json',
        },
        body : JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        console.error('Error submitting form:', result);
        alert('אירעה שגיאה בשליחת הטופס. נסו שוב.');
        return;
      }

      setSubmittedStatus(data.status);
      setIsSubmitted(true);
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('אירעה שגיאה בשליחת הטופס. נסו שוב.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      style={{
        maxWidth : '900px',
        margin : '0 auto',
        backgroundColor : 'white',
        borderRadius : '16px',
        padding : '32px',
        boxShadow : '0 10px 30px rgba(0,0,0,0.08)',
      }}
    >
      <div style={{ display : 'grid', gap : '20px' }}>
        <div>
          <label style={{ display : 'block', marginBottom : '8px', fontWeight : 'bold', color : ISEF_BLUE }}>
            שם מלא
          </label>
          <input
            name="fullName"
            type="text"
            required
            style={inputStyle}
          />
        </div>

        <div style={twoColsStyle}>
          <div>
            <label style={labelStyle}>אימייל</label>
            <input name="email" type="email" required style={inputStyle} />
          </div>

          <div>
            <label style={labelStyle}>טלפון</label>
            <input name="phone" type="tel" required style={inputStyle} />
          </div>
        </div>

        <div style={twoColsStyle}>
          <div>
            <label style={labelStyle}>אני...</label>
            <select name="status" required style={inputStyle}>
              <option value="">בחר/י</option>
              <option value="בוגר/ת אייסף">בוגר/ת אייסף</option>
              <option value="סטודנט/ית אייסף">סטודנט/ית אייסף</option>
              <option value="אחר">אחר</option>
            </select>
          </div>

          <div>
            <label style={labelStyle}>מוסד לימודים / מקום עבודה</label>
            <input name="institution" type="text" style={inputStyle} />
          </div>
        </div>

        <div>
          <label style={labelStyle}>LinkedIn</label>
          <input name="linkedin" type="url" style={inputStyle} />
        </div>

        <div style={twoColsStyle}>
          <div>
            <label style={labelStyle}>השתתפת בעבר בהאקתון?</label>
            <select name="participatedBefore" style={inputStyle}>
              <option value="">בחר/י</option>
              <option value="כן">כן</option>
              <option value="לא">לא</option>
            </select>
          </div>

          <div>
            <label style={labelStyle}>מגיע/ה עם צוות?</label>
            <select name="arrivingWithTeam" style={inputStyle}>
              <option value="">בחר/י</option>
              <option value="כן">כן</option>
              <option value="לא">לא</option>
            </select>
          </div>
        </div>

        <div>
          <label style={labelStyle}>אם כן, פרטי צוות / שמות חברים</label>
          <textarea name="teamDetails" rows={3} style={textareaStyle} />
        </div>

        <div>
          <label style={labelStyle}>באיזה אתגר תרצה/י להתמקד?</label>
          <select name="challenge" style={inputStyle}>
            <option value="">בחר/י</option>
            <option value="רפואה ובריאות דיגיטלית">רפואה ובריאות דיגיטלית</option>
            <option value="בריאות, רווחה ואיכות חיים">בריאות, רווחה ואיכות חיים</option>
            <option value="חינוך וכלים לדור הבא">חינוך וכלים לדור הבא</option>
            <option value="שירותים ציבוריים חכמים (GovTech)">שירותים ציבוריים חכמים (GovTech)</option>
            <option value="חוסן קהילתי ושייכות">חוסן קהילתי ושייכות</option>
            <option value="קיימות ותשתיות חיים">קיימות ותשתיות חיים</option>
          </select>
        </div>

        <div>
          <label style={labelStyle}>רקע מקצועי / אקדמי</label>
          <textarea name="background" rows={4} style={textareaStyle} />
        </div>

        <div>
          <label style={labelStyle}>למה מעניין אותך להשתתף?</label>
          <textarea name="motivation" rows={4} style={textareaStyle} />
        </div>

        <div>
          <label style={labelStyle}>הערות נוספות</label>
          <textarea name="notes" rows={3} style={textareaStyle} />
        </div>

        <div
          style={{
            backgroundColor : '#FFF8F0',
            border : `1px solid rgba(27,47,110,0.12)`,
            borderRadius : '12px',
            padding : '16px',
            textAlign : 'center',
          }}
        >
          <div style={{ fontWeight : 'bold', color : ISEF_BLUE, marginBottom : '6px' }}>דמי השתתפות</div>
          <div style={{ color : '#52525b', lineHeight : 1.7 }}>
            בוגרים - 100 ש״ח<br />
            סטודנטים - 50 ש״ח
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          style={{
            border : 'none',
            borderRadius : '14px',
            padding : '16px 24px',
            backgroundColor : ISEF_ORANGE,
            color : ISEF_BLUE,
            fontSize : '1.1rem',
            fontWeight : 'bold',
            cursor : isSubmitting ? 'not-allowed' : 'pointer',
            opacity : isSubmitting ? 0.7 : 1,
          }}
        >
          {isSubmitting ? 'שולח...' : 'שליחת טופס'}
        </button>
      </div>
    </form>
  );
}

const labelStyle : React.CSSProperties = {
  display : 'block',
  marginBottom : '8px',
  fontWeight : 'bold',
  color : ISEF_BLUE,
};

const inputStyle : React.CSSProperties = {
  width : '100%',
  padding : '12px 14px',
  borderRadius : '10px',
  border : '1px solid #d4d4d8',
  fontSize : '1rem',
  boxSizing : 'border-box',
};

const textareaStyle : React.CSSProperties = {
  ...inputStyle,
  resize : 'vertical',
  minHeight : '90px',
};

const twoColsStyle : React.CSSProperties = {
  display : 'grid',
  gridTemplateColumns : 'repeat(auto-fit, minmax(240px, 1fr))',
  gap : '16px',
};
