"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [showLogin, setShowLogin] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
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
        @media (max-width: 640px) {
          .desktop-nav { display: none !important; }
          .hamburger { display: flex !important; }
          .mobile-menu { display: flex !important; }
          .hero-title { font-size: 36px !important; }
          .hero-subtitle { font-size: 18px !important; }
          .hero-desc { font-size: 14px !important; padding: 0 16px !important; }
          .hero-section { padding: 80px 20px 40px !important; min-height: auto !important; }
          .como-section { padding: 40px 16px 60px !important; }
          .como-title { font-size: 24px !important; }
          .grid-cards { grid-template-columns: 1fr !important; gap: 12px !important; }
          .badge-wrap { gap: 8px !important; }
          .badge-item { padding: 6px 10px !important; font-size: 11px !important; }
        }
        @media (min-width: 641px) {
          .hamburger { display: none !important; }
          .mobile-menu { display: none !important; }
        }
      `}</style>

      {/* NAV */}
      <header style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 40,
        height: "56px", display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 16px",
        background: "rgba(10,10,26,0.95)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(255,255,255,0.05)"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{ width: "32px", height: "32px", borderRadius: "8px", background: "linear-gradient(135deg, #6C3CE1, #00D4FF)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px", fontWeight: "800", color: "#0A0A1A" }}>F</div>
          <span style={{ fontSize: "14px", fontWeight: "700", color: "#F1F3F8" }}>Grupo FALPAT</span>
        </div>

        <nav className="desktop-nav" style={{ display: "flex", gap: "4px", alignItems: "center" }}>
          <a href="#como-funciona" style={{ padding: "8px 14px", background: "none", border: "none", color: "#B0B0D0", cursor: "pointer", fontSize: "13px", fontWeight: "500", textDecoration: "none", borderRadius: "6px" }}>Cómo funciona</a>
          <a href="/manual" style={{ padding: "8px 14px", background: "none", border: "none", color: "#B0B0D0", cursor: "pointer", fontSize: "13px", fontWeight: "500", textDecoration: "none", borderRadius: "6px" }}>Manual</a>
          <a href="/ventas" style={{ padding: "8px 14px", background: "none", border: "none", color: "#B0B0D0", cursor: "pointer", fontSize: "13px", fontWeight: "500", textDecoration: "none", borderRadius: "6px" }}>Ventas</a>
          <button onClick={() => setShowLogin(!showLogin)} style={{ padding: "8px 20px", background: "rgba(108,60,225,0.1)", color: "#6C3CE1", fontWeight: "600", borderRadius: "0.5rem", border: "1px solid rgba(108,60,225,0.2)", cursor: "pointer", fontSize: "13px" }}>Admin</button>
        </nav>

        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)} style={{ display: "none", padding: "8px", background: "none", border: "none", cursor: "pointer" }}>
          <svg width="24" height="24" fill="none" stroke="#F1F3F8" strokeWidth="2" viewBox="0 0 24 24">
            {menuOpen ? <path strokeLinecap="round" d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16" />}
          </svg>
        </button>
      </header>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="mobile-menu" style={{ display: "none", position: "fixed", top: "56px", left: 0, right: 0, zIndex: 39, background: "rgba(10,10,26,0.98)", borderBottom: "1px solid rgba(108,60,225,0.2)", flexDirection: "column", padding: "12px 16px", gap: "4px" }}>
          <a href="#como-funciona" onClick={() => setMenuOpen(false)} style={{ padding: "12px 16px", color: "#B0B0D0", fontSize: "15px", textDecoration: "none", borderRadius: "8px", fontWeight: "500" }}>Cómo funciona</a>
          <a href="/manual" style={{ padding: "12px 16px", color: "#B0B0D0", fontSize: "15px", textDecoration: "none", borderRadius: "8px", fontWeight: "500" }}>Manual</a>
          <a href="/ventas" style={{ padding: "12px 16px", color: "#B0B0D0", fontSize: "15px", textDecoration: "none", borderRadius: "8px", fontWeight: "500" }}>Ventas</a>
          <button onClick={() => { setMenuOpen(false); setShowLogin(true); }} style={{ padding: "12px 16px", color: "#6C3CE1", fontSize: "15px", background: "rgba(108,60,225,0.1)", border: "1px solid rgba(108,60,225,0.2)", borderRadius: "8px", fontWeight: "600", cursor: "pointer", textAlign: "left" }}>Admin</button>
        </div>
      )}

      {/* LOGIN MODAL */}
      {showLogin && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", backdropFilter: "blur(4px)", zIndex: 50, display: "flex", justifyContent: "center", alignItems: "center", padding: "16px" }}>
          <div className="glass-card" style={{ borderRadius: "16px", padding: "32px 24px", width: "100%", maxWidth: "400px" }}>
            <div style={{ textAlign: "center", marginBottom: "28px" }}>
              <div style={{ width: "56px", height: "56px", borderRadius: "50%", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", display: "inline-flex", alignItems: "center", justifyContent: "center", marginBottom: "14px" }}>
                <svg width="26" height="26" fill="none" stroke="#6C3CE1" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
              </div>
              <h2 style={{ fontSize: "20px", fontWeight: "700", marginBottom: "4px" }}>Panel Admin</h2>
              <p style={{ color: "#6B7280", fontSize: "13px" }}>Ingresá tus credenciales</p>
            </div>
            <div style={{ marginBottom: "12px" }}>
              <label style={{ display: "block", fontSize: "12px", color: "#6B7280", marginBottom: "6px", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.05em" }}>Usuario</label>
              <input type="text" value={user} onChange={(e) => { setUser(e.target.value); setError(""); }} onKeyDown={(e) => e.key === "Enter" && handleLogin()} placeholder="Usuario" style={{ width: "100%", padding: "12px 14px", background: "rgba(10,10,26,0.5)", border: "1px solid rgba(108,60,225,0.2)", borderRadius: "8px", color: "#F1F3F8", fontSize: "15px", outline: "none", boxSizing: "border-box" }} />
            </div>
            <div style={{ marginBottom: "16px" }}>
              <label style={{ display: "block", fontSize: "12px", color: "#6B7280", marginBottom: "6px", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.05em" }}>Clave</label>
              <input type="password" value={pass} onChange={(e) => { setPass(e.target.value); setError(""); }} onKeyDown={(e) => e.key === "Enter" && handleLogin()} placeholder="Clave" style={{ width: "100%", padding: "12px 14px", background: "rgba(10,10,26,0.5)", border: "1px solid rgba(108,60,225,0.2)", borderRadius: "8px", color: "#F1F3F8", fontSize: "15px", outline: "none", boxSizing: "border-box" }} />
            </div>
            {error && <p style={{ color: "#FCA5A5", fontSize: "13px", textAlign: "center", marginBottom: "12px" }}>{error}</p>}
            <button onClick={handleLogin} className="btn-primary" style={{ width: "100%", padding: "12px", fontSize: "15px" }}>Ingresar</button>
            <button onClick={() => setShowLogin(false)} style={{ width: "100%", padding: "8px", background: "transparent", border: "none", color: "#6B7280", fontSize: "13px", cursor: "pointer", marginTop: "8px" }}>Cancelar</button>
          </div>
        </div>
      )}

      {/* HERO */}
      <div className="hero-section" style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "100vh", padding: "80px 40px 40px", textAlign: "center" }}>
        <div style={{ width: "72px", height: "72px", borderRadius: "18px", background: "linear-gradient(135deg, #6C3CE1, #00D4FF)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "28px", boxShadow: "0 8px 32px rgba(108,60,225,0.3)" }}>
          <svg width="36" height="36" fill="none" stroke="#0A0A1A" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/></svg>
        </div>
        <h1 className="neon-glow hero-title" style={{ fontSize: "52px", fontWeight: "900", marginBottom: "14px", lineHeight: "1.05" }}>
          <span className="text-gradient-hero">WhatsApp</span> Bot
        </h1>
        <h2 className="hero-subtitle" style={{ fontSize: "22px", color: "#B0B0D0", fontWeight: "300", marginBottom: "16px", marginTop: 0 }}>Grupo FALPAT</h2>
        <p className="hero-desc" style={{ fontSize: "15px", color: "#6B7280", maxWidth: "500px", marginBottom: "32px", lineHeight: "1.7", padding: "0 20px" }}>
          Asistente virtual inteligente con IA que atiende a tus clientes por WhatsApp las 24 horas. Responde preguntas sobre productos, servicios y cotizaciones de forma automática.
        </p>
        <div className="badge-wrap" style={{ display: "flex", gap: "10px", flexWrap: "wrap", justifyContent: "center", padding: "0 16px" }}>
          <Badge className="badge-item" text="Groq IA (Llama 3.3)" />
          <Badge className="badge-item" text="Firebase Firestore" />
          <Badge className="badge-item" text="Vercel Hosting" />
          <Badge className="badge-item" text="WhatsApp API" />
        </div>
      </div>

      {/* CÓMO FUNCIONA */}
      <div id="como-funciona" className="como-section" style={{ position: "relative", zIndex: 1, maxWidth: "960px", margin: "0 auto", padding: "60px 40px 80px" }}>
        <h2 className="text-gradient-hero neon-glow como-title" style={{ fontSize: "30px", fontWeight: "900", textAlign: "center", marginBottom: "10px", background: "linear-gradient(135deg, #6C3CE1, #00D4FF)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>¿Cómo funciona?</h2>
        <p style={{ color: "#6B7280", fontSize: "14px", textAlign: "center", marginBottom: "36px", maxWidth: "520px", marginLeft: "auto", marginRight: "auto", lineHeight: "1.7", padding: "0 16px" }}>
          El bot recibe mensajes de WhatsApp, procesa la consulta con IA y responde automáticamente con la información configurada.
        </p>
        <div className="grid-cards" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "16px" }}>
          <Card step="1" icon="💬" title="Cliente envía mensaje" desc="Un cliente escribe al número de WhatsApp de FALPAT con una consulta." />
          <Card step="2" icon="📨" title="Meta recibe el mensaje" desc="WhatsApp Business API recibe el mensaje y lo envía a nuestro webhook." />
          <Card step="3" icon="🧠" title="IA procesa la consulta" desc="Groq (Llama 3.3 70B) analiza la pregunta con historial y base de conocimiento." />
          <Card step="4" icon="✍️" title="Se genera la respuesta" desc="La IA genera una respuesta personalizada según productos y servicios." />
          <Card step="5" icon="⚡" title="Respuesta automática" desc="El bot responde al cliente en pocos segundos. Se guarda en Firebase." />
          <Card step="6" icon="📊" title="Monitoreo en tiempo real" desc="Desde el Panel Admin ves conversaciones, estadísticas y configurás el bot." />
        </div>
      </div>

      {/* FOOTER */}
      <div style={{ position: "relative", zIndex: 1, textAlign: "center", padding: "28px 16px", color: "#5C6378", fontSize: "12px", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        &copy; 2026 Grupo FALPAT SRL &mdash; WhatsApp Bot con IA
      </div>
    </div>
  );
}

function Badge({ text, className }: { text: string; className?: string }) {
  return (
    <div className={className} style={{ display: "flex", alignItems: "center", gap: "6px", padding: "8px 14px", background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.15)", borderRadius: "8px" }}>
      <span style={{ color: "#10B981", fontWeight: "bold", fontSize: "12px" }}>✓</span>
      <span style={{ color: "#6B7280", fontSize: "12px" }}>{text}</span>
    </div>
  );
}

function Card({ step, icon, title, desc }: { step: string; icon: string; title: string; desc: string }) {
  return (
    <div className="glass-card" style={{ padding: "20px", borderRadius: "14px", position: "relative" }}>
      <div style={{ position: "absolute", top: "14px", right: "14px", fontSize: "22px" }}>{icon}</div>
      <div style={{ width: "26px", height: "26px", borderRadius: "7px", background: "linear-gradient(135deg, rgba(108,60,225,0.2), rgba(0,212,255,0.2))", color: "#6C3CE1", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "11px", fontWeight: "700", marginBottom: "12px" }}>{step}</div>
      <h3 style={{ fontSize: "15px", fontWeight: "700", marginBottom: "6px", color: "#F1F3F8" }}>{title}</h3>
      <p style={{ fontSize: "13px", color: "#6B7280", margin: 0, lineHeight: "1.5" }}>{desc}</p>
    </div>
  );
}
