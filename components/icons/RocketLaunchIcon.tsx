import React from 'react';

export const RocketLaunchIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2}
    stroke="currentColor"
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.63 2.18a14.98 14.98 0 00-12.12 6.16.983.983 0 00.983 1.18h4.8m5.84 0a6 6 0 01-7.38 5.84m0 0a6 6 0 01-5.84-7.38m5.84 7.38v-4.8"
    />
  </svg>
);
