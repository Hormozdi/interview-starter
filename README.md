# Lingano Mini Dictionary — Interview Starter (with Intentional Bugs)

این ریپو برای مرحله‌ی سوم مصاحبه‌ی فرانت‌اند Lingano است.
لطفاً موارد زیر را انجام دهید. زمان کل پیشنهادشده: حدود 3 ساعت (حداکثر ظرف 24 ساعت تحویل دهید).

## کارهایی که باید انجام دهید
1) **رفع باگ‌ها** 

2) **افزودن فیچرها**:
   - سرچ prefix با **هایلایت** متن مطابق ترم جستجو.
   - بوکمارک با **Server Action** (کوکی امضاشده؛ بدون localStorage). UI را **Optimistic** کنید.
   - **i18n ساده (EN/FA)** و پشتیبانی **RTL** برای حالت فارسی (labels و جهت صفحه).

3) **A11y**:
   - ناوبری با کیبورد: ↑/↓ بین نتایج، Enter برای انتخاب.
   - مودال جزئیات با `role="dialog"`, `aria-modal="true"`, trap focus و بستن با Escape.

4) **README کوتاه** بنویسید: معماری/تصمیم‌ها، نحوه‌ی اجرا/بیلد، و اسکرین‌شات.

5) (اختیاری) ۳ تست با Vitest/RTL.

## راه‌اندازی
```bash
cp .env.example .env.local
# مقدار BOOKMARKS_SECRET را پر کنید
npm i
npm run dev
# سپس http://localhost:3000
```

## نکات
- از کتابخانه‌های سنگین UI استفاده نکنید (Tailwind اوکی است).
- fuzzy-search مجاز نیست؛ فقط prefix.
- هدف اصلی: توانایی شما در دیباگ، معماری تمیز، a11y و بهبود UX.