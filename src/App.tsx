import React from 'react';
import { motion } from 'motion/react';
import { 
  Calendar, 
  Clock, 
  Users, 
  Lightbulb, 
  HeartPulse, 
  GraduationCap, 
  ShieldCheck, 
  Globe, 
  Leaf, 
  Zap,
  ChevronDown,
} from 'lucide-react';
import { RegistrationForm } from './components/RegistrationForm';

const ISEF_BLUE = '#1B2F6E';
const ISEF_ORANGE = '#F5821F';

const challenges = [
  { id: 1, title: 'רפואה ובריאות דיגיטלית', icon: HeartPulse, desc: 'שיפור קבלת החלטות רפואיות, רצף טיפולי וחוויית עבודה של צוותים רפואיים.' },
  { id: 2, title: 'בריאות, רווחה ואיכות חיים', icon: Zap, desc: 'שיפור איכות החיים והרווחה של אנשים וקהילות בעזרת פתרונות חכמים.' },
  { id: 3, title: 'חינוך וכלים לדור הבא', icon: GraduationCap, desc: 'הענקת כלים, מיומנויות והזדמנויות שיאפשרו לדור הבא להוביל.' },
  { id: 4, title: 'שירותים ציבוריים חכמים (GovTech)', icon: Globe, desc: 'הפיכת שירותים ציבוריים לפשוטים יותר, נגישים יותר ושקופים יותר.' },
  { id: 5, title: 'חוסן קהילתי ושייכות', icon: ShieldCheck, desc: 'חיזוק חוסן חברתי, תחושת שייכות וקשרים בין אנשים.' },
  { id: 6, title: 'קיימות ותשתיות חיים', icon: Leaf, desc: 'התמודדות עם אתגרי קיימות ותשתיות כחלק מהחיים היומיומיים.' },
];

const schedule = [
  { time: '09:00', event: 'התכנסות וקפה' },
  { time: '09:30', event: 'פתיחה רשמית: מה זה ISEF 2045 Hackathon' },
  { time: '09:45', event: 'הצגת אתגרי הליבה' },
  { time: '10:00', event: 'במה פתוחה לרעיונות (60 שניות לרעיון)' },
  { time: '10:20', event: 'ספרינט 1: מיקוד מוצר והצעת ערך' },
  { time: '11:00', event: 'ספרינט 2: בניית אבטיפוס (Figma / POC ראשוני)' },
  { time: '12:30', event: 'סבב מנטורים 1: חידוד פתרון' },
  { time: '13:00', event: 'הפסקת צהריים ונטוורקינג' },
  { time: '13:30', event: 'ספרינט 3: Demo Ready' },
  { time: '15:30', event: 'ספרינט 4: Pitch Build' },
  { time: '16:30', event: 'סבב מנטורים 2: חידוד הפיץ׳' },
  { time: '17:00', event: 'Demo Day: הצגות מול שופטים' },
  { time: '19:00', event: 'הכרזה על זוכים ומה הלאה' },
  { time: '20:00', event: 'סיום' },
];

const timeline = [
  { date: 'מאי 2026', title: 'מפגש חיבור צוותים', desc: 'מפגש מקדים לבניית צוותים, חידוד רעיונות והיכרות בין משתתפים. מי שאין לו צוות — זה המקום למצוא אחד.' },
  { date: 'יוני 2026', title: 'יום ההאקתון', desc: 'יום שלם של עשייה — מהבוקר עד הערב. מגיעים עם סקרנות, יוצאים עם אבטיפוס ודמו.' },
];

export default function App() {
  const scrollToRegister = () => {
    document.getElementById('register')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen font-sans">

      {/* Hero */}
      <header className="relative h-screen flex items-center justify-center overflow-hidden text-white" style={{ backgroundColor: ISEF_BLUE }}>
        <div className="absolute inset-0 opacity-10">
          <img
            src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=1920"
            alt=""
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* ISEF Logo */}
        <div className="absolute top-6 right-8 z-20">
          <img
            src="https://upload.wikimedia.org/wikipedia/he/thumb/6/6e/ISEF_Logo.png/320px-ISEF_Logo.png"
            alt="ISEF Logo"
            className="h-14 object-contain"
            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
          />
        </div>

        <div className="relative z-10 container mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span className="inline-block px-4 py-1 font-bold mb-6 text-sm tracking-widest uppercase" style={{ backgroundColor: ISEF_ORANGE, color: 'white' }}>
              ISEF 2045 HACKATHON
            </span>
            <h1 className="text-5xl md:text-7xl font-black mb-4 tracking-tighter leading-tight">
              הופכים רעיונות<br />לפתרונות אמיתיים
            </h1>
            <p className="text-lg md:text-xl mb-4 max-w-2xl mx-auto font-medium text-blue-100">
              האקתון יומי לבוגרי ולסטודנטי אייסף — מגיעים עם רעיון, יוצאים עם מוצר שעובד.
            </p>
            <p className="text-md mb-10 max-w-xl mx-auto font-medium" style={{ color: ISEF_ORANGE }}>
              חוששים מיזמות? לא יודעים מאיפה להתחיל? בדיוק בשבילכם 👇
            </p>
            <button
              onClick={scrollToRegister}
              className="font-bold text-xl px-10 py-4 transition-all hover:opacity-90"
              style={{ backgroundColor: ISEF_ORANGE, color: 'white', border: `3px solid ${ISEF_ORANGE}` }}
            >
              הירשמו עכשיו
            </button>
          </motion.div>
          <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="absolute bottom-10 left-1/2 -translate-x-1/2">
            <ChevronDown className="w-8 h-8" />
          </motion.div>
        </div>
      </header>

      {/* About */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl font-black tracking-tight" style={{ color: ISEF_BLUE }}>
                זה לא עוד כנס של מצגות ודיבורים
              </h2>
              <p className="text-lg text-zinc-600 leading-relaxed">
                האקתון ISEF 2045 הוא יום שלם של עשייה — ספרינטים ממוקדים, מנטורים צמודים, וצוותים מעורבים של בוגרים וסטודנטים. מגיעים עם סקרנות, יוצאים עם אבטיפוס מוכן להצגה (MVP — מוצר ראשוני עובד).
              </p>
              <p className="text-lg text-zinc-600 leading-relaxed">
                לא צריך ניסיון בסטארטאפים. לא צריך רעיון מוכן. צריך רק רצון לנסות.
              </p>
              <div className="grid grid-cols-3 gap-4 pt-4">
                {[['יום שלם', '9:00–20:00'], ['4–6', 'חברים בצוות'], ['MVP', 'תוצר מוחשי']].map(([val, label]) => (
                  <div key={label} className="p-4 border-r-4 bg-zinc-50" style={{ borderColor: ISEF_ORANGE }}>
                    <div className="font-black text-2xl mb-1" style={{ color: ISEF_BLUE }}>{val}</div>
                    <div className="text-xs font-bold uppercase tracking-wider text-zinc-500">{label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square overflow-hidden" style={{ border: `3px solid ${ISEF_BLUE}`, boxShadow: `8px 8px 0 ${ISEF_ORANGE}` }}>
                <img
                  src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=1000"
                  alt="Team working"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24" style={{ backgroundColor: ISEF_BLUE }}>
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-black text-center text-white mb-16">לו״ז הדרך להאקתון</h2>
          <div className="max-w-2xl mx-auto space-y-0">
            {timeline.map((item, i) => (
              <div key={i} className="flex gap-8 items-start">
                <div className="flex flex-col items-center">
                  <div className="w-4 h-4 rounded-full mt-1" style={{ backgroundColor: ISEF_ORANGE }} />
                  {i < timeline.length - 1 && <div className="w-0.5 h-24" style={{ backgroundColor: ISEF_ORANGE, opacity: 0.4 }} />}
                </div>
                <div className="pb-12">
                  <div className="font-bold mb-1" style={{ color: ISEF_ORANGE }}>{item.date}</div>
                  <h3 className="text-xl font-black text-white mb-2">{item.title}</h3>
                  <p className="text-blue-200">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Challenges */}
      <section className="py-24 bg-zinc-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-4" style={{ color: ISEF_BLUE }}>אתגרי הליבה</h2>
            <p className="text-zinc-600 max-w-2xl mx-auto">בחרו אתגר אחד, זהו נקודת כאב ברורה, והתמקדו בפתרון שניתן לבנייה ולהדגמה.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {challenges.map((c) => (
              <motion.div key={c.id} whileHover={{ y: -5 }} className="bg-white p-8 group" style={{ border: `2px solid ${ISEF_BLUE}`, boxShadow: `4px 4px 0 ${ISEF_ORANGE}` }}>
                <div className="w-12 h-12 flex items-center justify-center mb-6 transition-colors" style={{ backgroundColor: ISEF_BLUE, color: 'white' }}>
                  <c.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-3" style={{ color: ISEF_BLUE }}>{c.title}</h3>
                <p className="text-zinc-600 text-sm leading-relaxed">{c.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Schedule */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-black mb-4 text-center" style={{ color: ISEF_BLUE }}>לו״ז יום ההאקתון</h2>
          <p className="text-center text-zinc-500 mb-16">9:00–20:00 | יום שלם של עשייה</p>
          <div className="max-w-3xl mx-auto">
            {schedule.map((item, i) => (
              <div key={i} className="flex items-center gap-8 py-4 border-b border-zinc-100 group">
                <div className="w-16 font-mono text-lg font-bold text-zinc-400 group-hover:transition-colors" style={{ color: undefined }}>
                  <span className="group-hover:text-orange-500 transition-colors">{item.time}</span>
                </div>
                <div className="flex-1 font-bold text-lg group-hover:text-zinc-900">{item.event}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Registration */}
      <section id="register" className="py-24" style={{ backgroundColor: '#FFF8F0' }}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-6xl font-black mb-4 tracking-tight" style={{ color: ISEF_BLUE }}>
              מוכנים לבנות את העתיד?
            </h2>
            <p className="text-xl font-bold text-zinc-600">הצטרפו אלינו ליום שלם של חדשנות, יצירה ומשמעות.</p>
          </div>
          <RegistrationForm />
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 text-white" style={{ backgroundColor: ISEF_BLUE }}>
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-center md:text-right">
              <h3 className="text-2xl font-black mb-1">ISEF 2045</h3>
              <p className="text-blue-300 text-sm">מצוינות עם משמעות. בונים את ישראל של המחר.</p>
            </div>
            <div className="flex flex-col items-center gap-2 text-sm text-center">
              <span className="text-blue-300">לפרטים נוספים:</span>
              <a href="mailto:anat@isef.org.il" className="font-bold hover:opacity-80 transition-opacity" style={{ color: ISEF_ORANGE }}>
                ענת רודוניה שאשא — anat@isef.org.il
              </a>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-blue-800 text-center text-blue-400 text-xs">
            © 2026 ISEF Foundation. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
