'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import styles from './page.module.css';
import IntroHero from './IntroHero';
import LearnList from './LearnList';
import IntroFooter from './IntroFooter';
import { StarfieldBackground } from '../../components/ui/StarfieldBackground';

export default function IntroPage() {
  const router = useRouter();
  const [section, setSection] = useState(0);

  const handleStart = () => {
    router.push('/readings');
  };

  return (
    <div className={`${styles.intro} vignette-bg`}>
      <div className={styles.content}>
        {section === 0 && (
          <IntroHero onStart={handleStart} onLearnMore={() => setSection(1)} />
        )}
        {section === 1 && (
          <>
            <h2 className={styles.title}>
              <span role="img" aria-label="Saturn">🪐</span> What You'll Experience
            </h2>
            <LearnList />
            <div className={styles.buttonRow}>
              <Button
                variant="secondary"
                size="md"
                onClick={() => setSection(0)}
                aria-label="Back to Home"
                leftIcon={<ArrowLeft />}
              >
                Home
              </Button>
              <Button
                variant="primary"
                size="md"
                onClick={handleStart}
                aria-label="View Readings"
              >
                View Readings
              </Button>
              <Button
                variant="secondary"
                size="md"
                onClick={() => alert('Reviews coming soon!')}
                aria-label="Reviews"
                rightIcon={<ArrowRight />}
              >
                Reviews
              </Button>
            </div>
          </>
        )}
      </div>

      {/* Footer */}
      <IntroFooter />

      {/* Background Elements */}
      <StarfieldBackground />
    </div>
  );
}

