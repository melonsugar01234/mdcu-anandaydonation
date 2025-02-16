import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-8">
      <div>
        <h1 className="text-center text-3xl">
          ไม่พบหน้าที่คุณต้องการ <br />
          Page Not Found
        </h1>
      </div>
      <Link className="btn btn-primary btn-lg" href="/">
        กลับสู่หน้าหลัก
      </Link>
    </div>
  );
}
