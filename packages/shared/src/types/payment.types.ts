import type { IsoDateTimeString, ObjectIdString, Timestamps } from './common.types.js';

export const PaymentStatus = {
  Created: 'created',
  Paid: 'paid',
  Failed: 'failed',
  Refunded: 'refunded',
  PartiallyRefunded: 'partiallyRefunded',
} as const;

export type PaymentStatus = (typeof PaymentStatus)[keyof typeof PaymentStatus];

export const PAYMENT_STATUSES = [
  PaymentStatus.Created,
  PaymentStatus.Paid,
  PaymentStatus.Failed,
  PaymentStatus.Refunded,
  PaymentStatus.PartiallyRefunded,
] as const satisfies readonly PaymentStatus[];

export const PaymentMethod = {
  Upi: 'upi',
  Card: 'card',
  NetBanking: 'netBanking',
  Wallet: 'wallet',
  Cash: 'cash',
} as const;

export type PaymentMethod = (typeof PaymentMethod)[keyof typeof PaymentMethod];

export const PAYMENT_METHODS = [
  PaymentMethod.Upi,
  PaymentMethod.Card,
  PaymentMethod.NetBanking,
  PaymentMethod.Wallet,
  PaymentMethod.Cash,
] as const satisfies readonly PaymentMethod[];

export interface IPayment extends Timestamps {
  _id: ObjectIdString;
  appointmentId: ObjectIdString;
  patientId: ObjectIdString;
  /** Amount in the smallest currency unit (paise), matching Razorpay. */
  amount: number;
  currency: string;
  status: PaymentStatus;
  method?: PaymentMethod;
  razorpayOrderId?: string;
  razorpayPaymentId?: string;
  refundedAmount?: number;
  paidAt?: IsoDateTimeString;
}
