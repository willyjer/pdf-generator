import React from 'react';
import { Input } from '../../../../components/ui/Input';
import { Button } from '../../../../components/ui/Button';
import styles from './styles.module.css';
import { NameFormProps } from './types';

export function NameForm({ 
  firstName,
  lastName,
  onFirstNameChange,
  onLastNameChange, 
  onNext,
  onBack 
}: NameFormProps) {
  return (
    <div className={styles.form}>
      <div className={styles.nameRow}>
        <Input
          id="firstName"
          type="text"
          value={firstName}
          onChange={(e) => onFirstNameChange(e.target.value)}
          placeholder="First name"
          fullWidth
        />

        <Input
          id="lastName"
          type="text"
          value={lastName}
          onChange={(e) => onLastNameChange(e.target.value)}
          placeholder="Last name"
          fullWidth
        />
      </div>

      <div className={styles.buttons}>
        <button
          type="button"
          className={styles.backLink}
          onClick={onBack}
        >
                    <span aria-hidden="true" style={{marginRight: '6px'}}>&larr;</span>Back
        </button>
        <Button
          variant="primary"
          size="lg"
          onClick={onNext}
        >
          Next
        </Button>
      </div>
    </div>
  );
} 