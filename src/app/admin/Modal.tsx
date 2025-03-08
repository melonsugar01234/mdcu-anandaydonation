import React, { useState } from "react";
import { Register } from "./page";

interface ModalProps {
  registration: any;
  onClose: () => void;
}

export const Modal: React.FC<ModalProps> = ({ registration, onClose }) => {
  const [paymentStatus, setPaymentStatus] = useState(
    registration.payment_status
  );
  const [shipmentStatus, setShipmentStatus] = useState(
    registration.shipment_status
  );

  const handleConfirm = async () => {
    try {
      const response = await fetch(`/api/admin/${registration.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          payment_status: paymentStatus,
          shipment_status: shipmentStatus,
        }),
      });

      if (!response.ok) {
        console.error("Failed to update registration:", response.statusText);
        return;
      }

      onClose();
    } catch (error) {
      console.error("Error updating registration:", error);
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Registration Details</h2>
        <p>ID: {registration.id}</p>
        <p>Name: {registration.name}</p>
        <p>Created At: {registration.created_at.toString()}</p>
        <p>Shipment Status: {registration.shipment_status}</p>
        <p>Payment Status: {registration.payment_status}</p>
        <p>Receipt: {registration.receipt}</p>
        <p>Card: {registration.card}</p>
        <p>Shirt: {registration.shirt ? "Not Null" : "Null"}</p>

        <label>
          Payment Status:
          <select
            value={paymentStatus}
            onChange={(e) => setPaymentStatus(e.target.value)}
          >
            <option value="accepted">Accepted</option>
            <option value="rejected">Rejected</option>
            <option value="pending">Pending</option>
          </select>
        </label>

        <label>
          Shipment Status:
          <select
            value={shipmentStatus}
            onChange={(e) => setShipmentStatus(e.target.value)}
          >
            <option value="on the way">On the way</option>
            <option value="encounter problem">Encounter problem</option>
            <option value="still in inventory">Still in inventory</option>
            <option value="no order">No order</option>
          </select>
        </label>

        <button onClick={handleConfirm}>Confirm Changes</button>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};
