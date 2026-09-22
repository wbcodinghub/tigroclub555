# Lottery

Next.js 14 + TypeScript প্রজেক্ট। প্রতিটা পেজের নিজস্ব URL/route আছে (`/home`,
`/activity`, `/promotion`, `/account`) — এগুলো ফোল্ডার-ভিত্তিক রাউটিং, তাই
সার্চ/অ্যাড্রেস-বারে সরাসরি টাইপ করলেও কাজ করবে, যেমন:
`https://your-domain.com/account`।

## চালু করা যাবে যেভাবে

```bash
npm install
npm run dev       # http://localhost:3000  (স্বয়ংক্রিয়ভাবে /home এ রিডাইরেক্ট হবে)

npm run build     # প্রোডাকশন বিল্ড
npm run start     # প্রোডাকশন সার্ভার চালু
```

## ফোল্ডার স্ট্রাকচার — কোন ফাইল কোন পেজ কন্ট্রোল করে

```
src/
├─ app/
│  ├─ layout.tsx              ← সব পেজের কমন র‍্যাপার (BottomNav সহ) — এখানে
│  │                             হাত দিলে প্রতিটা পেজ একসাথে বদলাবে
│  ├─ globals.css             ← রং/থিম (CSS ভেরিয়েবল) — কালার স্কিম বদলানোর জায়গা
│  ├─ page.tsx                ← "/" ভিজিট করলে "/home" এ পাঠিয়ে দেয়
│  │
│  ├─ home/page.tsx           ← /home  পেজের কন্টেন্ট (একমাত্র পেজ, যেখানে
│  │                             আসল কন্টেন্ট আছে)
│  ├─ activity/page.tsx       ← /activity  পেজ (এখন খালি — শুধু নাম লেখা)
│  ├─ promotion/page.tsx      ← /promotion পেজ (এখন খালি — শুধু নাম লেখা)
│  └─ account/page.tsx        ← /account   পেজ (এখন খালি — শুধু নাম লেখা)
│
├─ components/
│  ├─ BottomNav.tsx           ← নিচের (মোবাইলে) / উপরের (ডেস্কটপে) ন্যাভিগেশন
│  │                             বার — এটা একটাই কম্পোনেন্ট, duplicate নেই
│  ├─ BottomNav.module.css    ← ন্যাভ বারের সাইজ/রং/অ্যানিমেশন
│  └─ PagePlaceholder.tsx     ← খালি পেজগুলোর জন্য শুধু "পেজের নাম" দেখানোর
│                                রিইউজেবল কম্পোনেন্ট
│
├─ assets/
│  └─ icons.tsx               ← সবগুলো ন্যাভ আইকন (Home / Activity /
│                                Promotion / Account) — ইনলাইন SVG React
│                                কম্পোনেন্ট হিসেবে, একটাই ফাইলে
│
└─ config/
   └─ navigation.ts           ← ন্যাভ বারে কোন কোন ট্যাব দেখাবে তার লিস্ট
                                 (label, href, icon)
```

প্রতিটা রুট (`/home`, `/activity`, ...) সম্পূর্ণ স্বাধীন ফোল্ডার — একটার
`page.tsx` এডিট করলে অন্যগুলো প্রভাবিত হয় না। শুধু `layout.tsx`,
`globals.css`, `BottomNav.*` — এই কয়টা ফাইল সবগুলো পেজে কমন (shared)।

## ভবিষ্যতে নতুন পেজ যোগ করবেন যেভাবে

ধরা যাক নতুন একটা পেজ `/support` যোগ করতে চান:

1. **ফোল্ডার বানান:** `src/app/support/page.tsx`

   ```tsx
   import type { Metadata } from "next";
   import PagePlaceholder from "@/components/PagePlaceholder";

   export const metadata: Metadata = { title: "Lottery — Support" };

   export default function SupportPage() {
     return <PagePlaceholder title="Support Page" />;
   }
   ```

   এতেই `/support` লাইভ হয়ে যাবে (Next.js ফোল্ডারের নাম দেখেই route বানায়)।

2. **(অপশনাল) ন্যাভ বারে ট্যাব দেখাতে চাইলে:** `src/assets/icons.tsx`-এ একটা
   আইকন কম্পোনেন্ট বানান (existing icon-গুলোর প্যাটার্ন অনুসরণ করে), তারপর
   `src/config/navigation.ts`-এর `NAV_ITEMS` অ্যারেতে একটা এন্ট্রি যোগ করুন:

   ```ts
   { label: "Support", href: "/support", icon: SupportIcon },
   ```

   ব্যস — `BottomNav.tsx` এই লিস্ট থেকেই সব ট্যাব বানায়, তাই সেই ফাইলে হাত
   দেওয়ার দরকার নেই।

3. Sub-page দরকার হলে (যেমন `/account/settings`): শুধু
   `src/app/account/settings/page.tsx` বানালেই হবে।

## ডিজাইন/পারফরম্যান্স সংক্রান্ত সিদ্ধান্ত

- **কোনো ইমেজ/ভিডিও অ্যাসেট নেই।** ন্যাভ আইকনগুলো ইনলাইন SVG (React
  কম্পোনেন্ট) হিসেবে `src/assets/icons.tsx`-এ রাখা — এক্সট্রা নেটওয়ার্ক
  রিকোয়েস্ট নেই, ফাইল সাইজ প্রায় শূন্য, এবং যেকোনো স্ক্রিন-ডেনসিটিতে ঝকঝকে
  থাকে।
- **রং একবারই বসানো:** সব আইকন `fill="currentColor"` ব্যবহার করে, তাই
  active/inactive অবস্থায় রং বদলাতে (`color` প্রপার্টি দিয়ে) আলাদা কোনো
  আইকন লাগে না — একই SVG পুনর্ব্যবহার হয়।
- **মোবাইল ও ডেস্কটপের জন্য duplicate markup নেই।** `BottomNav`-এর একটাই
  `<nav>` আছে DOM-এ; ফোনে এটা নিচে fixed বার হিসেবে, চওড়া স্ক্রিনে
  (`min-width: 900px`) উপরের সেন্টারড বার হিসেবে দেখায় — শুধু CSS
  media query দিয়ে পজিশন/সাইজ বদলায় (`display: none` দিয়ে দুইটা আলাদা বার
  লুকিয়ে রাখার মতো ভারী পদ্ধতি ব্যবহার করা হয়নি)।
- **থিম:** সব রং `src/app/globals.css`-এর `:root` ভেরিয়েবলে — সাদা/হালকা
  ব্যাকগ্রাউন্ড, active ট্যাবে reference ছবির মতো লাল রাউন্ডেড পিল।

## ন্যাভ বার (`button-bar-svg-t.jpg` রেফারেন্স অনুযায়ী)

- Active ট্যাব: লাল রাউন্ডেড পিল ব্যাকগ্রাউন্ড, সাদা আইকন + টেক্সট।
- Inactive ট্যাব: মিউটেড ধূসর আইকন + টেক্সট (সাদা থিমে ভালোভাবে দেখা যায়)।
- আইকন + লেবেল ভার্টিক্যালি স্ট্যাক করা (মোবাইলে), reference ছবির অনুপাত
  অনুসরণ করে সাইজ করা হয়েছে।
