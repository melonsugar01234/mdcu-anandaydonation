"use client";

import React from "react";

interface StatisticalDataProps {
  statistics: {
    totalDonators: number;
    totalMoney: number;
    totalMoneyApproved: number;
    totalCardwithboxOrders: number;
    totalCardwithboxOrdersApproved: number;
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
      <h2 className="text-xl font-bold">ข้อมูลสถิติ</h2>
      <p>ผู้บริจาครวมทั้งหมด: {statistics.totalDonators}</p>
      <p>ยอดบริจาครวม (ทั้งหมด): {statistics.totalMoney}</p>
      <p>ยอดบริจาครวม (ตรวจสอบการชำระเงินแล้ว): {statistics.totalMoneyApproved}</p>
      <p>ผู้บริจาคที่ไม่มีคำสั่งซื้อ: {statistics.donatorsWithoutOrder}</p>
      <p>ผู้บริจาคที่สั่งซื้อเสื้อที่ระลึก: {statistics.donatorsWithShirtOrder}</p>
      <p>ผู้บริจาคที่สั่งซื้อเข็มที่ระลึก: {statistics.donatorsWithCardOrder}</p>
      <p>
        ผู้บริจาคที่สั่งซื้อทั้งเสื้อที่ระลึกและเข็มที่ระลึก:{" "}
        {statistics.donatorsWithBothOrders}
      </p>
      <p>ยอดสั่งซื้อเข็มที่ระลึกทั้งหมด: {statistics.totalCardOrders}</p>
      <p>
        ยอดสั่งซื้อเข็มที่ระลึกทั้งหมด (ตรวจสอบการชำระเงินแล้ว):{" "}
        {statistics.totalCardOrdersApproved}
      </p>
      <p>
        ยอดสั่งซื้อเข็มพร้อมกล่องทั้งหมด:{" "}
        {statistics.totalCardwithboxOrders}
      </p>
      <p>
        ยอดสั่งซื้อเข็มพร้อมกล่องทั้งหมด (ชำระเงินแล้ว):{" "}
        {statistics.totalCardwithboxOrdersApproved}
      </p>
      <h3 className="font-bold">ยอดสั่งซื้อเสื้อที่ระลึกทั้งหมด:</h3>
      {Object.entries(statistics.totalShirtOrders).map(([key, count]) => (
        <p key={key}>
          รวม {key}: {count}
        </p>
      ))}

      {/* <h3 className="font-bold">ยอดสั่งซื้อเสื้อที่ระลึกทั้งหมด (ชำระเงินแล้ว):</h3>
      {Object.entries(statistics.totalShirtOrdersApproved).map(
        ([key, count]) => (
          <p key={key}>
            รวม {key}: {count}
          </p>
        )
      )} */}
    </div>
  );
};

export default StatisticalData;
