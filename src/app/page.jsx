"use client";
import React from "react";

export default function HomePage() {
  return (
    <div style={{ padding: "40px", textAlign: "center", fontFamily: "sans-serif" }}>
      <h1 style={{ color: "#1e293b" }}>🚗 CareAuto Pro</h1>
      <p style={{ color: "#64748b" }}>Piattaforma Gestionale Attiva</p>
      <div style={{ marginTop: "20px", display: "flex", gap: "10px", justifyContent: "center" }}>
        <a href="/profilo" style={{ padding: "12px 20px", background: "#3b82f6", color: "white", borderRadius: "8px", textDecoration: "none" }}>Profilo</a>
        <a href="/notifiche" style={{ padding: "12px 20px", background: "#f1f5f9", color: "#1e293b", borderRadius: "8px", textDecoration: "none" }}>Notifiche</a>
      </div>
    </div>
  );
}