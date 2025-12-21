<script setup lang="ts">
export interface Seller {
  sellerId: string;
  sellerName: string;
  owner: string | null;
  location: string | null;
  banner: string | null;
  rating: number;
  clients: number;
  sellerPicture: string | null;
  description: string | null;
  createdAt: string; // ISO date string
}

export interface User {
  userId: string;
  userName: string;
  email: string | null;
  phone: string | null;
  rating: number | null;
  pfp: string | null;
  role: string | null;
  latitude: number | null;
  longitude: number | null;
  address: string | null;
  postalCode: string | null;
}

export interface ProcessItem {
  processId: string;
  title: string;
  description: string;
  status: string;
  picture: string | null;
  seller: Seller;
  user: User;
}

export interface RefundItem {
  refundId: string;
  processId: string;
  message: string;
  status: string;
  seller: Seller;
  user: User;
}

export interface ShipmentItem {
  shipmentId: string;
  name: string;
  description: string;
  orderId: string;
  status: string;
  quantity: number;
  height: number;
  width: number;
  length: number;
  weight: number;
  category: string | null;
  courierCompany: string | null;
  courierType: string | null;
  orderNote: string | null;
  originNote: string | null;
  destinationNote: string | null;
  token: string;
  redirectUrl: string;
  paymentStatus: string;
}
</script>
