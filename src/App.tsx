import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'motion/react';
import {
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

const heroImages = [
  '/images/event-1.jpeg',
  '/images/event-2.jpeg',
  '/images/event-3.jpeg',
  '/images/event-4.jpeg',
];

const aboutImages = [
  '/images/event-2.jpeg',
  '/images/event-3.jpeg',
  '/images/event-4.jpeg',
];

const challenges = [
  {
    id : 1,
    title : 'רפואה ובריאות דיגיטלית',
    icon : HeartPulse,
    shortDesc : 'שיפור קבלת החלטות רפואיות, רצף טיפולי וחוויית עבודה של צוותים רפואיים.',
    fullDesc : 'פתרונות שמייעלים תהליכים במערכת הבריאות, מחזקים רצף טיפולי, מפחיתים עומס תפעולי ומשפרים את חוויית המטופלים והצוותים. אפשר לחשוב על כלים תומכי החלטה, אוטומציה חכמה, ניווט מטופלים או פלטפורמות שמחברות טוב יותר בין גורמים שונים במערכת.',
  },
  {
    id : 2,
    title : 'בריאות, רווחה ואיכות חיים',
    icon : Zap,
    shortDesc : 'שיפור איכות החיים והרווחה של אנשים וקהילות בעזרת פתרונות חכמים.',
    fullDesc : 'אתגר זה מתמקד בפתרונות שמשפרים את חיי היום יום של אנשים וקהילות, דרך חיזוק רווחה, מניעה, נגישות ושגרה בריאה יותר. אפשר לחשוב על מוצרים לשינה, תזונה, חוסן אישי, התמודדות עם בדידות או כלים קהילתיים שמסייעים לאנשים לחיות טוב יותר.',
  },
  {
    id : 3,
    title : 'חינוך וכלים לדור הבא',
    icon : GraduationCap,
    shortDesc : 'הענקת כלים, מיומנויות והזדמנויות שיאפשרו לדור הבא להוביל.',
    fullDesc : 'פתרונות שמקדמים למידה, פיתוח מיומנויות, נגישות להזדמנויות והעצמה של צעירות וצעירים. אפשר לחשוב על כלים ללמידה מותאמת אישית, הכנה לעולם העבודה, חיזוק כישורים רכים או חיבורים חכמים בין לומדים, מנטורים והזדמנויות.',
  },
  {
    id : 4,
    title : 'שירותים ציבוריים חכמים (GovTech)',
    icon : Globe,
    shortDesc : 'הפיכת שירותים ציבוריים לפשוטים יותר, נגישים יותר ושקופים יותר.',
    fullDesc : 'מוצרים ושירותים שהופכים את המפגש עם המגזר הציבורי לברור, יעיל ונגיש יותר. אפשר לחשוב על פישוט טפסים, שיפור ניווט בין שירותים, הנגשה לאוכלוסיות מגוונות, שקיפות מידע ותהליכים שמפחיתים בירוקרטיה ומחזקים אמון.',
  },
  {
    id : 5,
    title : 'חוסן קהילתי ושייכות',
    icon : ShieldCheck,
    shortDesc : 'חיזוק חוסן חברתי, תחושת שייכות וקשרים בין אנשים.',
    fullDesc : 'פתרונות שבונים קהילה, יוצרים חיבורים משמעותיים ומחזקים תחושת שייכות, אמון וחוסן חברתי. אפשר לחשוב על פלטפורמות קהילתיות, חיבורים בין דורות, מענה לבדידות, התארגנויות מקומיות או כלים שמעודדים שיתופיות ועזרה הדדית.',
  },
  {
    id : 6,
    title : 'קיימות ותשתיות חיים',
    icon : Leaf,
    shortDesc : 'התמודדות עם אתגרי קיימות ותשתיות כחלק מהחיים היומיומיים.',
    fullDesc : 'פתרונות שעוסקים בקיימות מעשית ובתשתיות חיים חכמות מתוך מבט יומיומי ואנושי. אפשר לחשוב על צריכת אנרגיה, מזון, תחבורה, מחזור, שימוש יעיל במשאבים או שירותים עירוניים שמאפשרים חיים טובים, חכמים וברי קיימא יותר.',
  },
];

const schedule = [
  { time : '09:00', event : 'התכנסות וקפה' },
  { time : '09:30', event : 'פתיחה רשמית: מה זה ISEF 2050 Hackathon' },
  { time : '09:45', event : 'הצגת אתגרי הליבה' },
  { time : '10:00', event : 'במה פתוחה לרעיונות (60 שניות לרעיון)' },
  { time : '10:20', event : 'ספרינט 1: מיקוד מוצר והצעת ערך' },
  { time : '11:00', event : 'ספרינט 2: בניית אבטיפוס (Figma / POC ראשוני)' },
  { time : '12:30', event : 'סבב מנטורים 1: חידוד פתרון' },
  { time : '13:00', event : 'הפסקת צהריים ונטוורקינג' },
  { time : '13:30', event : 'ספרינט 3: Demo Ready' },
  { time : '15:30', event : 'ספרינט 4: Pitch Build' },
  { time : '16:30', event : 'סבב מנטורים 2: חידוד הפיץ׳' },
  { time : '17:00', event : 'Demo Day: הצגות מול שופטים' },
  { time : '19:00', event : 'הכרזה על זוכים ומה הלאה' },
  { time : '20:00', event : 'סיום' },
];

const timeline = [
  {
    date : '30.3',
    title : 'פתיחת הרשמה',
    desc : 'פתיחת טופס ההרשמה לקהילת אייסף.',
  },
  {
    date : '1.5',
    title : 'סגירת הרשמה',
    desc : 'המועד האחרון לשליחת הטופס.',
  },
  {
    date : '6.5',
    title : 'אירוע מקדים',
    desc : 'מפגש מקדים לחיבור, היכרות, גיבוש צוותים וחידוד כיוונים.',
  },
  {
    date : '28.5',
    title : 'אירוע האקתון מרכזי',
    desc : 'יום האקתון מלא של בנייה, מנטורים, דמו והצגה.',
  },
];

function useCountdown(targetDate : Date) {
  const calculate = () => {
    const now = new Date().getTime();
    const distance = targetDate.getTime() - now;

    if (distance <= 0) {
      return {
        days : 0,
        hours : 0,
        minutes : 0,
        seconds : 0,
      };
    }

    return {
      days : Math.floor(distance / (1000 * 60 * 60 * 24)),
      hours : Math.floor((distance / (1000 * 60 * 60)) % 24),
      minutes : Math.floor((distance / (1000 * 60)) % 60),
      seconds : Math.floor((distance / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculate());

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setTimeLeft(calculate());
    }, 1000);

    return () => window.clearInterval(intervalId);
  }, []);

  return timeLeft;
}

function ImageCarousel({
  images,
  interval = 4500,
  className = '',
} : {
  images : string[];
  interval? : number;
  className? : string;
}) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!images.length) return;

    const intervalId = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % images.length);
    }, interval);

    return () => window.clearInterval(intervalId);
  }, [images, interval]);

  return (
    <div className={`relative h-full w-full overflow-hidden ${className}`}>
      {images.map((src, index) => (
        <img
          key={`${src}-${index}`}
          src={src}
          alt=""
          className={`absolute inset-0 h-full w-full object-cover transition-all duration-1000 ${
            index === activeIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
          }`}
        />
      ))}
    </div>
  );
}

export default function App() {
  const countdownTarget = useMemo(() => new Date('2026-05-06T00:00:00'), []);
  const timeLeft = useCountdown(countdownTarget);

  const [timelineProgress, setTimelineProgress] = useState(0);
  const timelineRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onScroll = () => {
      if (!timelineRef.current) return;

      const rect = timelineRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const total = rect.height + viewportHeight;
      const passed = viewportHeight - rect.top;
      const progress = Math.max(0, Math.min(1, passed / total));

      setTimelineProgress(progress);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive : true });

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToRegister = () => {
    document.getElementById('register')?.scrollIntoView({ behavior : 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white font-sans text-zinc-900">
      <div
        className="sticky top-0 z-50 border-b backdrop-blur-md"
        style={{ backgroundColor : 'rgba(27, 47, 110, 0.94)', borderColor : 'rgba(255,255,255,0.08)' }}
      >
        <div className="container mx-auto flex flex-col gap-2 px-4 py-3 md:flex-row md:items-center md:justify-between">
          <div className="text-center md:text-right">
            <div className="text-sm font-black tracking-wide text-white">ההרשמה ל-ISEF 2050 נסגרת ב-6.5 בחצות</div>
            <div className="text-xs text-blue-200">מומלץ למלא את הטופס מוקדם כדי להבטיח מקום</div>
          </div>

          <div className="flex items-center justify-center gap-2 md:gap-3">
            {[
        { label : 'שניות', value : timeLeft.seconds },
        { label : 'דקות', value : timeLeft.minutes },
        { label : 'שעות', value : timeLeft.hours },
        { label : 'ימים', value : timeLeft.days },
      ].map((item) => (
              <div
                key={item.label}
                className="min-w-[70px] rounded-2xl border px-3 py-2 text-center"
                style={{ backgroundColor : 'rgba(245,130,31,0.12)', borderColor : 'rgba(245,130,31,0.32)' }}
              >
                <div className="text-2xl font-black leading-none" style={{ color : ISEF_ORANGE }}>
                  {String(item.value).padStart(2, '0')}
                </div>
                <div className="mt-1 text-[11px] font-bold text-blue-100">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <header className="relative min-h-[92vh] overflow-hidden" style={{ backgroundColor : ISEF_BLUE }}>
        <ImageCarousel images={heroImages} className="absolute inset-0 z-0" />
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/35 via-black/30 to-[#1B2F6E]/75" />

        <div className="absolute right-4 top-6 z-20 md:right-8">
          <img src="/logos/isef-white.png" alt="ISEF Logo" className="h-14 object-contain md:h-16 opacity-90" />
        </div>

        <div className="relative z-20 container mx-auto flex min-h-[92vh] items-center px-4 py-14">
          <div className="mx-auto max-w-5xl text-center">
            <motion.div initial={{ opacity : 0, y : 24 }} animate={{ opacity : 1, y : 0 }} transition={{ duration : 0.8 }}>
              <span
                className="mb-6 inline-block rounded-full px-5 py-2 text-sm font-black uppercase tracking-[0.25em] md:text-base"
                style={{ backgroundColor : ISEF_ORANGE, color : ISEF_BLUE }}
              >
                ISEF 2050 HACKATHON
              </span>

              <h1 className="mb-5 text-6xl font-black leading-[0.95] tracking-tight text-white md:text-8xl">
                הופכים רעיונות
                <br />
                לפתרונות אמיתיים
              </h1>

              <p className="mx-auto mb-4 max-w-3xl text-2xl font-semibold leading-relaxed text-blue-50 md:text-3xl">
                האקתון יומי לקהילת אייסף, מגיעים עם רעיון, יוצאים עם מוצר שעובד.
              </p>

              <p className="mx-auto mb-8 max-w-2xl text-lg font-bold md:text-2xl" style={{ color : ISEF_ORANGE }}>
                חולמים על יזמות?
              </p>

              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                <button
                  onClick={scrollToRegister}
                  className="rounded-2xl px-10 py-4 text-xl font-black transition-transform hover:scale-[1.02] md:text-2xl"
                  style={{ backgroundColor : ISEF_ORANGE, color : ISEF_BLUE }}
                >
                  שליחת טופס
                </button>

                <div className="rounded-2xl border border-white/20 bg-white/10 px-5 py-4 text-white backdrop-blur-sm">
                  <div className="text-sm font-bold text-blue-100">אירוע האקתון המרכזי</div>
                  <div className="text-2xl font-black">28.5 | 9:00-20:00</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              animate={{ y : [0, 10, 0] }}
              transition={{ repeat : Infinity, duration : 2 }}
              className="mt-10 flex justify-center"
            >
              <ChevronDown className="h-9 w-9 text-white" />
            </motion.div>
          </div>
        </div>
      </header>

      <section className="bg-white py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
            <div className="space-y-5">
              <h2 className="text-5xl font-black tracking-tight md:text-6xl" style={{ color : ISEF_BLUE }}>
                זה לא עוד כנס של מצגות ודיבורים
              </h2>

              <p className="text-xl leading-relaxed text-zinc-700 md:text-2xl">
                האקתון ISEF 2050 הוא יום שלם של עשייה, ספרינטים ממוקדים, מנטורים צמודים, וצוותים מעורבים מקהילת אייסף.
                מגיעים עם רעיון, יוצאים עם מוצר שעובד.
              </p>

              <p className="text-lg leading-relaxed text-zinc-600 md:text-xl">
                צריך רק רצון לנסות.
              </p>

              <div className="grid grid-cols-3 gap-4 pt-2">
                {[
                  ['יום שלם', '9:00-20:00'],
                  ['4-6', 'בצוות'],
                  ['MVP', 'תוצר מוחשי'],
                ].map(([value, label]) => (
                  <div
                    key={label}
                    className="rounded-2xl border-r-4 bg-zinc-50 p-4 md:p-5"
                    style={{ borderColor : ISEF_ORANGE }}
                  >
                    <div className="mb-1 text-2xl font-black md:text-3xl" style={{ color : ISEF_BLUE }}>
                      {value}
                    </div>
                    <div className="text-xs font-black uppercase tracking-wider text-zinc-500 md:text-sm">{label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div
              className="relative h-[380px] overflow-hidden rounded-[28px] border-4 md:h-[520px]"
              style={{ borderColor : ISEF_BLUE, boxShadow : `12px 12px 0 ${ISEF_ORANGE}` }}
            >
              <ImageCarousel images={aboutImages} interval={4000} className="absolute inset-0 z-0" />
              <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/15 via-transparent to-transparent" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20" style={{ backgroundColor : ISEF_BLUE }}>
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="text-5xl font-black text-white md:text-6xl">לו״ז הדרך להאקתון</h2>
          </div>

          <div ref={timelineRef} className="relative mx-auto max-w-4xl">
            <div className="absolute right-[17px] top-0 h-full w-1 rounded-full bg-white/15 md:right-1/2 md:translate-x-1/2" />
            <div
              className="absolute right-[17px] top-0 w-1 rounded-full transition-all duration-200 md:right-1/2 md:translate-x-1/2"
              style={{
                backgroundColor : ISEF_ORANGE,
                height : `${timelineProgress * 100}%`,
              }}
            />

            <div className="space-y-8">
              {timeline.map((item, index) => (
                <div
                  key={item.title}
                  className="relative grid grid-cols-[1fr_40px] gap-4 md:grid-cols-2 md:gap-8"
                >
                  <div className={`md:${index % 2 === 0 ? 'pr-16 text-right' : 'order-2 pl-16 text-right'}`}>
                    <div className="rounded-3xl bg-white/8 p-6 backdrop-blur-sm">
                      <div className="mb-2 text-lg font-black md:text-xl" style={{ color : ISEF_ORANGE }}>
                        {item.date}
                      </div>
                      <h3 className="mb-2 text-2xl font-black text-white md:text-3xl">{item.title}</h3>
                      <p className="text-base leading-relaxed text-blue-100 md:text-lg">{item.desc}</p>
                    </div>
                  </div>

                  <div className="relative flex items-start justify-center">
                    <div className="mt-5 h-5 w-5 rounded-full border-4 border-white" style={{ backgroundColor : ISEF_ORANGE }} />
                  </div>

                  <div className={`hidden md:block ${index % 2 === 0 ? 'order-2' : ''}`} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-zinc-50 py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="mb-10 text-center">
            <h2 className="mb-4 text-5xl font-black md:text-6xl" style={{ color : ISEF_BLUE }}>
              אתגרי הליבה
            </h2>
            <p className="mx-auto max-w-3xl text-lg text-zinc-600 md:text-2xl">
              בחרו אתגר אחד: זהו נקודת כאב ברורה, והתמקדו בפתרון שניתן לבנייה ולהדגמה.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {challenges.map((item) => (
              <motion.div
                key={item.id}
                whileHover={{ y : -6 }}
                className="group relative min-h-[280px] overflow-hidden rounded-[28px] bg-white p-7"
                style={{ border : `2px solid ${ISEF_BLUE}`, boxShadow : `6px 6px 0 ${ISEF_ORANGE}` }}
              >
                <div
                  className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl"
                  style={{ backgroundColor : ISEF_BLUE, color : 'white' }}
                >
                  <item.icon className="h-7 w-7" />
                </div>

                <h3 className="mb-3 text-2xl font-black leading-tight" style={{ color : ISEF_BLUE }}>
                  {item.title}
                </h3>

                <p className="mb-4 text-base leading-relaxed text-zinc-600">{item.shortDesc}</p>

                <div className="text-sm font-black" style={{ color : ISEF_ORANGE }}>
                  לפירוט
                </div>

                <div className="pointer-events-none absolute inset-0 flex items-end bg-[#1B2F6E]/96 p-7 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <div>
                    <h4 className="mb-3 text-2xl font-black text-white">{item.title}</h4>
                    <p className="text-base leading-relaxed text-blue-50">{item.fullDesc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16 md:py-20">
        <div className="container mx-auto px-4">
          <h2 className="mb-3 text-center text-5xl font-black md:text-6xl" style={{ color : ISEF_BLUE }}>
            לו״ז יום ההאקתון
          </h2>
          <p className="mb-10 text-center text-lg text-zinc-500 md:text-xl">9:00-20:00 | יום שלם של עשייה</p>

          <div className="mx-auto max-w-4xl overflow-hidden rounded-[28px] border border-zinc-200">
            {schedule.map((item, index) => (
              <div
                key={`${item.time}-${index}`}
                className="group flex items-center gap-5 border-b border-zinc-100 px-5 py-5 last:border-b-0 md:gap-8 md:px-8"
              >
                <div className="w-20 shrink-0 text-lg font-black text-zinc-400 transition-colors group-hover:text-orange-500 md:text-2xl">
                  {item.time}
                </div>
                <div className="flex-1 text-lg font-bold text-zinc-700 group-hover:text-zinc-950 md:text-2xl">
                  {item.event}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="register" className="py-16 md:py-20" style={{ backgroundColor : '#FFF8F0' }}>
        <div className="container mx-auto px-4">
          <div className="mb-10 text-center">
            <h2 className="mb-4 text-5xl font-black tracking-tight md:text-7xl" style={{ color : ISEF_BLUE }}>
              מוכנים לבנות את העתיד?
            </h2>
            <p className="text-xl font-bold text-zinc-600 md:text-2xl">
              הצטרפו ליום שלם של חדשנות, יצירה ומשמעות.
            </p>
          </div>

          <div className="mx-auto max-w-5xl">
            <RegistrationForm />
          </div>

          <div className="mx-auto mt-8 max-w-3xl rounded-[28px] border bg-white p-6 text-center md:p-8" style={{ borderColor : 'rgba(27,47,110,0.12)' }}>
            <div className="mb-2 text-2xl font-black md:text-3xl" style={{ color : ISEF_BLUE }}>
              יש לך ניסיון משמעותי ביזמות?
            </div>
            <p className="text-lg leading-relaxed text-zinc-600 md:text-xl">
              אפשר להצטרף לצוות המנטורים, לפרטים ניתן לפנות לענת.
            </p>
            <a
              href="mailto:anat@isef.org.il"
              className="mt-4 inline-block rounded-2xl px-6 py-3 text-lg font-black transition-opacity hover:opacity-90"
              style={{ backgroundColor : ISEF_ORANGE, color : ISEF_BLUE }}
            >
              ענת רודוניה | anat@isef.org.il
            </a>
          </div>
        </div>
      </section>

      <footer className="overflow-hidden py-12 text-white md:py-14" style={{ backgroundColor : ISEF_BLUE }}>
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
            <div className="text-center md:text-right">
              <h3 className="mb-1 text-3xl font-black">ISEF 2050</h3>
              <p className="text-sm text-blue-200 md:text-base">מצוינות עם משמעות. בונים את ישראל של המחר.</p>
            </div>

            <div className="flex flex-col items-center gap-2 text-center text-sm">
              <span className="text-blue-200">לפרטים נוספים</span>
              <a
                href="mailto:anat@isef.org.il"
                className="text-lg font-black transition-opacity hover:opacity-85"
                style={{ color : ISEF_ORANGE }}
              >
                ענת רודוניה | anat@isef.org.il
              </a>
            </div>
          </div>

          <div className="mt-10 flex flex-col items-center justify-center gap-6 border-t border-white/10 pt-8">
            <div className="flex flex-wrap items-center justify-center gap-8 opacity-75">
              <img src="/logos/isef-white.png" alt="ISEF" className="h-16 w-auto object-contain md:h-20" />
              <img src="/logos/mada-boneh-hevra-white.png" alt="מדע בונה חברה" className="h-16 w-auto object-contain md:h-20" />
            </div>

            <div className="text-center text-xs text-blue-300">
              © 2026 ISEF Foundation. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
