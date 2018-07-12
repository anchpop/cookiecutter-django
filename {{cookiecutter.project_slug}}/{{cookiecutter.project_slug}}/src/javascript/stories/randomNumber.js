import React from 'react';
import { storiesOf } from '@storybook/react';
import RandomNumber from '../components/randomNumberCard';
import Provider from './StoryReduxProvider';

storiesOf('Demo site', module)
  .addDecorator(story => <Provider story={story()} />)
  .add('Random Number Card', () => <RandomNumber />);