"use client";

import { useState } from "react";
import { useLanguage } from "../context/LanguageContext"; // Adjust the path as necessary
import Link from "next/link";
interface SearchBarProps {
  onSearch: (searchTrackingCode: string) => Promise<void>;
  loading: boolean;
}

export default function SearchBar({ onSearch, loading }: SearchBarProps) {
  const [searchTrackingCode, setSearchTrackingCode] = useState("");
  const { language } = useLanguage(); // Get the language from context

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchTrackingCode);
  };

  return (
    <>
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-2 mb-4"
    >
      <div className="flex gap-2 w-full max-w-4xl">
        <input
          type="text"
          value={searchTrackingCode}
          onChange={(e) => setSearchTrackingCode(e.target.value)}
          placeholder="โปรดใส่รหัสติดตาม"
          className={`input input-bordered flex-1 w-96 ${
            language === "th" ? "" : "hidden"
          } `}
        />
        <input
          type="text"
          value={searchTrackingCode}
          onChange={(e) => setSearchTrackingCode(e.target.value)}
          placeholder="Enter tracking code to search"
          className={`input input-bordered flex-1 w-96 ${
            language === "en" ? "" : "hidden"
          } `}
        />
      </div>
      <button type="submit" disabled={loading} className="btn btn-primary">
        {loading ? "Searching..." : "Search"}
      </button>
     
    </form>
     <div className="text-center "> {/* Optional: Add margin for spacing */}
     <Link href="/forgotTrack" className={`underline ${
            language === "th" ? "" : "hidden"
          } `} >ลืมรหัส</Link>
      <Link href="/forgotTrack" className={`underline ${
            language === "en" ? "" : "hidden"
          } `} >forgot code</Link>
   </div>
   </>
  );
}
