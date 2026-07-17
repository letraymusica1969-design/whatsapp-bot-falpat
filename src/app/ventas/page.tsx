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
  const [calls, setCalls] = useState<PendingCall[]>([]);
  const [stats, setStats] = useState<Stats>({ total: 0, pending: 0, called: 0, discarded: 0 });
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "pending" | "called" | "discarded">("pending");

  const fetchCalls = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/pending-calls?status=${filter}`);
      if (res.ok) {
        const data = await res.json();
        setCalls(data.calls || []);
        setStats(data.stats || { total: 0, pending: 0, called: 0, discarded: 0 });
      }
    } catch {}
    setLoading(false);
  };

  useEffect(() => {
    fetchCalls();
  }, [filter]);

  return (
    <div style={{ minHeight: "100vh", fontFamily: "'Inter', system-ui, sans-serif", background: "#0A0A1A", color: "white" }}>
      <style>{`
        @media (max-width: 640px) {
          .ventas-header { padding: 12px 14px !important; }
          .ventas-header-title { font-size: 15px !important; }
          .ventas-header-sub { font-size: 11px !important; }
          .ventas-stats { padding: 14px 14px !important; gap: 8px !important; }
          .ventas-stat-card { flex: 1 0 calc(50% - 8px) !important; padding: 12px 14px !important; }
          .ventas-stat-value { font-size: 22px !important; }
          .ventas-list { padding: 0 14px 14px !important; }
          .ventas-call-card { padding: 14px !important; flex-direction: column !important; align-items: flex-start !important; }
          .ventas-call-phone { font-size: 14px !important; }
          .ventas-call-msg { font-size: 13px !important; }
          .ventas-call-meta { font-size: 11px !important; gap: 10px !important; }
          .ventas-btn-group { width: 100% !important; }
          .ventas-btn { flex: 1 !important; padding: 10px 12px !important; font-size: 13px !important; }
          .ventas-top-btn { padding: 7px 10px !important; font-size: 12px !important; }
        }
      `}</style>

      {/* HEADER */}
      <div className="ventas-header" style={{ background: "#12122A", borderBottom: "1px solid rgba(108,60,225,0.2)", padding: "16px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "12px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <a href="/" style={{ width: "32px", height: "32px", borderRadius: "8px", background: "rgba(108,60,225,0.15)", border: "1px solid rgba(108,60,225,0.2)", display: "flex", alignItems: "center", justifyContent: "center", textDecoration: "none", flexShrink: 0 }}>
            <svg width="16" height="16" fill="none" stroke="#6C3CE1" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
          </a>
          <div>
            <h1 className="ventas-header-title" style={{ margin: 0, fontSize: "17px", fontWeight: "700" }}>Llamadas Pendientes</h1>
            <p className="ventas-header-sub" style={{ margin: 0, fontSize: "12px", color: "#8E94A8" }}>Clientes que escribieron fuera de horario</p>
          </div>
        </div>
        <button onClick={fetchCalls} className="ventas-top-btn" style={{ padding: "8px 14px", background: "rgba(108,60,225,0.2)", color: "#6C3CE1", border: "1px solid rgba(108,60,225,0.3)", borderRadius: "6px", cursor: "pointer", fontSize: "13px", fontWeight: "600", flexShrink: 0 }}>
          Actualizar
        </button>
      </div>

      {/* STATS */}
      <div className="ventas-stats" style={{ padding: "16px 20px", display: "flex", gap: "12px", flexWrap: "wrap" }}>
        <StatCard className="ventas-stat-card" valueClassName="ventas-stat-value" label="Pendientes" value={stats.pending} color="#F59E0B" active={filter === "pending"} onClick={() => setFilter("pending")} />
        <StatCard className="ventas-stat-card" valueClassName="ventas-stat-value" label="Llamados" value={stats.called} color="#10B981" active={filter === "called"} onClick={() => setFilter("called")} />
        <StatCard className="ventas-stat-card" valueClassName="ventas-stat-value" label="Descartados" value={stats.discarded} color="#6B7280" active={filter === "discarded"} onClick={() => setFilter("discarded")} />
        <StatCard className="ventas-stat-card" valueClassName="ventas-stat-value" label="Total" value={stats.total} color="#6C3CE1" active={filter === "all"} onClick={() => setFilter("all")} />
      </div>

      {/* LIST */}
      <div className="ventas-list" style={{ padding: "0 20px 20px" }}>
        {loading ? (
          <div style={{ padding: "50px", textAlign: "center", color: "#5C6378" }}>Cargando...</div>
        ) : calls.length === 0 ? (
          <div style={{ padding: "50px 20px", textAlign: "center", color: "#5C6378", background: "#12122A", borderRadius: "12px", border: "1px solid rgba(108,60,225,0.1)" }}>
            <p style={{ fontSize: "16px", marginBottom: "6px" }}>No hay llamadas {filter === "pending" ? "pendientes" : filter === "called" ? "llamadas" : filter === "discarded" ? "descartadas" : ""}</p>
            <p style={{ fontSize: "13px" }}>Los clientes fuera de horario aparecerán acá</p>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {calls.map((call) => (
              <div key={call.id} className="ventas-call-card" style={{ background: "#12122A", border: `1px solid ${call.status === "pending" ? "rgba(245,158,11,0.3)" : call.status === "called" ? "rgba(16,185,129,0.2)" : "rgba(107,114,128,0.2)"}`, borderRadius: "12px", padding: "16px", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "12px" }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "5px", flexWrap: "wrap" }}>
                    <span className="ventas-call-phone" style={{ fontSize: "15px", fontWeight: "700", color: "#F1F3F8" }}>📱 {call.phone}</span>
                    <span style={{ fontSize: "10px", padding: "2px 7px", borderRadius: "8px", fontWeight: "600", background: call.status === "pending" ? "rgba(245,158,11,0.15)" : call.status === "called" ? "rgba(16,185,129,0.15)" : "rgba(107,114,128,0.15)", color: call.status === "pending" ? "#F59E0B" : call.status === "called" ? "#10B981" : "#6B7280" }}>
                      {call.status === "pending" ? "PENDIENTE" : call.status === "called" ? "LLAMADO" : "DESCARTADO"}
                    </span>
                  </div>
                  <p className="ventas-call-msg" style={{ margin: "0 0 5px", fontSize: "14px", color: "#F1F3F8", lineHeight: "1.4", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {call.firstMessage}
                  </p>
                  <div className="ventas-call-meta" style={{ display: "flex", gap: "14px", fontSize: "11px", color: "#8E94A8" }}>
                    <span>📅 {call.firstMessageAt ? new Date(call.firstMessageAt).toLocaleString("es-AR", { timeZone: "America/Argentina/Buenos_Aires", day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" }) : ""}</span>
                    {call.messageCount > 1 && <span>💬 {call.messageCount} msgs</span>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function StatCard({ label, value, color, active, onClick, className, valueClassName }: { label: string; value: number; color: string; active: boolean; onClick: () => void; className?: string; valueClassName?: string }) {
  return (
    <button
      onClick={onClick}
      className={className}
      style={{
        flex: "1 0 130px",
        padding: "14px 16px",
        background: active ? `${color}15` : "#12122A",
        border: `1px solid ${active ? `${color}40` : "rgba(108,60,225,0.1)"}`,
        borderRadius: "10px",
        cursor: "pointer",
        textAlign: "left",
        transition: "all 0.2s",
      }}
    >
      <div style={{ fontSize: "11px", color: "#8E94A8", marginBottom: "3px", fontWeight: "500" }}>{label}</div>
      <div className={valueClassName} style={{ fontSize: "26px", fontWeight: "800", color: active ? color : "#F1F3F8" }}>{value}</div>
    </button>
  );
}
