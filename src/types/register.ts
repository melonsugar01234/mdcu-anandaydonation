export interface Register {
  id: number;
  name: string;
  phone: string;
  email: string | null;
  home: string;
  tracking_code: string;
  created_at: Date;
  edited_at: Date;
  card: number | null;
  cardwithbox: number | null;
  shirts: string | null;
  shipment_status: string | null;
  payment_method: string | null;
  payment_amount: string | null;
  payment_proof: string | null;
  payment_status: string | null;
  receipt: string | null;
  national_id: string | null;
  name_on_receipt: string | null;
  address_on_receipt: string | null;
}
