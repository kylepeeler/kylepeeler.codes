import { Story, Meta } from '@storybook/react';
import Button from './Button';

export default {
  title: 'Button',
  component: Button
} as Meta;

const Template: Story<unknown> = (args) => <Button {...args} />;

export const ButtonStory = Template.bind({});
