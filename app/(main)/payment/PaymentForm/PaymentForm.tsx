import { useState } from 'react';
import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { LockIcon, ShieldCheckIcon } from 'lucide-react';
import styles from './styles.module.css';
import { PaymentFormProps } from './types';

export function PaymentForm({ readingsCount, totalAmount, birthFormData }: PaymentFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);
    setErrorMessage('');

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/payment/success`,
        payment_method_data: {
          billing_details: {
            name: `${birthFormData.firstName} ${birthFormData.lastName}`,
          }
        }
      },
    });

    if (error) {
      setErrorMessage(error.message ?? 'An unexpected error occurred');
    }
    
    setIsProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.orderSummary}>
        <div className={styles.orderDetails}>
          <span className={styles.orderText}>Customized Reading × {readingsCount}</span>
          <div className={styles.totalAmount}>${totalAmount}</div>
        </div>
        <div className={styles.deliveryInfo}>
          Your reading will be emailed to you shortly after payment
        </div>
      </div>

      <div className={styles.paymentElement}>
        <PaymentElement 
          options={{
            layout: {
              type: 'accordion',
              defaultCollapsed: true,
              radios: true,
              spacedAccordionItems: true
            },
            paymentMethodOrder: ['card', 'apple_pay', 'google_pay', 'link']
          }}
        />
      </div>
      
      {errorMessage && (
        <div className={styles.error}>
          {errorMessage}
        </div>
      )}

      <button
        type="submit" 
        disabled={!stripe || isProcessing} 
        className={styles.submitButton}
      >
        {isProcessing ? 'Processing...' : 'Complete Payment'}
      </button>

      <div className={styles.stripeFooter}>
        <div className={styles.poweredBy}>
          Powered by <span className={styles.stripeLogo}>stripe</span>
        </div>
        <div className={styles.links}>
          <a 
            href="https://stripe.com/legal" 
            target="_blank" 
            rel="noopener noreferrer"
            className={styles.footerLink}
          >
            Terms
          </a>
          <a 
            href="https://stripe.com/privacy" 
            target="_blank" 
            rel="noopener noreferrer"
            className={styles.footerLink}
          >
            Privacy
          </a>
        </div>
      </div>
    </form>
  );
} 