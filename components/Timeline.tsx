import React, { useState } from 'react';
import { Timeline as PrimerTimeline } from '@primer/components';

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
    <PrimerTimeline.Item ml={24}>
      <PrimerTimeline.Badge>
        {/* Quick hack because we can't use string interpolation for tailwind classes - https://tailwindcss.com/docs/content-configuration#class-detection-in-depth */}
        <div className={badgeColor === 'orange' ? `text-orange-600` : null}>
          {badge}
        </div>
      </PrimerTimeline.Badge>
      <PrimerTimeline.Body>
        <div className="font-bold text-gray-700 dark:text-white">{title}</div>
        <div className="text-gray-500 dark:text-white">{description}</div>
      </PrimerTimeline.Body>
    </PrimerTimeline.Item>
  );
};

const TimeLine = () => {
  const [showAllYears, setShowAllYears] = useState(false);
  return (
    <div className="text-gray-700 space-y-12 dark:text-white">
      <PrimerTimeline>
        <span className="mb-2 text-3xl font-bold tracking-tight">Timeline</span>
        <PrimerTimeline.Break className="border-t-0 dark:bg-black" />
        <Year of={2025}>
          <TimelineItem
            badge="✈️"
            title="Relocated from San Diego ➡️ The Bay Area"
            description="After being in San Diego for almost 3 years, I moved to be closer to my team! I'm now living in San Jose, CA, but primarily work out of Cupertino, CA."
          />
        </Year>
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
        {showAllYears && (
          <>
            <Year of={2018}>
              <TimelineItem
                badge="🎓‍"
                title="Graduated College"
                description="Graduated with a Bachelor's of Science in Computer Science from Purdue University."
              />
            </Year>
            <Year of={2004}>
              <TimelineItem
                badge="🧑🏼‍💻"
                title="Built my first website"
                description="I wanted to build a website for my Halo 2 clan, which led me to learn HTML & CSS."
              />
            </Year>
            <Year of={1995}>
              <TimelineItem
                badge="🍼"
                title="Born"
                description="I was born on May 15, 1995 in Indianapolis, IN."
              />
            </Year>
          </>
        )}
      </PrimerTimeline>
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
