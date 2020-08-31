import { Story, Meta } from '@storybook/react';
import Timeline from './Timeline';

export default {
  title: 'Home Page/Timeline',
  component: Timeline
} as Meta;

const Template: Story<unknown> = (args) => <Timeline {...args} />;

export const TimelineStory = Template.bind({});
TimelineStory.args = {};
