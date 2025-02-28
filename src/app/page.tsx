import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Link from "next/link";
//hello
export default function Home() {
  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center gap-4 p-4 ">
        <div className="artboard artboard-horizontal phone-2">
          <img src="/images/banner_1.jpg" alt="banner_1" />
        </div>
        <div className="divider"></div>
        <h1 className="text-xl font-bold">
          'Miles for Heart' Virtual Walk and Run เปิดรับสมัครแล้ววันนี้
        </h1>
        <h1 className="text-xl font-bold">
          มาร่วมเดิน-วิ่งเพื่อสุขภาพไปด้วยกันนะคะ
        </h1>
        <h2 className="font-bold">
          {" "}
          Facebook : ANAN DAY Instagram: @anan_day หรือบนเว็บไซต์นี้
        </h2>
        <div className="artboard artboard-horizontal phone-2">
          <img src="/images/miles_for_heart.jpg" alt="miles_for_heart" />
        </div>
        <button className="btn btn-wide bg-primary text-white">
          <Link
            href="https://thai.fit/c/mfhvr2024"
            rel="noopener noreferrer"
            target="_blank"
          >
            ลงทะเบียนงานวิ่ง
          </Link>
        </button>
        <div className="artboard artboard-horizontal phone-2">
          <img src="/images/bookbank.png" alt="bookbank" />
        </div>
        <button className="btn btn-wide bg-primary text-white">
          <Link href="/register">ลงทะเบียน</Link>
        </button>
        <h2 className="text-xl">
          ขั้นตอนการขอรับเข็ม หรือเสื้อยืด ที่ระลึกวันอานันทมหิดล
        </h2>
        <ol className="list-decimal list-inside">
          <li>
            กรอกข้อมูลการบริจาค
            <ol className="list-decimal list-inside ml-4">
              <li>จํานวนเงินที่ประสงค์จะบริจาค</li>
              <li>
                ระบุจํานวนเสื้อ หรือ เข็ม หรือ เสื้อและเข็ม
                ที่ผู้บริจาคประสงค์จะรับในวงเงินที่บริจาค
                <ol className="list-decimal list-inside ml-4">
                  <li>
                    เงินบริจาคทุก 150 บาท สามารถรับเข็มเดี่ยวที่ระลึกได้ 1 อัน
                  </li>
                  <li>
                    เงินบริจาคทุก 299 บาท สามารถรับเสื้อยืดที่ระลึกได้ 1 ตัว
                  </li>
                </ol>
              </li>
              <li>หมายเหตุ: จัดส่งฟรีไม่เสียค่าจัดส่งเพิ่มเติม</li>
            </ol>
          </li>
          <li>แนบหลักฐานการโอนเงิน(สลิป)</li>
          <li>กดบันทึกข้อมูล</li>
        </ol>
        <p className="text-red-700">
          ทางคณะแพทยศาสตร์ จุฬา
          จะดําเนินการส่งเข็มและเสื้อโดยทําการสรุปยอดทุกวันที่ 1 ของทุกเดือนเวลา
          12:00 และจะทําการจัดส่ง ภายใน 3 สัปดาห์หลังจากสรุปยอด
          เวลาที่แจ้งเป็นแค่การประมาณ อาจล่าช้าตามการผลิต
        </p>
      </div>
      <Footer />
    </>
  );
}
