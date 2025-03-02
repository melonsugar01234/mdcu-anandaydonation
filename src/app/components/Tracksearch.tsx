"use client";

import { useState } from "react";

interface SearchBarProps {
  onSearch: (searchTrackingCode: string) => Promise<void>;
  loading: boolean;
}

export default function SearchBar({ onSearch, loading }: SearchBarProps) {
  const [searchTrackingCode, setSearchTrackingCode] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchTrackingCode);
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
      <input
        type="text"
        value={searchTrackingCode}
        onChange={(e) => setSearchTrackingCode(e.target.value)}
        placeholder="Enter tracking code to search"
        className="input input-bordered flex-1 max-w-xs"
      />
      <button type="submit" disabled={loading} className="btn btn-primary">
        {loading ? "Searching..." : "Search"}
      </button>
    </form>
  );
}
