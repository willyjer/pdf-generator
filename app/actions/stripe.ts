'use server'

import { headers } from 'next/headers'
import { stripe } from '../lib/stripe'
import type { Reading } from '../../types'

export async function createPaymentIntent(readings: Reading[]) {
  const totalAmount = readings.reduce((sum, reading) => sum + reading.price, 0);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: totalAmount * 100, // Convert to cents
    currency: 'usd',
    automatic_payment_methods: {
      enabled: true,
    },
    metadata: {
      readings: readings.map(r => r.id).join(','),
    },
  });

  return paymentIntent.client_secret;
} 