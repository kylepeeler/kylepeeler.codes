import { Story, Meta } from '@storybook/react';
import LandingHeadline from './LandingHeadline';

export default {
  title: 'Home Page/Landing Headline',
  component: LandingHeadline
} as Meta;

const Template: Story<unknown> = (args) => <LandingHeadline {...args} />;

export const LandingHeadlineStory = Template.bind({});
