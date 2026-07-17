"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [showLogin, setShowLogin] = useState(false);
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = () => {
    if (user === "ADMIN" && pass === "123456") {
      router.push("/admin?key=falpat-stats-2024");
    } else {
      setError("Usuario o clave incorrectos");
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "#0A0A1A", color: "white", fontFamily: "'Inter', system-ui, sans-serif" }}>
      <style>{`
        body::before {
          content: ''; position: fixed; inset: 0; z-index: 0; pointer-events: none;
          background: linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
          background-size: 50px 50px;
        }
        html { scrollbar-width: thin; scrollbar-color: #6C3CE1 transparent; }
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: rgba(255,255,255,0.05); border-radius: 10px; }
        ::-webkit-scrollbar-thumb { background: linear-gradient(180deg, #6C3CE1, #00D4FF); border-radius: 10px; }
        .glass-card {
          background: rgba(255,255,255,0.04); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255,255,255,0.08); box-shadow: 0 25px 50px -12px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.08);
          transition: border-color 0.3s, box-shadow 0.3s;
        }
        .glass-card:hover {
          border-color: rgba(108,60,225,0.3);
          box-shadow: 0 30px 60px -12px rgba(0,0,0,0.8), 0 0 40px -10px rgba(108,60,225,0.25), inset 0 1px 0 rgba(255,255,255,0.08);
        }
        .text-gradient-hero {
          background: linear-gradient(135deg, #6C3CE1, #00D4FF);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
        }
        .neon-glow { text-shadow: 0 0 7px rgba(108,60,225,0.6), 0 0 20px rgba(108,60,225,0.3), 0 0 40px rgba(108,60,225,0.15); }
        .btn-primary {
          background: linear-gradient(135deg, #6C3CE1, #00D4FF); color: white; font-weight: 600;
          padding: 0.5rem 1.25rem; border-radius: 0.5rem; border: none; cursor: pointer;
          transition: all 0.3s ease; position: relative; overflow: hidden;
        }
        .btn-primary:hover { transform: translateY(-1px); box-shadow: 0 0 20px rgba(108,60,225,0.3); }
        .btn-primary:active { transform: scale(0.97); }
      `}</style>

      {/* NAV */}
      <header style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 40,
        height: "56px", display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 24px",
        background: "rgba(10,10,26,0.9)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(255,255,255,0.05)"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{ width: "32px", height: "32px", borderRadius: "8px", background: "linear-gradient(135deg, #6C3CE1, #00D4FF)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px", fontWeight: "800", color: "#0A0A1A" }}>F</div>
          <span style={{ fontSize: "14px", fontWeight: "700", color: "#F1F3F8" }}>Grupo FALPAT</span>
        </div>
        <nav style={{ display: "flex", gap: "4px", alignItems: "center" }}>
          <a href="#como-funciona" style={{ padding: "8px 14px", background: "none", border: "none", color: "#B0B0D0", cursor: "pointer", fontSize: "13px", fontWeight: "500", textDecoration: "none", borderRadius: "6px", transition: "all 0.2s" }}>Cómo funciona</a>
          <a href="/manual" style={{ padding: "8px 14px", background: "none", border: "none", color: "#B0B0D0", cursor: "pointer", fontSize: "13px", fontWeight: "500", textDecoration: "none", borderRadius: "6px", transition: "all 0.2s" }}>Manual</a>
          <button onClick={() => setShowLogin(!showLogin)} style={{ padding: "8px 20px", background: "rgba(108,60,225,0.1)", color: "#6C3CE1", fontWeight: "600", borderRadius: "0.5rem", border: "1px solid rgba(108,60,225,0.2)", cursor: "pointer", fontSize: "13px", transition: "all 0.3s" }}>Admin</button>
        </nav>
      </header>

      {/* LOGIN MODAL */}
      {showLogin && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", backdropFilter: "blur(4px)", zIndex: 50, display: "flex", justifyContent: "center", alignItems: "center" }}>
          <div className="glass-card" style={{ borderRadius: "16px", padding: "40px", width: "100%", maxWidth: "400px" }}>
            <div style={{ textAlign: "center", marginBottom: "32px" }}>
              <div style={{ width: "60px", height: "60px", borderRadius: "50%", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", display: "inline-flex", alignItems: "center", justifyContent: "center", marginBottom: "16px" }}>
                <svg width="28" height="28" fill="none" stroke="#6C3CE1" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
              </div>
              <h2 style={{ fontSize: "22px", fontWeight: "700", marginBottom: "4px" }}>Panel Admin</h2>
              <p style={{ color: "#6B7280", fontSize: "14px" }}>Ingresá tus credenciales</p>
            </div>
            <div style={{ marginBottom: "12px" }}>
              <label style={{ display: "block", fontSize: "12px", color: "#6B7280", marginBottom: "6px", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.05em" }}>Usuario</label>
              <input type="text" value={user} onChange={(e) => { setUser(e.target.value); setError(""); }} onKeyDown={(e) => e.key === "Enter" && handleLogin()} placeholder="correo@ejemplo.com" style={{ width: "100%", padding: "10px 16px", background: "rgba(10,10,26,0.5)", border: "1px solid rgba(108,60,225,0.2)", borderRadius: "8px", color: "#F1F3F8", fontSize: "14px", outline: "none", boxSizing: "border-box", transition: "border-color 0.3s, box-shadow 0.3s" }} />
            </div>
            <div style={{ marginBottom: "16px" }}>
              <label style={{ display: "block", fontSize: "12px", color: "#6B7280", marginBottom: "6px", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.05em" }}>Clave</label>
              <input type="password" value={pass} onChange={(e) => { setPass(e.target.value); setError(""); }} onKeyDown={(e) => e.key === "Enter" && handleLogin()} placeholder="••••••••" style={{ width: "100%", padding: "10px 16px", background: "rgba(10,10,26,0.5)", border: "1px solid rgba(108,60,225,0.2)", borderRadius: "8px", color: "#F1F3F8", fontSize: "14px", outline: "none", boxSizing: "border-box" }} />
            </div>
            {error && <p style={{ color: "#FCA5A5", fontSize: "13px", textAlign: "center", marginBottom: "12px" }}>{error}</p>}
            <button onClick={handleLogin} className="btn-primary" style={{ width: "100%", padding: "12px", fontSize: "14px", textAlign: "center" }}>Ingresar</button>
            <button onClick={() => setShowLogin(false)} style={{ width: "100%", padding: "8px", background: "transparent", border: "none", color: "#6B7280", fontSize: "13px", cursor: "pointer", marginTop: "8px" }}>Cancelar</button>
          </div>
        </div>
      )}

      {/* HERO */}
      <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "100vh", padding: "80px 40px 40px", textAlign: "center" }}>
        <div style={{ width: "80px", height: "80px", borderRadius: "20px", background: "linear-gradient(135deg, #6C3CE1, #00D4FF)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "32px", boxShadow: "0 8px 32px rgba(108,60,225,0.3)" }}>
          <svg width="40" height="40" fill="none" stroke="#0A0A1A" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/></svg>
        </div>
        <h1 className="neon-glow" style={{ fontSize: "56px", fontWeight: "900", marginBottom: "16px", lineHeight: "1.05" }}>
          <span className="text-gradient-hero">WhatsApp</span> Bot
        </h1>
        <h2 style={{ fontSize: "24px", color: "#B0B0D0", fontWeight: "300", marginBottom: "20px", marginTop: 0 }}>Grupo FALPAT</h2>
        <p style={{ fontSize: "16px", color: "#6B7280", maxWidth: "520px", marginBottom: "40px", lineHeight: "1.7" }}>
          Asistente virtual inteligente con IA que atiende a tus clientes por WhatsApp las 24 horas. Responde preguntas sobre productos, servicios y cotizaciones de forma automática y profesional.
        </p>
        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", justifyContent: "center" }}>
          <Badge text="Groq IA (Llama 3.3)" />
          <Badge text="Firebase Firestore" />
          <Badge text="Vercel Hosting" />
          <Badge text="WhatsApp Business API" />
        </div>
      </div>

      {/* CÓMO FUNCIONA */}
      <div id="como-funciona" style={{ position: "relative", zIndex: 1, maxWidth: "960px", margin: "0 auto", padding: "60px 40px 80px" }}>
        <h2 className="text-gradient-hero neon-glow" style={{ fontSize: "32px", fontWeight: "900", textAlign: "center", marginBottom: "12px", background: "linear-gradient(135deg, #6C3CE1, #00D4FF)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>¿Cómo funciona?</h2>
        <p style={{ color: "#6B7280", fontSize: "15px", textAlign: "center", marginBottom: "48px", maxWidth: "560px", marginLeft: "auto", marginRight: "auto", lineHeight: "1.7" }}>
          El bot recibe mensajes de WhatsApp, procesa la consulta con inteligencia artificial y responde automáticamente usando la información configurada en la Base de Conocimiento.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px" }}>
          <Card step="1" icon="💬" title="Cliente envía mensaje" desc="Un cliente escribe al número de WhatsApp de FALPAT con una consulta sobre productos, precios o servicios." />
          <Card step="2" icon="📨" title="Meta recibe el mensaje" desc="WhatsApp Business API (Meta) recibe el mensaje y lo envía automáticamente a nuestro webhook en Vercel." />
          <Card step="3" icon="🧠" title="IA procesa la consulta" desc="Groq (Llama 3.3 70B) analiza la pregunta del cliente junto con el historial y la base de conocimiento." />
          <Card step="4" icon="✍️" title="Se genera la respuesta" desc="La IA genera una respuesta personalizada basada en los productos, servicios y preguntas frecuentes." />
          <Card step="5" icon="⚡" title="Respuesta automática" desc="El bot envía la respuesta al cliente por WhatsApp en pocos segundos. La conversación se guarda en Firebase." />
          <Card step="6" icon="📊" title="Monitoreo en tiempo real" desc="Desde el Panel Admin podés ver todas las conversaciones, estadísticas y configurar las respuestas del bot." />
        </div>
      </div>

      {/* FOOTER */}
      <div style={{ position: "relative", zIndex: 1, textAlign: "center", padding: "32px", color: "#5C6378", fontSize: "12px", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        &copy; 2026 Grupo FALPAT SRL &mdash; WhatsApp Bot con IA
      </div>
    </div>
  );
}

function Badge({ text }: { text: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "8px 16px", background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.15)", borderRadius: "8px" }}>
      <span style={{ color: "#10B981", fontWeight: "bold", fontSize: "12px" }}>✓</span>
      <span style={{ color: "#6B7280", fontSize: "13px" }}>{text}</span>
    </div>
  );
}

function Card({ step, icon, title, desc }: { step: string; icon: string; title: string; desc: string }) {
  return (
    <div className="glass-card" style={{ padding: "24px", borderRadius: "16px", position: "relative" }}>
      <div style={{ position: "absolute", top: "16px", right: "16px", fontSize: "24px" }}>{icon}</div>
      <div style={{ width: "28px", height: "28px", borderRadius: "8px", background: "linear-gradient(135deg, rgba(108,60,225,0.2), rgba(0,212,255,0.2))", color: "#6C3CE1", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: "700", marginBottom: "14px" }}>{step}</div>
      <h3 style={{ fontSize: "16px", fontWeight: "700", marginBottom: "8px", color: "#F1F3F8" }}>{title}</h3>
      <p style={{ fontSize: "13px", color: "#6B7280", margin: 0, lineHeight: "1.6" }}>{desc}</p>
    </div>
  );
}
