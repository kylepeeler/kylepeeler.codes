import React, { useState } from 'react';

const Year = ({ of, children }: { of: number; children: React.ReactNode }) => (
  <>
    {children}
    <span className="inline px-1 mb-2 text-xl font-bold">{of}</span>
  </>
);

const TimelineItem = ({
  badge,
  badgeColor,
  title,
  description
}: {
  badge: string;
  badgeColor?: string;
  title: string;
  description: string;
}) => {
  return (
    <div className="flex gap-4 ml-6 mb-4">
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
        <div
          className={
            badgeColor === 'orange'
              ? `text-orange-600`
              : 'text-gray-700 dark:text-white'
          }
        >
          {badge}
        </div>
      </div>
      <div className="flex-1">
        <div className="font-bold text-gray-700 dark:text-white">{title}</div>
        <div className="text-gray-500 dark:text-white">{description}</div>
      </div>
    </div>
  );
};

const TimeLine = () => {
  const [showAllYears, setShowAllYears] = useState(false);
  return (
    <div className="text-gray-700 space-y-12 dark:text-white">
      <div className="space-y-4">
        <span className="mb-2 text-3xl font-bold tracking-tight block">
          Timeline
        </span>
        <hr className="border-gray-300 dark:border-gray-700" />
        <Year of={2022}>
          <TimelineItem
            badge=""
            title="Joined Apple"
            description="I finally got my dream job at Apple, working on the Wallet & Payments team!"
          />
        </Year>
        <Year of={2021}>
          <TimelineItem
            badge="Z"
            badgeColor="orange"
            title="Joined Zylo"
            description="After the acquisition by Ironclad, I decided to join a different SaaS startup, focusing on enterprise SaaS management."
          />
          <TimelineItem
            badge="🦄"
            title="Joined Ironclad"
            description="PactSafe was acquired by Ironclad, a San Francisco unicorn legal-tech startup!"
          />
        </Year>
        <Year of={2019}>
          <TimelineItem
            badge="💼"
            title="Started full-time PactSafe"
            description="Started working as a full-time front-end Software Engineer for PactSafe."
          />
        </Year>
        <Year of={2018}>
          <TimelineItem
            badge="🎓‍"
            title="Graduated College"
            description="Graduated with a Bachelors of Science in Computer Science from Purdue University's IUPUI campus."
          />
        </Year>
        {showAllYears && (
          <>
            <Year of={2004}>
              <TimelineItem
                badge={'🧑🏼‍💻'}
                title="Built my first website"
                description="I wanted to build a website for my Halo 2 clan, which led me to learn HTML & CSS."
              />
            </Year>
            <Year of={1995}>
              <TimelineItem
                badge={'🍼'}
                title="Born"
                description="I was born on May 15, 1995 in Indianapolis, IN."
              />
            </Year>
          </>
        )}
      </div>
      <button
        className="my-4 mx-auto font-medium dark:bg-black"
        // rightIcon={!showAllYears ? 'chevron-down' : 'chevron-up'}
        // variant="ghost"
        onClick={() => setShowAllYears(!showAllYears)}
      >
        {!showAllYears ? 'See More ▾' : 'See Less ▴'}
      </button>
    </div>
  );
};

export default TimeLine;
