"use client";
import React from "react";

export default function HomePage() {
  return (
    <div style={{ padding: "50px", textAlign: "center", fontFamily: "sans-serif" }}>
      <h1 style={{ fontSize: "2.5rem" }}>✅ CareAuto Pro Online</h1>
      <p>Se vedi questa pagina, il deploy funziona correttamente.</p>
      <div style={{ marginTop: "30px", display: "flex", gap: "10px", justifyContent: "center" }}>
        <a href="/profilo" style={{ padding: "15px 25px", background: "#0070f3", color: "white", borderRadius: "10px", textDecoration: "none", fontWeight: "bold" }}>Vai al Profilo</a>
        <a href="/notifiche" style={{ padding: "15px 25px", background: "#f0f0f0", color: "black", borderRadius: "10px", textDecoration: "none", fontWeight: "bold" }}>Notifiche</a>
      </div>
    </div>
  );
}