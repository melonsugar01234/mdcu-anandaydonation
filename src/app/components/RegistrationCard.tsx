"use client"
interface Register {
  id: number;
  name: string;
  tracking_code: string;
  shirt: string;
  card: string;
  shipment_status: string
  payment_amount: string
  payment_proof: string 
  payment_status: string
}

interface RegistrationCardProps {
  registration: Register;
}

export default function RegistrationCard({
  registration,
}: RegistrationCardProps) {
  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body items-center text-center">
        {/* Payment Proof Image */}
        {registration.payment_proof && (
          <figure className="mb-4">
            <img
              src={registration.payment_proof}
              alt={`Payment proof for ${registration.name}`}
              className="rounded-lg max-w-sm"
            />
          </figure>
        )}

        <h2 className="card-title">{registration.name}</h2>
        
        <div className="space-y-4 w-full max-w-md">
          {/* Tracking Information */}
          <div>
            <h3 className="font-bold text-lg">Tracking Information</h3>
            <p>Tracking Code: {registration.tracking_code}</p>
            <p>Shipment Status: {registration.shipment_status || 'Not shipped'}</p>
          </div>

          {/* Order Details */}
          <div>
            <h3 className="font-bold text-lg">Order Details</h3>
            <p>Shirt Size: {registration.shirt || 'Not selected'}</p>
            <p>Card: {registration.card || 'Not selected'}</p>
          </div>

          {/* Payment Information */}
          <div>
            <h3 className="font-bold text-lg">Payment Information</h3>
            <p>Amount: {registration.payment_amount || 'Not specified'}</p>
            <p>Status: {registration.payment_status || 'Pending'}</p>
          </div>

          {/* ID */}
          <div className="text-xs text-gray-500">
            ID: {registration.id}
          </div>
        </div>
      </div>
    </div>
  );
}
