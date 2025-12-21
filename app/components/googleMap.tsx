// components/FlightSearch.client.tsx
"use client";
import { useState } from "react";
import { useApi } from "@/hooks/useApi";

export default function FlightSearch() {
  const [origin, setOrigin] = useState("LHR");
  const [destination, setDestination] = useState("JFK");
  const [departDate, setDepartDate] = useState("2026-01-15");
  const api = useApi("/api/search/flights", { method: "GET", immediate: false });

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    await api.refetch({ origin, destination, departDate });
  }

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input value={origin} onChange={e => setOrigin(e.target.value)} />
        <input value={destination} onChange={e => setDestination(e.target.value)} />
        <input type="date" value={departDate} onChange={e => setDepartDate(e.target.value)} />
        <button type="submit">Search</button>
      </form>
      {api.loading && <div>Loading…</div>}
      {api.error && <div>Error: {JSON.stringify(api.error)}</div>}
      <pre>{JSON.stringify(api.data, null, 2)}</pre>
    </div>
  );
}
