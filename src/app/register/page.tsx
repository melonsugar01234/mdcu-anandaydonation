"use client";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useLanguage } from "../components/LanguageContext";

export default function Register() {
  const { language, translations } = useLanguage();

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4">
        <div className="flex flex-col items-center justify-center min-h-screen">
          <h1 className="text-2xl font-bold mb-4">{translations[language].register}</h1>
          <p className="mb-4">{translations[language].registerDescription}</p>
          <form className="flex flex-col space-y-4 w-full max-w-xs">
            <input
              required
              type="text"
              placeholder={translations[language].fullName}
              className="input input-bordered w-full max-w-xs"
            />
            <span>{translations[language].fullNameExample}</span>
            <input
              required
              type="tel"
              placeholder={translations[language].phone}
              className="input input-bordered w-full max-w-xs"
            />
            <span>{translations[language].phoneExample}</span>
            <input
              type="email"
              placeholder={translations[language].email}
              className="input input-bordered w-full max-w-xs"
            />
            <input
              required
              type="text"
              placeholder={translations[language].address}
              className="input input-bordered w-full max-w-xs"
            />
            <p>{translations[language].paymentMethod}</p>
            <div className="form-control">
              <label className="label cursor-pointer">
                <input
                  type="radio"
                  name="payment"
                  className="radio checked:bg-primary"
                  defaultChecked
                />
                <span>{translations[language].qrPayment}</span>
              </label>
            </div>
            <div className="form-control">
              <label className="label cursor-pointer">
                <input
                  type="radio"
                  name="payment"
                  className="radio checked:bg-primary"
                />
                <span>{translations[language].bankPayment}</span>
              </label>
            </div>
            <button className="btn btn-primary self-end">{translations[language].next} →</button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}
