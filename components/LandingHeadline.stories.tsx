import { Story, Meta } from '@storybook/react';
import LandingHeadline from './LandingHeadline';

export default {
  title: 'Home Page/Landing Headline',
  component: LandingHeadline
} as Meta;

const Template: Story<Record<string, never>> = () => <LandingHeadline />;

export const LandingHeadlineStory = Template.bind({});
