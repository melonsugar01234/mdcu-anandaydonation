import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Register() {
  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4">
        <div className="flex flex-col items-center justify-center min-h-screen">
          <h1 className="text-2xl font-bold mb-4">ลงทะเบียน</h1>
          <p className="mb-4">
            โครงการวันอานันทมหิดล คณะแพทยศาสตร์ จุฬาลงกรณ์มหาวิทยาลัย ประจำปี
            พ.ศ. ๒๕๖๗
          </p>
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
            <input
              type="email"
              placeholder="อีเมล(ถ้ามี)"
              className="input input-bordered w-full max-w-xs"
            />
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
