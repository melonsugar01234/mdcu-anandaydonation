"use client";

import { useActionState } from "react";
import { stepOneFormAction } from "./action";
import { FormErrors } from "@/lib/types";
import SubmitButton from "@/app/components/SubmitButton";

const initialState: FormErrors = {};

export default function StepOneForm() {

  const [serverErrors, formAction] = useActionState(
    stepOneFormAction,
    initialState
  );


  return (
    <div className="container mx-auto p-4">

     
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold mb-4">ลงทะเบียน</h1>
        <p className="mb-4">
          โครงการวันอานันทมหิดล คณะแพทยศาสตร์ จุฬาลงกรณ์มหาวิทยาลัย ประจำปี พ.ศ.
          ๒๕๖๗
        </p>

        <form className="flex flex-col space-y-4 w-full max-w-xs" action={formAction}>
          <input
            name="name"
            required
            type="text"
            placeholder="ชื่อ-นามสกุล"
            className="input input-bordered w-full max-w-xs"
            
          />

          <span className="text-gray-500 text-xs">เช่น นายสมชาย ใจดี</span>

          <input
            name="telephone"
            required
            type="tel"
            placeholder="เบอร์โทรศัพท์"
            className="input input-bordered w-full max-w-xs "
            
          />

          <span className="text-gray-500 text-xs">เช่น 0812345678</span>

          <input
            name="email"
            type="email"
            placeholder="อีเมล(ถ้ามี)"
            className="input input-bordered w-full max-w-xs"/>

          <input
            name="address"
            required
            type="text"
            placeholder="ที่อยู่"
            className="input input-bordered w-full max-w-xs "
            
            />
          <p>โปรดเลือกวิธิการชำระเงิน</p>
          <div className="form-control">
            <label className="label cursor-pointer">
              <input
                type="radio"
                name="donate"
                value="0"
                className="radio checked:bg-primary"
                defaultChecked
              />
              <span>บริจาคผ่าน QR CODE</span>
            </label>
          </div>
          <div className="form-control">
            <label className="label cursor-pointer">
              <input
                type="radio"
                name="donate"
                value="1"
                className="radio checked:bg-primary"
              />
              <span>บริจาคผ่านเลขที่บัญชี</span>
            </label>
          </div>

          <SubmitButton text="Continue" />
        </form>
      </div>
    </div>
  );
}
