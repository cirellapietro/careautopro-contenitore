"use client";
import React from "react";

export default function HomePage() {
  return (
    <div style={{ 
      display: "flex", 
      flexDirection: "column", 
      alignItems: "center", 
      justifyContent: "center", 
      height: "100vh", 
      fontFamily: "sans-serif" 
    }}>
      <h1 style={{ fontSize: "3rem", margin: "0" }}>🚗</h1>
      <h2 style={{ color: "#1e293b" }}>CareAuto Pro è Attivo</h2>
      <p style={{ color: "#64748b" }}>Se vedi questo, il blocco è rimosso.</p>
      <div style={{ marginTop: "20px" }}>
        <a href="/profilo" style={{ 
          padding: "12px 24px", 
          background: "#2563eb", 
          color: "white", 
          borderRadius: "12px", 
          textDecoration: "none",
          fontWeight: "bold"
        }}>Entra nel Profilo</a>
      </div>
    </div>
  );
}
