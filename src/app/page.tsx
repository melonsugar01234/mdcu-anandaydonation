"use client";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Link from "next/link";

import { useLanguage } from "./context/LanguageContext";

export default function Home() {
  const { language } = useLanguage();
  return (
    <>
      <Navbar />
      <div className={`flex flex-col items-center gap-4 p-4 ${
              language === "th" ? "" : "hidden"
            }`}>

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
      <div className={`flex flex-col items-center gap-4 p-4 ${
              language === "en" ? "" : "hidden"
            }`}>
        <div className="artboard artboard-horizontal phone-2">
          <img src="/images/banner_1.jpg" alt="banner_1" />
        </div>
        <div className="divider"></div>
        <h1 className="text-xl font-bold">
          'Miles for Heart' Virtual Walk and Run is now open for registration
        </h1>
        <h1 className="text-xl font-bold">
          join us for a virtual walk and run for health
        </h1>
        <h2 className="font-bold">
          {" "}
          Facebook : ANAN DAY Instagram: @anan_day or on this website
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
            Register for the virtual walk & run
          </Link>
        </button>
        <div className="artboard artboard-horizontal phone-2">
          <img src="/images/bookbank.png" alt="bookbank" />
        </div>
        <button className="btn btn-wide bg-primary text-white">
          <Link href="/register">Register</Link>
        </button>
        <h2 className="text-xl">
          How to request a card or t-shirt commemorating Ananda Mahidol
        </h2>
        <ol className="list-decimal list-inside">
          <li>
            Fill in donation information
            <ol className="list-decimal list-inside ml-4">
              <li>donation amount</li>
              <li>
                number of t-shirts or card
                that the donor wants to receive in the donation amount
                <ol className="list-decimal list-inside ml-4">
                  <li>
                    For each 150 baht donated, you can receive 1 commemorative card
                  </li>
                  <li>
                    For each 299 baht donated, you can receive 1 t-shirt
                  </li>
                </ol>
              </li>
              <li>note: shipping is free</li>
            </ol>
          </li>
          <li>atttach donation proof(slip)</li>
          <li>press submit</li>
        </ol>
        <p className="text-red-700">
        "The Faculty of Medicine, Chulalongkorn University, 
        will proceed with sending cards and shirts after total up the donation amount
        on the 1st of every month 
        at 12:00 PM. The delivery will be made within 3 
        weeks after the process is completed. The notified 
        time is just an estimate and can be delayed depending
         on the production process."
        </p>
      </div>
      <Footer />
    </>
  );
}
