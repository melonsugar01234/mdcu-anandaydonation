"use client";

export default function DonationInfoForm() {
  return (
    <>
      <div className="container mx-auto p-4">
        <div className="flex flex-col items-center justify-center min-h-screen">
          <form action="">
            <p>ข้อมูลการบริจาค</p>
            <input className="input input-bordered w-full max-w-xs" type="text" placeholder="จำนวนเงิน" />
          <p>เข็มที่ระลึก</p>
          <p>ตัวอย่างเข็มที่ระลึก</p>
          <p>จำนวนเข็มที่ขอรับได้สูงสุด: </p>
          <p>(เงินบริจาค 150 บาทต่อเข็มที่ระลึก 1 ชิ้น)</p>
          <input className="input input-bordered w-full max-w-xs" type="text" placeholder="จำนวนเข็ม" />
          <p>เสื้อที่ระลึก</p>
          <p>จำนวนเสื้อที่ขอรับ</p>
          <div className="form-control">
            <label className="label cursor-pointer">
              <input
                type="radio"
                name="buyShirt"
                value="1"
                className="radio checked:bg-primary"
                defaultChecked
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
              />
              <span>มั่ย!!!</span>
            </label>
          </div>
          </form>
        </div>
      </div>
    </>
  );
}
