import React from 'react';

export const HomeIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    {/* আপনার home.svg এর ভেতরের <path ... /> কোডটি এখানে বসান */}
    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
  </svg>
);

export const ActivityIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    {/* activity.svg এর <path ... /> কোড */}
  </svg>
);

export const PromotionIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    {/* promotion.svg এর <path ... /> কোড */}
  </svg>
);

export const AccountIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    {/* account.svg এর <path ... /> কোড */}
  </svg>
);
