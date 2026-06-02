const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

export interface CreateOrderRequest {
  userId: string;
  totalCents: number;
  discountCents: number;
  shippingAddressJson: string;
  billingAddressJson: string;
  items: {
    sku: string;
    quantity: number;
    unitPriceCents: number;
  }[];
}

export async function placeOrder(request: CreateOrderRequest, token?: string | null) {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}/api/v1/orders`, {
    method: 'POST',
    headers,
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Failed to place order. Please try again.');
  }

  return response.json();
}
