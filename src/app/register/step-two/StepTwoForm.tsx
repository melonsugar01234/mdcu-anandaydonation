"use client";

import { useState } from "react";
import Input from "../components/Input";
import { useActionState } from 'react';
import { stepTwoFormAction } from './action';
import SubmitButton from "../components/SubmitButton";
import { FormErrors } from '@/lib/types';

const initialState: FormErrors = {};

export default function StepTwoForm() {

   const [serverErrors, formAction] = useActionState(
      stepTwoFormAction,
      initialState
    );

  const [buyShirt, setBuyShirt] = useState("1");
  const [shirtOrders, setShirtOrders] = useState<
    { id: number; size: string }[]
  >([]);

  const handleBuyShirtChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBuyShirt(event.target.value);
  };

  const addShirtOrder = () => {
    setShirtOrders([...shirtOrders, { id: Date.now(), size: "M" }]); // Default size: M
  };

  const updateShirtSize = (id: number, size: string) => {
    setShirtOrders(
      shirtOrders.map((order) => (order.id === id ? { ...order, size } : order))
    );
  };

  const removeShirtOrder = (id: number) => {
    setShirtOrders(shirtOrders.filter((order) => order.id !== id));
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col items-center justify-center min-h-screen">
        <form action={formAction}>
          <Input
            label="จำนวนเงินที่จะบริจาค"
            id="donateAmount"
            type="text"
            required
            description="เงินบริจาค 150 บาทต่อเข็มที่ระลึก 1 ชิ้น"
          />
          <p>เข็มที่ระลึก</p>
          <div className="flex justify-center space-x-4">
            <div className="artboard phone-2 flex flex-col items-center">
              <img src="/images/Pin24-1.png" alt="Pin-1" />
              <p>แบบที่ 1</p>
            </div>
            <div className="artboard phone-2 flex flex-col items-center">
              <img src="/images/Pin24-2.png" alt="Pin-2" />
              <p>แบบที่ 2</p>
            </div>
            <div className="artboard phone-2 flex flex-col items-center">
              <img src="/images/Pin24-3.png" alt="Pin-3" />
              <p>แบบที่ 3</p>
            </div>
          </div>
          <div className="flex justify-center">
            <p>ตัวอย่างเข็มที่ระลึก</p>
          </div>
          <Input
            label="จำนวนเข็ม"
            id="pinAmount"
            type="text"
            required
          />
          <p>เสื้อที่ระลึก</p>
          <div className="flex justify-center">
            <img
              src="/images/tshirt.jpg"
              alt="tshirt size"
              className="w-max"
            />
          </div>
          <p>จำนวนเสื้อที่ขอรับ</p>
          <div className="form-control">
            <label className="label cursor-pointer">
              <input
                type="radio"
                name="buyShirt"
                value="1"
                className="radio checked:bg-primary"
                checked={buyShirt === "1"}
                onChange={handleBuyShirtChange}
              />
              <span>ประสงค์จะแลกเสื้อ</span>
            </label>
          </div>
          <div className="form-control">
            <label className="label cursor-pointer">
              <input
                type="radio"
                name="buyShirt"
                value="0"
                className="radio checked:bg-primary"
                checked={buyShirt === "0"}
                onChange={handleBuyShirtChange}
              />
              <span>ไม่ประสงค์จะแลกเสื้อ</span>
            </label>
          </div>
          {/* Shirt Order Controls (Shown only if "want shirt" is selected) */}
          {buyShirt === "1" && (
            <div className="mt-4 space-y-2">
              <button
                type="button"
                className="btn btn-outline w-full"
                onClick={addShirtOrder}
              >
                + เพิ่มการสั่งซื้อเสื้อ
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {shirtOrders.map((order, index) => (
                  <div
                    key={order.id}
                    className="flex flex-col items-center space-y-2 border p-4 rounded shadow-md bg-white"
                  >
                    <span className="font-semibold">เสื้อ {index + 1}</span>
                    <select
                      value={order.size}
                      onChange={(e) => updateShirtSize(order.id, e.target.value)}
                      className="select select-bordered w-full"
                    >
                      <option value="XS">XS</option>
                      <option value="S">S</option>
                      <option value="M">M</option>
                      <option value="L">L</option>
                      <option value="XL">XL</option>
                      <option value="2XL">2XL</option>
                      <option value="3XL">3XL</option>
                    </select>
                    <button
                      type="button"
                      className="btn btn-error w-full"
                      onClick={() => removeShirtOrder(order.id)}
                    >
                      ลบ
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
          <div>
            <SubmitButton text="Continue" />
          </div>
        </form>
      </div>
    </div>
  );
}
