"use client"; // Ensure this is at the top
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Link from "next/link";
import { useLanguage } from "../components/LanguageContext";

export default function Track() {
  const { language, translations } = useLanguage();

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4">
        <div className="flex flex-col items-center justify-center min-h-screen">
          <h1 className="text-2xl font-bold mb-4">{translations[language].trackStatus}</h1>
          <form className="flex flex-col space-y-4 w-full max-w-xs">
            <input
              required
              type="text"
              placeholder={translations[language].trackingCode}
              className="input input-bordered w-full max-w-xs"
            />
            <button className="btn btn-primary w-full max-w-xs">{translations[language].search}</button>
          </form>
          <Link href="/forgotTrack" className="link link-accent">{translations[language].forgotCode}</Link>
        </div>
      </div>
      <Footer />
    </>
  );
}
