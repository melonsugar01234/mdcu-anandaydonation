"use client";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useLanguage } from "../components/LanguageContext";

export default function ForgotTrack() {
  const { language, translations } = useLanguage();

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4">
        <div className="flex flex-col items-center justify-center min-h-screen">
          <h1 className="text-2xl font-bold mb-4">{translations[language].forgotTrack}</h1>
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
            <button className="btn btn-primary w-full max-w-xs">{translations[language].search}</button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}
