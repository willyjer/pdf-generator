import React from 'react';
import { Button } from '../../../components/ui/Button';
import styles from './styles.module.css';
import { IntroHeroProps } from './types';

const IntroHero: React.FC<IntroHeroProps> = ({ onStart, onLearnMore }) => (
  <>
    {/* Headline */}
    <h1 className={styles.title}>
      A Modern Approach<br />
      <span className={styles.highlight}>to Ancient Wisdom</span>
    </h1>

    {/* Sub-headline */}
    <p className={styles.description}>
      We've trained AI Agents to follow the same interpretive steps a human astrologer would — so that every reading is symbolic, structured, and deeply personal.
    </p>

    {/* Button Row Centered */}
    <div className={styles.buttonRowCentered}>
      <Button
        variant="primary"
        size="cta"
        onClick={onStart}
        aria-label="Begin your celestial journey"
      >
        Tap to Begin
      </Button>
      <Button
        variant="secondary"
        size="lg"
        onClick={onLearnMore}
        aria-label="Learn more about AstroAware"
      >
        Learn More
      </Button>
    </div>
  </>
);

export default IntroHero; 