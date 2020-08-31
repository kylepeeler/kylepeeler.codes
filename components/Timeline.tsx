import React, { useState } from 'react';
import { Button, Flex, Heading, Text, useColorMode } from '@chakra-ui/core';
import { Timeline as PrimerTimeline } from '@primer/components';

const Year = ({ of, children }: { of: number; children: React.ReactNode }) => (
  <>
    {children}
    <Heading mb={2} size="lg" fontWeight="bold">
      {of}
    </Heading>
  </>
);

const TimelineItem = ({ badge, title, description }) => {
  const { colorMode } = useColorMode();
  const textColors = {
    light: 'gray.700',
    dark: 'white'
  };
  const descriptionColors = {
    light: 'gray.500',
    dark: 'gray.400'
  };
  return (
    <PrimerTimeline.Item ml={24}>
      <PrimerTimeline.Badge>{badge}</PrimerTimeline.Badge>
      <PrimerTimeline.Body>
        <Text color={textColors[colorMode]} fontWeight="bold">
          {title}
        </Text>
        <Text color={descriptionColors[colorMode]}>{description}</Text>
      </PrimerTimeline.Body>
    </PrimerTimeline.Item>
  );
};

const TimeLine = () => {
  const [showAllYears, setShowAllYears] = useState(false);
  return (
    <Flex flexDirection="column" justifyContent="flex-start" my={16}>
      <PrimerTimeline>
        <Heading letterSpacing="tight" mb={2} size="xl" fontWeight={700}>
          Timeline
        </Heading>
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
      <Button
        my={4}
        mx="auto"
        fontWeight="medium"
        rightIcon={!showAllYears ? 'chevron-down' : 'chevron-up'}
        variant="ghost"
        onClick={() => setShowAllYears(!showAllYears)}
      >
        {!showAllYears ? 'See More' : 'See Less'}
      </Button>
    </Flex>
  );
};

export default TimeLine;
