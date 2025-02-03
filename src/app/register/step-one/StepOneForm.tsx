"use client";

import Input from '../components/Input';
import { useActionState } from 'react';
import { stepOneFormAction } from './action';
import { FormErrors } from '@/lib/types';
import SubmitButton from '../components/SubmitButton';

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
          <Input
            label="ชื่อ-นามสกุล"
            id="name"
            type="text"
            required
            description="เช่น นายสมชาย ใจดี"
            errorMsg={serverErrors?.name}
          />

          <Input
            label="เบอร์โทรศัพท์"
            id="telephone"
            type="tel"
            required
            description="เช่น 0812345678"
            errorMsg={serverErrors?.telephone}
          />

          <Input
            label="อีเมล(ถ้ามี)"
            id="email"
            type="email"
            errorMsg={serverErrors?.email}
          />

          <Input
            label="ที่อยู่"
            id="address"
            type="text"
            required
            errorMsg={serverErrors?.address}
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
            <SubmitButton text="Submit"/>
          </div>
        </form>
      </div>
    </div>
  );
}
