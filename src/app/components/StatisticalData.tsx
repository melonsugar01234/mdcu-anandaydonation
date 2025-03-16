"use client";

import React from "react";

interface StatisticalDataProps {
  statistics: {
    totalDonators: number;
    donatorsWithoutOrder: number;
    donatorsWithShirtOrder: number;
    donatorsWithCardOrder: number;
    donatorsWithBothOrders: number;
    totalCardOrders: number;
    totalCardOrdersApproved: number;
    totalShirtOrders: { [key: string]: number };
    totalShirtOrdersApproved: { [key: string]: number };
  };
}

const StatisticalData: React.FC<StatisticalDataProps> = ({ statistics }) => {
  return (
    <div className="space-x-4 space-y-0.5">
      <h2 className="text-xl font-bold">Statistical Data</h2>
      <p>Total Donators: {statistics.totalDonators}</p>
      <p>Donators Without Order: {statistics.donatorsWithoutOrder}</p>
      <p>Donators With Shirt Order: {statistics.donatorsWithShirtOrder}</p>
      <p>
        Donators With Commemorative Card Order:{" "}
        {statistics.donatorsWithCardOrder}
      </p>
      <p>
        Donators With Both Shirt and Card Order:{" "}
        {statistics.donatorsWithBothOrders}
      </p>
      <p>Total Commemorative Card Orders: {statistics.totalCardOrders}</p>
      <p>
        Total Commemorative Card Orders (Approved Payment):{" "}
        {statistics.totalCardOrdersApproved}
      </p>

      <h3 className="font-bold">Total Shirt Orders:</h3>
      {Object.entries(statistics.totalShirtOrders).map(([key, count]) => (
        <p key={key}>
          Total {key}: {count}
        </p>
      ))}

      <h3 className="font-bold">Total Shirt Orders (Approved Payment):</h3>
      {Object.entries(statistics.totalShirtOrdersApproved).map(
        ([key, count]) => (
          <p key={key}>
            Total {key}: {count}
          </p>
        )
      )}
    </div>
  );
};

export default StatisticalData;
