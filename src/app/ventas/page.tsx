"use client";

import { useState, useEffect } from "react";

interface PendingCall {
  id: string;
  phone: string;
  firstMessage: string;
  firstMessageAt: string;
  lastMessage: string;
  lastMessageAt: string;
  messageCount: number;
  aiSummary: string;
  status: "pending" | "called" | "discarded";
  createdAt: string;
}

interface Stats {
  total: number;
  pending: number;
  called: number;
  discarded: number;
}

export default function VentasPage() {
  const [key, setKey] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [calls, setCalls] = useState<PendingCall[]>([]);
  const [stats, setStats] = useState<Stats>({ total: 0, pending: 0, called: 0, discarded: 0 });
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState<"all" | "pending" | "called" | "discarded">("pending");
  const [updating, setUpdating] = useState<string | null>(null);

  const login = () => {
    if (key === "falpat-stats-2024") {
      setAuthenticated(true);
      fetchCalls();
    } else {
      alert("Clave incorrecta");
    }
  };

  const fetchCalls = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/pending-calls?key=${key}&status=${filter}`);
      if (res.ok) {
        const data = await res.json();
        setCalls(data.calls || []);
        setStats(data.stats || { total: 0, pending: 0, called: 0, discarded: 0 });
      }
    } catch {}
    setLoading(false);
  };

  useEffect(() => {
    if (authenticated) fetchCalls();
  }, [filter, authenticated]);

  const updateStatus = async (id: string, status: "called" | "discarded") => {
    setUpdating(id);
    try {
      await fetch(`/api/pending-calls?key=${key}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });
      fetchCalls();
    } catch {}
    setUpdating(null);
  };

  const exportCSV = async () => {
    try {
      const res = await fetch(`/api/pending-calls?key=${key}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "export-csv", status: filter }),
      });
      if (res.ok) {
        const data = await res.json();
        const blob = new Blob([data.csv], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `llamadas-pendientes-${new Date().toISOString().split("T")[0]}.csv`;
        a.click();
        URL.revokeObjectURL(url);
      }
    } catch {}
  };

  if (!authenticated) {
    return (
      <div style={{ minHeight: "100vh", background: "#0A0A1A", color: "white", fontFamily: "'Inter', system-ui, sans-serif", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <div style={{ background: "#12122A", border: "1px solid rgba(108,60,225,0.2)", borderRadius: "16px", padding: "40px", width: "100%", maxWidth: "400px", boxShadow: "0 20px 60px rgba(0,0,0,0.5)" }}>
          <div style={{ textAlign: "center", marginBottom: "32px" }}>
            <div style={{ width: "60px", height: "60px", borderRadius: "50%", background: "linear-gradient(135deg, #6C3CE1, #00D4FF)", display: "inline-flex", alignItems: "center", justifyContent: "center", marginBottom: "16px" }}>
              <span style={{ fontSize: "28px" }}>📞</span>
            </div>
            <h1 style={{ fontSize: "22px", fontWeight: "700", marginBottom: "4px" }}>Ventas - Llamadas Pendientes</h1>
            <p style={{ color: "#8E94A8", fontSize: "14px" }}>Ingresá para ver el listado de clientes</p>
          </div>
          <div style={{ marginBottom: "12px" }}>
            <label style={{ display: "block", fontSize: "13px", color: "#8E94A8", marginBottom: "6px" }}>Clave de acceso</label>
            <input
              type="password"
              placeholder="Clave"
              value={key}
              onChange={(e) => setKey(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && login()}
              style={{ width: "100%", padding: "12px 16px", background: "#0A0A1A", border: "1px solid rgba(108,60,225,0.2)", borderRadius: "8px", color: "white", fontSize: "16px", outline: "none", boxSizing: "border-box" }}
            />
          </div>
          <button onClick={login} style={{ width: "100%", padding: "12px", background: "linear-gradient(135deg, #6C3CE1, #00D4FF)", border: "none", borderRadius: "8px", color: "#0A0A1A", fontSize: "16px", fontWeight: "700", cursor: "pointer", marginTop: "8px" }}>
            Ingresar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", fontFamily: "'Inter', system-ui, sans-serif", background: "#0A0A1A", color: "white" }}>
      <div style={{ background: "#12122A", borderBottom: "1px solid rgba(108,60,225,0.2)", padding: "16px 24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{ width: "36px", height: "36px", borderRadius: "10px", background: "linear-gradient(135deg, #6C3CE1, #00D4FF)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px" }}>📞</div>
          <div>
            <h1 style={{ margin: 0, fontSize: "18px", fontWeight: "700" }}>Llamadas Pendientes</h1>
            <p style={{ margin: 0, fontSize: "12px", color: "#8E94A8" }}>Clientes que escribieron fuera de horario</p>
          </div>
        </div>
        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
          <button onClick={fetchCalls} style={{ padding: "8px 16px", background: "rgba(108,60,225,0.2)", color: "#6C3CE1", border: "1px solid rgba(108,60,225,0.3)", borderRadius: "6px", cursor: "pointer", fontSize: "13px", fontWeight: "600" }}>
            Actualizar
          </button>
          <button onClick={exportCSV} style={{ padding: "8px 16px", background: "rgba(16,185,129,0.15)", color: "#10B981", border: "1px solid rgba(16,185,129,0.2)", borderRadius: "6px", cursor: "pointer", fontSize: "13px", fontWeight: "600" }}>
            Descargar CSV
          </button>
          <button onClick={() => { setAuthenticated(false); setKey(""); }} style={{ padding: "8px 16px", background: "rgba(239,68,68,0.1)", color: "#ef4444", border: "1px solid rgba(239,68,68,0.2)", borderRadius: "6px", cursor: "pointer", fontSize: "13px" }}>
            Salir
          </button>
        </div>
      </div>

      <div style={{ padding: "20px 24px", display: "flex", gap: "16px", flexWrap: "wrap" }}>
        <StatCard label="Pendientes" value={stats.pending} color="#F59E0B" active={filter === "pending"} onClick={() => setFilter("pending")} />
        <StatCard label="Ya Llamados" value={stats.called} color="#10B981" active={filter === "called"} onClick={() => setFilter("called")} />
        <StatCard label="Descartados" value={stats.discarded} color="#6B7280" active={filter === "discarded"} onClick={() => setFilter("discarded")} />
        <StatCard label="Total" value={stats.total} color="#6C3CE1" active={filter === "all"} onClick={() => setFilter("all")} />
      </div>

      <div style={{ padding: "0 24px 24px" }}>
        {loading ? (
          <div style={{ padding: "60px", textAlign: "center", color: "#5C6378" }}>Cargando...</div>
        ) : calls.length === 0 ? (
          <div style={{ padding: "60px", textAlign: "center", color: "#5C6378", background: "#12122A", borderRadius: "12px", border: "1px solid rgba(108,60,225,0.1)" }}>
            <p style={{ fontSize: "18px", marginBottom: "8px" }}>No hay llamadas {filter === "pending" ? "pendientes" : filter === "called" ? "llamadas" : filter === "discarded" ? "descartadas" : ""}</p>
            <p style={{ fontSize: "14px" }}>Los clientes que escriban fuera de horario aparecerán acá</p>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {calls.map((call) => (
              <div key={call.id} style={{ background: "#12122A", border: `1px solid ${call.status === "pending" ? "rgba(245,158,11,0.3)" : call.status === "called" ? "rgba(16,185,129,0.2)" : "rgba(107,114,128,0.2)"}`, borderRadius: "12px", padding: "16px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "16px", flexWrap: "wrap" }}>
                <div style={{ flex: 1, minWidth: "200px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
                    <span style={{ fontSize: "16px", fontWeight: "700", color: "#F1F3F8" }}>📱 {call.phone}</span>
                    <span style={{ fontSize: "11px", padding: "2px 8px", borderRadius: "10px", fontWeight: "600", background: call.status === "pending" ? "rgba(245,158,11,0.15)" : call.status === "called" ? "rgba(16,185,129,0.15)" : "rgba(107,114,128,0.15)", color: call.status === "pending" ? "#F59E0B" : call.status === "called" ? "#10B981" : "#6B7280" }}>
                      {call.status === "pending" ? "PENDIENTE" : call.status === "called" ? "LLAMADO" : "DESCARTADO"}
                    </span>
                  </div>
                  <p style={{ margin: "0 0 6px", fontSize: "14px", color: "#F1F3F8", lineHeight: "1.4" }}>
                    {call.firstMessage}
                  </p>
                  <div style={{ display: "flex", gap: "16px", fontSize: "12px", color: "#8E94A8" }}>
                    <span>📅 {call.firstMessageAt ? new Date(call.firstMessageAt).toLocaleString("es-AR", { timeZone: "America/Argentina/Buenos_Aires", day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" }) : ""}</span>
                    {call.messageCount > 1 && <span>💬 {call.messageCount} mensajes</span>}
                  </div>
                </div>
                {call.status === "pending" && (
                  <div style={{ display: "flex", gap: "8px", flexShrink: 0 }}>
                    <button
                      onClick={() => updateStatus(call.id, "called")}
                      disabled={updating === call.id}
                      style={{ padding: "8px 16px", background: "rgba(16,185,129,0.15)", color: "#10B981", border: "1px solid rgba(16,185,129,0.3)", borderRadius: "8px", cursor: "pointer", fontSize: "13px", fontWeight: "600", whiteSpace: "nowrap" }}
                    >
                      {updating === call.id ? "..." : "Ya llamé"}
                    </button>
                    <button
                      onClick={() => updateStatus(call.id, "discarded")}
                      disabled={updating === call.id}
                      style={{ padding: "8px 16px", background: "rgba(107,114,128,0.15)", color: "#6B7280", border: "1px solid rgba(107,114,128,0.2)", borderRadius: "8px", cursor: "pointer", fontSize: "13px", fontWeight: "600", whiteSpace: "nowrap" }}
                    >
                      {updating === call.id ? "..." : "Descartar"}
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function StatCard({ label, value, color, active, onClick }: { label: string; value: number; color: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      style={{
        flex: "1 0 140px",
        padding: "16px 20px",
        background: active ? `${color}15` : "#12122A",
        border: `1px solid ${active ? `${color}40` : "rgba(108,60,225,0.1)"}`,
        borderRadius: "12px",
        cursor: "pointer",
        textAlign: "left",
        transition: "all 0.2s",
      }}
    >
      <div style={{ fontSize: "12px", color: "#8E94A8", marginBottom: "4px", fontWeight: "500" }}>{label}</div>
      <div style={{ fontSize: "28px", fontWeight: "800", color: active ? color : "#F1F3F8" }}>{value}</div>
    </button>
  );
}
