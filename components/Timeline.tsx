import React, { useState } from 'react';
import { Timeline as PrimerTimeline } from '@primer/components';

const Year = ({ of, children }: { of: number; children: React.ReactNode }) => (
  <>
    {children}
    <span className="inline px-1 mb-2 text-xl font-bold">{of}</span>
  </>
);

const TimelineItem = ({ badge, title, description }) => {
  return (
    <PrimerTimeline.Item ml={24}>
      <PrimerTimeline.Badge>{badge}</PrimerTimeline.Badge>
      <PrimerTimeline.Body>
        <div className="font-bold dark:text-white">{title}</div>
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
        <Year of={2021}>
          <TimelineItem
            badge="🦄"
            title="Joined Ironclad"
            description="PactSafe was acquired by Ironclad, a San Francisco unicorn startup!"
          />
        </Year>
        <Year of={2020}>
          <TimelineItem
            badge="💍"
            title="Got Engaged"
            description="Got engaged to my beautiful fiancée, Liz!"
          />
        </Year>
        <Year of={2019}>
          <TimelineItem
            badge="🧑🏼‍💻"
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
          <Year of={1995}>
            <TimelineItem
              badge={'🍼'}
              title="Born"
              description="I was born on May 15, 1995 in Indianapolis, IN."
            />
          </Year>
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
