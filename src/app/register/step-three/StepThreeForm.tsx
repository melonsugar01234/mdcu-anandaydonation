"use client";

import { DatePicker } from "@heroui/date-picker";
import { TimeInput } from "@heroui/date-input";
import { useState } from "react";

export default function StepThreeForm() {
  const [imgsSrc, setImgsSrc] = useState<string[]>([]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      for (const file of e.target.files) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          setImgsSrc((imgs) => [...imgs, reader.result as string]);
        };
        reader.onerror = () => {
          console.error(reader.error);
        };
      }
    }
  };

  // Function to remove an image from the preview list
  const removeImage = (index: number) => {
    setImgsSrc((imgs) => imgs.filter((_, i) => i !== index));
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">หลักฐานการโอนเงิน</h2>

      {/* Date & Time Pickers */}
      <div className="flex flex-wrap md:flex-nowrap gap-4 mb-4">
        <DatePicker isRequired className="w-full" label="วันที่โอน" />
        <TimeInput isRequired className="w-full" label="เวลาที่โอน" />
      </div>

      {/* File Input */}
      <label className="form-control w-full mb-4">
        <div className="label">
          <span className="label-text font-medium">แนบหลักฐานการโอน</span>
          <span className="label-text-alt text-gray-500">Allowed: JPG, PNG</span>
        </div>
        <input
          type="file"
          className="file-input file-input-bordered w-full"
          onChange={onChange}
          multiple
        />
        <div className="label">
          <span className="label-text-alt text-gray-500">Max size: 5MB</span>
          <span className="label-text-alt text-gray-500">สามารถอัปโหลดหลายไฟล์</span>
        </div>
      </label>

      {/* Image Preview Grid */}
      {imgsSrc.length > 0 && (
        <div className="grid grid-cols-3 gap-3 mt-4">
          {imgsSrc.map((link, index) => (
            <div key={index} className="relative group">
              <img
                src={link}
                alt={`Uploaded file ${index + 1}`}
                className="w-full h-24 object-cover rounded-md border shadow-sm"
              />
              {/* Remove Button */}
              <button
                onClick={() => removeImage(index)}
                className="absolute top-1 right-1 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Information Message */}
      <p className="mt-6 text-sm text-gray-600 text-center">
        ทางคณะแพทยศาสตร์ จุฬาฯ จะดำเนินการส่งเข็มโดยเร็ว
        โดยจะเริ่มจัดส่งรอบแรกวันที่ <span className="font-semibold">9 มิถุนายน 2566</span>.
        ขออภัยในความไม่สะดวก
      </p>
    </div>
  );
}
