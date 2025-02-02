import StepNavigation from "../components/StepNavigation";
import ConfirmDonation from "./ConfirmDonation";
import Navbar from "../../components/Navbar";
import StepThreeForm from "./StepThreeForm";

export default function ConfirmInfoPage() {
  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4">
        <div className="mt-0 flex flex-col rounded-lg bg-white p-4 xs:p-0">
          <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-2xl font-bold mb-4">สรุปยอดเงิน</h1>
            <p className="text-red-700">
              เว็บไซต์นี้อาจจะไม่ทำงานหากเปิดจากแอปพลิเคชัน Line หรือ Facebook
              กรุณาเข้าใช้งานเว็บไซต์นี้ผ่านเบราวเซอร์ Chrome, Firefox,
              Microsoft Edge หรือ Safari
            </p>
            <ConfirmDonation />
            <div className="artboard artboard-horizontal phone-2">
          <img src="/images/bookbank.png" alt="bookbank" />
        </div>
        <StepThreeForm/>
        
            <StepNavigation />
          </div>
        </div>
      </div>
    </>
  );
}
