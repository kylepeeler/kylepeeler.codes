import { Story, Meta } from '@storybook/react';
import LatestBlogPosts, { LatestBlogPostsType } from './LatestBlogPosts';
import React from 'react';

export default {
  title: 'Home Page/Latest Blog Posts',
  component: LatestBlogPosts
} as Meta;

const Template: Story<LatestBlogPostsType> = (args) => (
  <LatestBlogPosts {...args} />
);

export const LatestBlogPosts1Posts = Template.bind({});
LatestBlogPosts1Posts.args = {
  posts: [
    {
      id: 'test',
      date: '2020-01-01',
      title: 'Building a design system in React',
      description:
        'An in depth look at the process of building a design system & component library with React and Storybook'
    }
  ]
};

export const LatestBlogPosts3Posts = Template.bind({});
LatestBlogPosts3Posts.args = {
  posts: [
    {
      id: 'test1',
      date: '2020-08-31',
      title: 'Building a design system in React',
      description:
        'An in depth look at the process of building a design system & component library with React and Storybook'
    },
    {
      id: 'test2',
      date: '2020-04-20',
      title: 'Some Other Blog Title',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce pulvinar quis nisi aliquet accumsan. Praesent aliquam sagittis mollis. Etiam maximus semper ex et gravida.'
    },
    {
      id: 'test3',
      date: '2020-01-01',
      title: 'Building a design system in React',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce pulvinar quis nisi aliquet accumsan. Praesent aliquam sagittis mollis. Etiam maximus semper ex et gravida.'
    }
  ]
};
