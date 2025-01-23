import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Link from "next/link";

export default function Track() {
  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4">
        <div className="flex flex-col items-center justify-center min-h-screen">
          <h1 className="text-2xl font-bold mb-4">ติดตามสถานะ</h1>
          <form className="flex flex-col space-y-4 w-full max-w-xs">
            <input
              required
              type="text"
              placeholder="รหัสติดตาม"
              className="input input-bordered w-full max-w-xs"
            />
            <button className="btn btn-primary w-full max-w-xs">ค้นหา</button>
          </form>
          <Link href="/forgotTrack" className="link link-accent">ลืมรหัส</Link>
        </div>
      </div>
      <Footer />
    </>
  );
}
