"use client";

import { handleCreatePersonalInfo } from "../_action";

import { useFormStatus } from "react-dom";
import { useActionState } from "react";

interface PersonalInfoProps {
  name: string;
  email: string;
  telephone: string;
  address: string;
  donate: number;
}

export function PersonalInfoForm() {
  const [state, formAction] = useActionState(handleCreatePersonalInfo, null);

  let personalInfo: PersonalInfoProps = {
    name: "",
    email: "",
    telephone: "",
    address: "",
    donate: 0,
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold mb-4">ลงทะเบียน</h1>
        <p className="mb-4">
          โครงการวันอานันทมหิดล คณะแพทยศาสตร์ จุฬาลงกรณ์มหาวิทยาลัย ประจำปี พ.ศ.
          ๒๕๖๗
        </p>

        <form
          className="flex flex-col space-y-4 w-full max-w-xs"
          action={formAction}
        >
          <input
            name="name"
            required
            type="text"
            placeholder="ชื่อ-นามสกุล"
            className={`input input-bordered w-full max-w-xs ${
              state?.error?.name &&
              "border-strawberry-red focus:ring-[0px] focus:ring-strawberry-red"
            }`}
            defaultValue={personalInfo?.name || ""}
          />
          {state?.error?.name && (
            <span className="mt-1 text-sm font-medium text-red-500">
              {state.error.name}
            </span>
          )}
          <span className="text-gray-500 text-xs">เช่น นายสมชาย ใจดี</span>

          <input
            name="telephone"
            required
            type="tel"
            placeholder="เบอร์โทรศัพท์"
            className={`input input-bordered w-full max-w-xs ${
              state?.error?.telephone &&
              "border-strawberry-red focus:ring-[0px] focus:ring-strawberry-red"
            }`}
            defaultValue={personalInfo?.telephone || ""}
          />
          {state?.error?.telephone && (
            <span className="mt-1 text-sm font-medium text-red-500">
              {state.error.telephone}
            </span>
          )}
          <span className="text-gray-500 text-xs">เช่น 0812345678</span>

          <input
            name="email"
            type="email"
            placeholder="อีเมล(ถ้ามี)"
            className={`input input-bordered w-full max-w-xs ${
              state?.error?.email &&
              "border-strawberry-red focus:ring-[0px] focus:ring-strawberry-red"
            }`}
            defaultValue={personalInfo?.email || ""}
          />
          {state?.error?.email && (
            <span className="mt-1 text-sm font-medium text-red-500">
              {state.error.email}
            </span>
          )}

          <input
            name="address"
            required
            type="text"
            placeholder="ที่อยู่"
            className={`input input-bordered w-full max-w-xs ${
              state?.error?.address &&
              "border-strawberry-red focus:ring-[0px] focus:ring-strawberry-red"
            }`}
            defaultValue={personalInfo?.address || ""}
          />
          {state?.error?.address && (
            <span className="mt-1 text-sm font-medium text-red-500">
              {state.error.address}
            </span>
          )}

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

          <SubmitButton />
        </form>
      </div>
    </div>
  );
}

export function SubmitButton({ form }: { form?: string }) {
  const { pending } = useFormStatus();
  return (
    <button
      className="btn btn-primary w-full mt-4" // Added full width and margin-top to match design
      disabled={pending}
      type="submit"
      form={form}
    >
      {pending ? (
        <span className="loading loading-spinner loading-sm"></span>
      ) : (
        "Next Step"
      )}
    </button>
  );
}
