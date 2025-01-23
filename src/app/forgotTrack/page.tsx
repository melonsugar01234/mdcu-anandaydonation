import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Link from "next/link";

export default function ForgotTrack() {
  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4">
        <div className="flex flex-col items-center justify-center min-h-screen">
          <h1 className="text-2xl font-bold mb-4">ค้นหารหัสติดตาม</h1>
          <form className="flex flex-col space-y-4 w-full max-w-xs">
            <input
              required
              type="text"
              placeholder="ชื่อ-นามสกุล"
              className="input input-bordered w-full max-w-xs"
            />
            <span>เช่น นายสมชาย ใจดี</span>
            <input
              required
              type="tel"
              placeholder="เบอร์โทรศัพท์"
              className="input input-bordered w-full max-w-xs"
            />
            <span>เช่น 081-901-xxxx</span>
            <button className="btn btn-primary w-full max-w-xs">ค้นหา</button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}
