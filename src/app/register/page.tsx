import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Register() {
  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4">
        <div className="flex flex-col items-center justify-center min-h-screen">
          <h1 className="text-5xl font-bold mb-4">ลงทะเบียน</h1>
          <div className="text-2xl mb-4 text-center">
            <div>โครงการวันอานันทมหิดล คณะแพทยศาสตร์</div>
            <div>จุฬาลงกรณ์มหาวิทยาลัย ประจำปี พ.ศ. ๒๕๖๗</div>
          </div>
          <form className="flex flex-col space-y-4 w-full max-w-xs">
            <span>ชื่อ-นามสกุล</span>
            <input
              required
              type="text"
              placeholder="เช่น นายสมชาย ใจดี"
              className="input input-bordered w-full max-w-xs"
            />
            <span>เบอร์โทรศัพท์</span>
            <input
              required
              type="tel"
              placeholder="เช่น 081-901-xxxx"
              className="input input-bordered w-full max-w-xs"
            />
            <span>email (ถ้ามี)</span>
            <input
              type="email"
              placeholder="เข่น steve@gmail.com"
              className="input input-bordered w-full max-w-xs"
            />
            <span>ที่อยู่จัดส่ง</span>
            <input
              required
              type="text"
              placeholder="ที่อยู่จัดส่ง"
              className="input input-bordered w-full max-w-xs"
            />
            <p>โปรดเลือกวิธิการชำระเงิน</p>
            <div className="form-control">
              <label className="label cursor-pointer">
                <input
                  type="radio"
                  name="payment"
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
                  name="payment"
                  className="radio checked:bg-primary"
                />
                <span>บริจาคผ่านเลขที่บัญชี</span>
              </label>
            </div>
            <button className="btn btn-primary self-end">ต่อไป →</button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}
