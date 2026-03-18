import React from 'react';
import { useForm } from 'react-hook-form';
import { cn } from '../lib/utils';

interface RegistrationFormData {
  fullName: string;
  phone: string;
  email: string;
  status: string;
  institution: string;
  city: string;
  challenges: string[];
  role: string;
  hasIdea: string;
  ideaDescription?: string;
  wantsToLead: string;
  teamPreference: string;
  partnerName?: string;
  webinar1: boolean;
  webinar2: boolean;
  preferredTime: string;
}

export const RegistrationForm = () => {
  const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm<RegistrationFormData>();
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const onSubmit = async (data: RegistrationFormData) => {
    try {
      setError(null);
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'שגיאה לא ידועה');
      }

      setIsSubmitted(true);
    } catch (err: any) {
      console.error('Error saving registration:', err);
      setError('חלה שגיאה בשמירת הנתונים. אנא נסו שוב מאוחר יותר.');
    }
  };

  const hasIdea = watch('hasIdea');

  if (isSubmitted) {
    return (
      <div className="p-8 text-center bg-emerald-50 border-2 border-emerald-500 rounded-2xl">
        <h3 className="text-2xl font-bold text-emerald-800 mb-2">תודה שנרשמת!</h3>
        <p className="text-emerald-700">הפרטים שלך התקבלו. נתראה בוובינר הקרוב!</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 max-w-2xl mx-auto bg-white p-8 brutal-border">
      <div className="space-y-4">
        <h3 className="text-2xl font-bold border-b-2 border-black pb-2">שאלון הרשמה</h3>
        <p className="text-sm text-zinc-600">הטופס נועד להכיר אתכם, לשבץ לצוותים חזקים, ולוודא שלכולם יש חווית האקתון מקצועית וכיפית.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="block font-bold">שם מלא</label>
          <input {...register('fullName', { required: true })} className="w-full p-2 border-2 border-black focus:bg-yellow-50 outline-none" />
        </div>
        <div className="space-y-2">
          <label className="block font-bold">טלפון</label>
          <input {...register('phone', { required: true })} className="w-full p-2 border-2 border-black focus:bg-yellow-50 outline-none" />
        </div>
        <div className="space-y-2">
          <label className="block font-bold">אימייל</label>
          <input {...register('email', { required: true })} type="email" className="w-full p-2 border-2 border-black focus:bg-yellow-50 outline-none" />
        </div>
        <div className="space-y-2">
          <label className="block font-bold">סטטוס</label>
          <select {...register('status', { required: true })} className="w-full p-2 border-2 border-black focus:bg-yellow-50 outline-none">
            <option value="בוגר/ת אייסף">בוגר/ת אייסף</option>
            <option value="סטודנט/ית אייסף">סטודנט/ית אייסף</option>
            <option value="סטודנט/ית לאייסף">סטודנט/ית לאייסף</option>
            <option value="אחר">אחר</option>
          </select>
        </div>
        <div className="space-y-2">
          <label className="block font-bold">מוסד לימודים / מקום עבודה</label>
          <input {...register('institution', { required: true })} className="w-full p-2 border-2 border-black focus:bg-yellow-50 outline-none" />
        </div>
        <div className="space-y-2">
          <label className="block font-bold">עיר מגורים</label>
          <input {...register('city', { required: true })} className="w-full p-2 border-2 border-black focus:bg-yellow-50 outline-none" />
        </div>
      </div>

      <div className="space-y-4">
        <label className="block font-bold">איזה אתגר הכי מעניין אותך?</label>
        <div className="grid grid-cols-1 gap-2">
          {['בריאות ורווחת האדם (HealthTech)', 'חינוך וכלים לדור הבא', 'חוסן קהילתי ושייכות', 'שירותים ציבוריים חכמים (GovTech)', 'קיימות ותשתיות חיים', 'פתוח / אחר'].map(c => (
            <label key={c} className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" value={c} {...register('challenges')} className="w-4 h-4 accent-black" />
              <span>{c}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <label className="block font-bold">מה התפקיד/החוזקה העיקרית שלך?</label>
        <select {...register('role', { required: true })} className="w-full p-2 border-2 border-black focus:bg-yellow-50 outline-none">
          {['Software / Full-stack', 'Backend', 'Frontend', 'Mobile', 'Data / ML', 'Product', 'UX/UI', 'Research / תחקיר / כתיבה', 'Domain expert', 'Biz / שותפויות / פרזנטציה', 'אחר'].map(r => (
            <option key={r} value={r}>{r}</option>
          ))}
        </select>
      </div>

      <div className="space-y-4">
        <label className="block font-bold">האם יש לך רעיון לפרויקט?</label>
        <div className="flex gap-4">
          {['כן', 'לא', 'אולי'].map(v => (
            <label key={v} className="flex items-center gap-2 cursor-pointer">
              <input type="radio" value={v} {...register('hasIdea')} className="w-4 h-4 accent-black" />
              <span>{v}</span>
            </label>
          ))}
        </div>
        {hasIdea === 'כן' && (
          <textarea {...register('ideaDescription')} placeholder="כתוב/י את הרעיון בשתי שורות" className="w-full p-2 border-2 border-black focus:bg-yellow-50 outline-none h-24" />
        )}
      </div>

      {error && (
        <div className="p-4 bg-red-50 border-2 border-red-500 text-red-800 font-bold">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className={cn(
          "w-full bg-black text-white py-4 text-xl font-bold cursor-pointer border-4 border-black",
          isSubmitting && "opacity-50 cursor-not-allowed"
        )}
      >
        {isSubmitting ? 'שולח...' : 'שלח הרשמה'}
      </button>
    </form>
  );
};
