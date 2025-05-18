import React from 'react';
import { Button } from '../../../../components/ui/Button';
import styles from './styles.module.css';
import { DateTimeFormProps } from './types';

export function DateTimeForm({
  date,
  time,
  dontKnowTime,
  error,
  onDateChange,
  onTimeChange,
  onDontKnowTimeChange,
  onNext,
  onBack,
  hideDefaultHelpText = false
}: DateTimeFormProps & { hideDefaultHelpText?: boolean }) {
  // Calculate max date (today)
  const today = new Date();
  const maxDate = today.toISOString().split('T')[0];
  
  // Check if date is valid
  const isDateValid = date ? new Date(date) <= today : true;
  const dateErrorMessage = !date ? 'Birth date is required' : 
                          !isDateValid ? 'Birth date cannot be in the future' : '';
  
  // Check if time is valid
  const timeErrorMessage = !dontKnowTime && !time ? 'Birth time is required unless unknown' : '';
  
  // Current error message or validation message
  const errorMessage = error || dateErrorMessage || timeErrorMessage;
  
  return (
    <div className={styles.form}>
      <div className={styles.fieldGroup}>
        <div className={styles.inputRow}>
          <div className={styles.inputWrapper}>
            <label htmlFor="birthDate" className={styles.label}>Birth Date</label>
            <input
              id="birthDate"
              type="date"
              value={date}
              max={maxDate}
              onChange={(e) => onDateChange(e.target.value)}
              className={`${styles.input} ${!isDateValid ? styles.inputError : ''}`}
              aria-invalid={!isDateValid}
              aria-describedby={!isDateValid ? "dateError" : undefined}
            />
            {!isDateValid && (
              <p id="dateError" className={styles.errorMessage}>
                Birth date cannot be in the future
              </p>
            )}
          </div>

          <div className={styles.inputWrapper}>
            <label htmlFor="birthTime" className={styles.label}>Birth Time</label>
            <input
              id="birthTime"
              type="time"
              value={time}
              disabled={dontKnowTime}
              onChange={(e) => onTimeChange(e.target.value)}
              className={`${styles.input} ${dontKnowTime ? styles.disabled : ''} ${!dontKnowTime && !time && error ? styles.inputError : ''}`}
              aria-disabled={dontKnowTime}
            />
            <div className={styles.checkboxGroup}>
              <input
                type="checkbox"
                id="dontKnowTime"
                checked={dontKnowTime}
                onChange={(e) => onDontKnowTimeChange(e.target.checked)}
                className={styles.checkbox}
              />
              <label htmlFor="dontKnowTime" className={styles.checkboxLabel}>
                I don't know my birth time
              </label>
            </div>
          </div>
        </div>
        
        {!hideDefaultHelpText && (
          <p className={styles.helpText}>
            {dontKnowTime 
              ? "That's okay! We'll create readings that don't require birth time."
              : "For the most accurate readings, please enter your birth time."}
          </p>
        )}
      </div>

      {errorMessage && (
        <p className={styles.error}>{errorMessage}</p>
      )}

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
          size="md"
          onClick={onNext}
        >
          Next
        </Button>
      </div>
    </div>
  );
} 