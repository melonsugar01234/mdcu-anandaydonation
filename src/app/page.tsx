"use client";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Link from "next/link";
import { useLanguage } from "./components/LanguageContext";

export default function Home() {
  const { language, translations } = useLanguage();

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center gap-4 p-4">
        <div className="artboard artboard-horizontal phone-2">
          <img src="/images/banner_1.jpg" alt="banner_1" />
        </div>
        <div className="divider"></div>
        <h1 className="text-xl font-bold">{translations[language].eventTitle}</h1>
        <h1 className="text-xl font-bold">{translations[language].eventSubtitle}</h1>
        <h2 className="font-bold">{translations[language].socialMedia}</h2>
        <div className="artboard artboard-horizontal phone-2">
          <img src="/images/miles_for_heart.jpg" alt="miles_for_heart" />
        </div>
        <button className="btn btn-wide bg-primary text-white">
          <Link
            href="https://thai.fit/c/mfhvr2024"
            rel="noopener noreferrer"
            target="_blank"
          >
            {translations[language].registerRun}
          </Link>
        </button>
        <div className="artboard artboard-horizontal phone-2">
          <img src="/images/bookbank.png" alt="bookbank" />
        </div>
        <button className="btn btn-wide bg-primary text-white">
          <Link href="/register">{translations[language].register}</Link>
        </button>
        <h2 className="text-xl">{translations[language].stepsTitle}</h2>
        <ol className="list-decimal list-inside">
          <li>
            {translations[language].donationStep1}
            <ol className="list-decimal list-inside ml-4">
              <li>{translations[language].donationAmount}</li>
              <li>
                {translations[language].donationItems}
                <ol className="list-decimal list-inside ml-4">
                  <li>{translations[language].pinOption}</li>
                  <li>{translations[language].shirtOption}</li>
                </ol>
              </li>
              <li>{translations[language].shippingNote}</li>
            </ol>
          </li>
          <li>{translations[language].uploadProof}</li>
          <li>{translations[language].saveInfo}</li>
        </ol>
        <p className="text-red-700">{translations[language].deliveryInfo}</p>
      </div>
      <Footer />
    </>
  );
}
