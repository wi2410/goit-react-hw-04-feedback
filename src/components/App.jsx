// import React, { Component } from 'react';
import { useState} from 'react';
import { Container } from './App.styled'

import { Statistics } from './Statistics/Statistics';
import { FeedbackOptions } from './FeedbackOptions/FeedbackOptions';
import { Section } from "./Section/Section";
import { Notification } from "./Notification/Notification";


export const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const feedbackType = { good, neutral, bad };

  const onLeaveFeedback = key => {
    switch (key) {
      case 'good':
        setGood(good => good + 1);
        break;

      case 'neutral':
        setNeutral(neutral => neutral + 1);
        break;

      case 'bad':
        setBad(bad => bad + 1);
        break;

      default:
        throw new Error('Type not found');
    }
  };

   const countTotalFeedback = () => {
    return good + neutral + bad;
  };

   const countPositiveFeedbackPercentage = (total, good) => {
    const percentage = Math.round((good / total) * 100);
    return percentage;
  };


    
    
  const total = countTotalFeedback();
  const positivePercentage = countPositiveFeedbackPercentage(total, good);
  const options = Object.keys(feedbackType);

  return (
    <Container>
          <Section title="Please leave feedback">
              <FeedbackOptions options={options} onClick={onLeaveFeedback}/>
          </Section>
          <Section title="Statistics">
          {total > 0 ? (
            <Statistics
              good={good}
              neutral={neutral}
              bad={bad}
              total={total}
              positivePercentage={positivePercentage}
            />
          ) : (
            <Notification message="There is no feedback" />
          )}
        </Section>   
      </Container>);
};