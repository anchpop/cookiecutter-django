import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import randomNumberStory from './randomNumber';

storiesOf('Button', module)
  .add('with text', randomNumberStory);   