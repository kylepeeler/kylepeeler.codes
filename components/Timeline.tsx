import React, { useState } from 'react';
import { Timeline as PrimerTimeline } from '@primer/components';

const Year = ({ of, children }: { of: number; children: React.ReactNode }) => (
  <>
    {children}

    <div className="mb-2 text-lg font-bold">{of}</div>
  </>
);

const TimelineItem = ({ badge, title, description }) => {
  return (
    <PrimerTimeline.Item ml={24}>
      <PrimerTimeline.Badge>{badge}</PrimerTimeline.Badge>
      <PrimerTimeline.Body>
        <div className="font-bold">{title}</div>
        <div className="text-gray-500 dark:text-gray-400">{description}</div>
      </PrimerTimeline.Body>
    </PrimerTimeline.Item>
  );
};

const TimeLine = () => {
  const [showAllYears, setShowAllYears] = useState(false);
  return (
    <div className="space-y-16">
      <PrimerTimeline>
        <span className="mb-2 text-xl font-bold tracking-tight">Timeline</span>
        <Year of={2020}>
          <TimelineItem
            badge="💍"
            title="Got Engaged"
            description="Got engaged to my beautiful fiancée, Liz."
          />
        </Year>
        <Year of={2019}>
          <TimelineItem
            badge="🧑🏼‍💻"
            title="Started full-time PactSafe"
            description="Started working (finally) as a full-time front-end Software Engineer for PactSafe."
          />
        </Year>
        <Year of={2018}>
          <TimelineItem
            badge="🎓‍"
            title="Graduated College"
            description="Graduated with a Bachelors of Science in Computer Science from Purdue University's IUPUI campus."
          />
        </Year>
      </PrimerTimeline>
      {showAllYears && (
        <Year of={1995}>
          <TimelineItem
            badge={'🍼'}
            title="Born"
            description="I was born on May 15, 1995 in Indianapolis, IN."
          />
        </Year>
      )}
      <button
        className="my-4 mx-auto font-medium"
        // rightIcon={!showAllYears ? 'chevron-down' : 'chevron-up'}
        // variant="ghost"
        onClick={() => setShowAllYears(!showAllYears)}
      >
        {!showAllYears ? 'See More' : 'See Less'}
      </button>
    </div>
  );
};

export default TimeLine;
