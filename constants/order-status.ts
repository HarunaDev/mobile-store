import { OrderStatus } from '@/types/order';

export const statusDisplayText: Record<OrderStatus, string> = {
  Pending: 'Pending',
  Completed: 'Completed',
  Shipped: 'Shipped',
  InTransit: 'In Transit',
};

export const statusStyles: Record<
  OrderStatus,
  {
    container: string;
    text: string;
  }
> = {
  Pending: {
    container: 'bg-yellow-100',
    text: 'text-yellow-700',
  },
  Completed: {
    container: 'bg-green-100',
    text: 'text-green-700',
  },
  Shipped: {
    container: 'bg-blue-100',
    text: 'text-blue-700',
  },
  InTransit: {
    container: 'bg-purple-100',
    text: 'text-purple-700',
  },
};