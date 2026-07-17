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
      <div style={{ position: "fixed", inset: 0, background: "radial-gradient(ellipse at 20% 50%, rgba(108,60,225,0.08) 0%, transparent 50%), radial-gradient(ellipse at 80% 20%, rgba(0,212,255,0.05) 0%, transparent 50%)", pointerEvents: "none" }} />

      <nav style={{ position: "relative", zIndex: 10, padding: "20px 40px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{ width: "40px", height: "40px", borderRadius: "10px", background: "linear-gradient(135deg, #6C3CE1, #00D4FF)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px", fontWeight: "bold", color: "#0A0A1A" }}>
            F
          </div>
          <span style={{ fontSize: "18px", fontWeight: "700" }}>Grupo FALPAT</span>
        </div>
        <button onClick={() => setShowLogin(!showLogin)} style={{ padding: "10px 24px", background: "rgba(108,60,225,0.1)", border: "1px solid rgba(108,60,225,0.3)", borderRadius: "8px", color: "#6C3CE1", cursor: "pointer", fontSize: "14px", fontWeight: "600", transition: "all 0.2s" }}>
          Admin
        </button>
      </nav>

      {showLogin && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", backdropFilter: "blur(8px)", zIndex: 50, display: "flex", justifyContent: "center", alignItems: "center" }}>
          <div style={{ background: "#12122A", border: "1px solid rgba(108,60,225,0.2)", borderRadius: "16px", padding: "40px", width: "100%", maxWidth: "400px", boxShadow: "0 20px 60px rgba(0,0,0,0.5)" }}>
            <div style={{ textAlign: "center", marginBottom: "32px" }}>
              <div style={{ width: "60px", height: "60px", borderRadius: "50%", background: "rgba(108,60,225,0.1)", border: "1px solid rgba(108,60,225,0.2)", display: "inline-flex", alignItems: "center", justifyContent: "center", marginBottom: "16px" }}>
                <svg width="28" height="28" fill="none" stroke="#6C3CE1" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
              </div>
              <h2 style={{ fontSize: "22px", fontWeight: "700", marginBottom: "4px" }}>Panel Admin</h2>
              <p style={{ color: "#8E94A8", fontSize: "14px" }}>Ingresá tus credenciales</p>
            </div>
            <div style={{ marginBottom: "12px" }}>
              <label style={{ display: "block", fontSize: "13px", color: "#8E94A8", marginBottom: "6px" }}>Usuario</label>
              <input type="text" value={user} onChange={(e) => { setUser(e.target.value); setError(""); }} onKeyDown={(e) => e.key === "Enter" && handleLogin()} placeholder="Usuario" style={{ width: "100%", padding: "12px 16px", background: "#0A0A1A", border: "1px solid rgba(108,60,225,0.2)", borderRadius: "8px", color: "white", fontSize: "16px", outline: "none", boxSizing: "border-box" }} />
            </div>
            <div style={{ marginBottom: "16px" }}>
              <label style={{ display: "block", fontSize: "13px", color: "#8E94A8", marginBottom: "6px" }}>Clave</label>
              <input type="password" value={pass} onChange={(e) => { setPass(e.target.value); setError(""); }} onKeyDown={(e) => e.key === "Enter" && handleLogin()} placeholder="••••••••" style={{ width: "100%", padding: "12px 16px", background: "#0A0A1A", border: "1px solid rgba(108,60,225,0.2)", borderRadius: "8px", color: "white", fontSize: "16px", outline: "none", boxSizing: "border-box" }} />
            </div>
            {error && <p style={{ color: "#ef4444", fontSize: "13px", textAlign: "center", marginBottom: "12px" }}>{error}</p>}
            <button onClick={handleLogin} style={{ width: "100%", padding: "12px", background: "linear-gradient(135deg, #6C3CE1, #00D4FF)", border: "none", borderRadius: "8px", color: "#0A0A1A", fontSize: "16px", fontWeight: "700", cursor: "pointer" }}>
              Ingresar
            </button>
            <button onClick={() => setShowLogin(false)} style={{ width: "100%", padding: "8px", background: "transparent", border: "none", color: "#8E94A8", fontSize: "13px", cursor: "pointer", marginTop: "8px" }}>
              Cancelar
            </button>
          </div>
        </div>
      )}

      <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "calc(100vh - 80px)", padding: "40px", textAlign: "center" }}>
        <div style={{ width: "80px", height: "80px", borderRadius: "20px", background: "linear-gradient(135deg, #6C3CE1, #00D4FF)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "32px", boxShadow: "0 8px 32px rgba(108,60,225,0.3)" }}>
          <svg width="40" height="40" fill="none" stroke="#0A0A1A" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/></svg>
        </div>
        <h1 style={{ fontSize: "48px", fontWeight: "900", marginBottom: "16px", lineHeight: "1.1" }}>
          <span style={{ color: "#6C3CE1" }}>WhatsApp</span> Bot
          <br />
          <span style={{ fontSize: "36px", color: "#8E94A8", fontWeight: "400" }}>Grupo FALPAT</span>
        </h1>
        <p style={{ fontSize: "18px", color: "#8E94A8", maxWidth: "500px", marginBottom: "40px", lineHeight: "1.6" }}>
          Asistente virtual inteligente para atender a tus clientes por WhatsApp las 24 horas.
        </p>

        <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", justifyContent: "center" }}>
          <StatusBadge icon="✓" text="Groq IA" color="#10B981" />
          <StatusBadge icon="✓" text="Firebase" color="#10B981" />
          <StatusBadge icon="✓" text="Vercel" color="#10B981" />
          <StatusBadge icon="✓" text="WhatsApp API" color="#10B981" />
        </div>

        <div style={{ marginTop: "60px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px", maxWidth: "700px", width: "100%" }}>
          <FeatureCard title="IA Inteligente" desc="Responde preguntas con Llama 3.3 70B" />
          <FeatureCard title="Base de Conocimiento" desc="Editá productos, servicios y FAQs" />
          <FeatureCard title="Horarios Automáticos" desc="Fuera de horario responde solo" />
          <FeatureCard title="Panel de Control" desc="Monitoreá conversaciones en tiempo real" />
        </div>
      </div>

      <div style={{ textAlign: "center", padding: "24px", color: "#5C6378", fontSize: "12px" }}>
        &copy; 2026 Grupo FALPAT SRL
      </div>
    </div>
  );
}

function StatusBadge({ icon, text, color }: { icon: string; text: string; color: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "8px 16px", background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.2)", borderRadius: "8px" }}>
      <span style={{ color, fontWeight: "bold", fontSize: "14px" }}>{icon}</span>
      <span style={{ color: "#8E94A8", fontSize: "13px" }}>{text}</span>
    </div>
  );
}

function FeatureCard({ title, desc }: { title: string; desc: string }) {
  return (
    <div style={{ padding: "20px", background: "rgba(18,18,42,0.8)", border: "1px solid rgba(108,60,225,0.15)", borderRadius: "12px", textAlign: "left" }}>
      <h3 style={{ fontSize: "15px", fontWeight: "600", marginBottom: "6px", color: "#F1F3F8" }}>{title}</h3>
      <p style={{ fontSize: "13px", color: "#8E94A8", margin: 0 }}>{desc}</p>
    </div>
  );
}
