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
  messages?: { text: string; at: string }[];
}

interface Stats {
  total: number;
  pending: number;
  called: number;
  discarded: number;
}

function formatPhone(phone: string) {
  const cleaned = phone.replace(/\D/g, "");
  if (cleaned.startsWith("54")) {
    const num = cleaned.slice(2);
    return `+54 ${num.slice(0, 2)} ${num.slice(2, 6)}-${num.slice(6)}`;
  }
  return `+${cleaned}`;
}

function formatTime(iso: string) {
  if (!iso) return "";
  return new Date(iso).toLocaleString("es-AR", {
    timeZone: "America/Argentina/Buenos_Aires",
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatFullDate(iso: string) {
  if (!iso) return "";
  return new Date(iso).toLocaleString("es-AR", {
    timeZone: "America/Argentina/Buenos_Aires",
    weekday: "long",
    day: "numeric",
    month: "long",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function VentasPage() {
  const [calls, setCalls] = useState<PendingCall[]>([]);
  const [stats, setStats] = useState<Stats>({ total: 0, pending: 0, called: 0, discarded: 0 });
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "pending" | "called" | "discarded">("pending");
  const [expanded, setExpanded] = useState<string | null>(null);

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

  const openWhatsApp = (phone: string) => {
    window.open(`https://wa.me/${phone}`, "_blank");
  };

  return (
    <div style={{ minHeight: "100vh", fontFamily: "'Inter', system-ui, sans-serif", background: "#0A0A1A", color: "white" }}>
      <style>{`
        body::before {
          content: ''; position: fixed; inset: 0; z-index: 0; pointer-events: none;
          background: linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px);
          background-size: 50px 50px;
        }
        .v-glass {
          background: rgba(255,255,255,0.03); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255,255,255,0.06); transition: all 0.25s ease;
        }
        .v-glass:hover { border-color: rgba(108,60,225,0.2); }
        .v-wa-btn {
          background: linear-gradient(135deg, #25D366, #128C7E); color: white; font-weight: 700;
          padding: 10px 20px; border-radius: 10px; border: none; cursor: pointer;
          display: flex; align-items: center; gap: 8px; font-size: 13px;
          transition: all 0.2s ease; box-shadow: 0 4px 15px rgba(37,211,102,0.25);
        }
        .v-wa-btn:hover { transform: translateY(-1px); box-shadow: 0 6px 20px rgba(37,211,102,0.35); }
        .v-wa-btn:active { transform: scale(0.97); }
        .v-badge {
          display: inline-flex; align-items: center; gap: 5px; padding: 3px 10px;
          border-radius: 20px; font-size: 10px; font-weight: 700; letter-spacing: 0.05em; text-transform: uppercase;
        }
        .v-stat-btn {
          flex: 1 0 130px; padding: 16px; border-radius: 14px; cursor: pointer;
          text-align: left; transition: all 0.2s ease; border: none; font-family: inherit;
        }
        .v-stat-btn:hover { transform: translateY(-2px); }
        .v-call-card { transition: all 0.2s ease; cursor: pointer; }
        .v-call-card:hover { transform: translateY(-1px); }
        @media (max-width: 640px) {
          .v-header { padding: 12px 14px !important; }
          .v-header-title { font-size: 15px !important; }
          .v-header-sub { font-size: 11px !important; }
          .v-stats { padding: 12px 14px !important; gap: 8px !important; }
          .v-stat-btn { flex: 1 0 calc(50% - 8px) !important; padding: 12px !important; }
          .v-stat-value { font-size: 22px !important; }
          .v-list { padding: 0 14px 14px !important; }
          .v-card-inner { padding: 14px !important; }
          .v-card-phone { font-size: 13px !important; }
          .v-card-msg { font-size: 12px !important; }
          .v-wa-btn { padding: 9px 14px !important; font-size: 12px !important; }
          .v-top-btn { padding: 7px 10px !important; font-size: 11px !important; }
          .v-summary { font-size: 12px !important; }
        }
      `}</style>

      {/* HEADER */}
      <div className="v-header" style={{ position: "relative", zIndex: 1, background: "rgba(18,18,42,0.95)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)", borderBottom: "1px solid rgba(108,60,225,0.15)", padding: "16px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "12px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <a href="/" style={{ width: "34px", height: "34px", borderRadius: "10px", background: "linear-gradient(135deg, #6C3CE1, #00D4FF)", display: "flex", alignItems: "center", justifyContent: "center", textDecoration: "none", flexShrink: 0, boxShadow: "0 4px 12px rgba(108,60,225,0.3)" }}>
            <svg width="16" height="16" fill="none" stroke="#0A0A1A" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
          </a>
          <div>
            <h1 className="v-header-title" style={{ margin: 0, fontSize: "17px", fontWeight: "700", color: "#F1F3F8" }}>Llamadas Pendientes</h1>
            <p className="v-header-sub" style={{ margin: 0, fontSize: "12px", color: "#6B7280" }}>Clientes que escribieron fuera de horario</p>
          </div>
        </div>
        <button onClick={fetchCalls} className="v-top-btn" style={{ padding: "8px 14px", background: "rgba(108,60,225,0.15)", color: "#6C3CE1", border: "1px solid rgba(108,60,225,0.2)", borderRadius: "8px", cursor: "pointer", fontSize: "13px", fontWeight: "600", flexShrink: 0, display: "flex", alignItems: "center", gap: "6px" }}>
          <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
          Actualizar
        </button>
      </div>

      {/* STATS */}
      <div className="v-stats" style={{ position: "relative", zIndex: 1, padding: "16px 20px", display: "flex", gap: "10px", flexWrap: "wrap" }}>
        <StatBtn label="Pendientes" value={stats.pending} color="#F59E0B" icon="⏳" active={filter === "pending"} onClick={() => setFilter("pending")} />
        <StatBtn label="Llamados" value={stats.called} color="#10B981" icon="✅" active={filter === "called"} onClick={() => setFilter("called")} />
        <StatBtn label="Descartados" value={stats.discarded} color="#6B7280" icon="✕" active={filter === "discarded"} onClick={() => setFilter("discarded")} />
        <StatBtn label="Total" value={stats.total} color="#6C3CE1" icon="📊" active={filter === "all"} onClick={() => setFilter("all")} />
      </div>

      {/* LIST */}
      <div className="v-list" style={{ position: "relative", zIndex: 1, padding: "0 20px 30px" }}>
        {loading ? (
          <div style={{ padding: "60px", textAlign: "center", color: "#5C6378", display: "flex", flexDirection: "column", alignItems: "center", gap: "12px" }}>
            <div style={{ width: "36px", height: "36px", border: "3px solid rgba(108,60,225,0.2)", borderTopColor: "#6C3CE1", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            <span style={{ fontSize: "14px" }}>Cargando llamadas...</span>
          </div>
        ) : calls.length === 0 ? (
          <div style={{ padding: "60px 20px", textAlign: "center", color: "#5C6378" }}>
            <div style={{ width: "64px", height: "64px", borderRadius: "16px", background: "rgba(108,60,225,0.1)", border: "1px solid rgba(108,60,225,0.15)", display: "inline-flex", alignItems: "center", justifyContent: "center", marginBottom: "16px", fontSize: "28px" }}>📭</div>
            <p style={{ fontSize: "16px", fontWeight: "600", marginBottom: "6px", color: "#8E94A8" }}>No hay llamadas {filter === "pending" ? "pendientes" : filter === "called" ? "llamadas" : filter === "discarded" ? "descartadas" : ""}</p>
            <p style={{ fontSize: "13px", color: "#5C6378" }}>Los clientes fuera de horario aparecerán acá</p>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {calls.map((call) => (
              <div key={call.id} className="v-call-card v-glass" style={{ borderRadius: "14px", overflow: "hidden" }}>
                {/* Main row */}
                <div className="v-card-inner" style={{ padding: "16px 18px", display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "12px" }} onClick={() => setExpanded(expanded === call.id ? null : call.id)}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px", flexWrap: "wrap" }}>
                      <span className="v-badge" style={{ background: call.status === "pending" ? "rgba(245,158,11,0.12)" : call.status === "called" ? "rgba(16,185,129,0.12)" : "rgba(107,114,128,0.12)", color: call.status === "pending" ? "#F59E0B" : call.status === "called" ? "#10B981" : "#6B7280", border: `1px solid ${call.status === "pending" ? "rgba(245,158,11,0.2)" : call.status === "called" ? "rgba(16,185,129,0.2)" : "rgba(107,114,128,0.2)"}` }}>
                        {call.status === "pending" ? "⏳ PENDIENTE" : call.status === "called" ? "✅ LLAMADO" : "✕ DESCARTADO"}
                      </span>
                      <span className="v-card-phone" style={{ fontSize: "15px", fontWeight: "700", color: "#F1F3F8", fontFamily: "'JetBrains Mono', monospace" }}>
                        {formatPhone(call.phone)}
                      </span>
                    </div>
                    <p className="v-card-msg" style={{ margin: "0 0 8px", fontSize: "14px", color: "#B0B0D0", lineHeight: "1.4", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      &ldquo;{call.firstMessage}&rdquo;
                    </p>
                    <div style={{ display: "flex", gap: "14px", fontSize: "11px", color: "#6B7280" }}>
                      <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                        <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path strokeLinecap="round" d="M12 6v6l4 2"/></svg>
                        {formatTime(call.firstMessageAt)}
                      </span>
                      {call.messageCount > 1 && (
                        <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                          <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/></svg>
                          {call.messageCount} mensajes
                        </span>
                      )}
                    </div>
                  </div>
                  <svg width="16" height="16" fill="none" stroke="#5C6378" strokeWidth="2" viewBox="0 0 24 24" style={{ transform: expanded === call.id ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.2s", flexShrink: 0, marginTop: "4px" }}><path strokeLinecap="round" d="M19 9l-7 7-7-7" /></svg>
                </div>

                {/* Expanded details */}
                {expanded === call.id && (
                  <div style={{ borderTop: "1px solid rgba(255,255,255,0.05)", padding: "14px 18px", background: "rgba(0,0,0,0.15)" }}>
                    <div style={{ marginBottom: "10px" }}>
                      <div style={{ fontSize: "10px", fontWeight: "700", color: "#6C3CE1", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "6px" }}>Respuesta del Bot</div>
                      <p className="v-summary" style={{ margin: 0, fontSize: "13px", color: "#8E94A8", lineHeight: "1.5", background: "rgba(108,60,225,0.05)", padding: "10px 12px", borderRadius: "8px", border: "1px solid rgba(108,60,225,0.1)" }}>
                        {call.aiSummary}
                      </p>
                    </div>
                    {call.messages && call.messages.length > 0 && (
                      <div style={{ marginBottom: "14px" }}>
                        <div style={{ fontSize: "10px", fontWeight: "700", color: "#6C3CE1", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "6px" }}>Mensajes del Cliente</div>
                        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                          {call.messages.map((m, i) => (
                            <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 10px", background: "rgba(255,255,255,0.02)", borderRadius: "6px" }}>
                              <span style={{ fontSize: "13px", color: "#B0B0D0" }}>{m.text}</span>
                              <span style={{ fontSize: "10px", color: "#5C6378", flexShrink: 0, marginLeft: "8px" }}>{formatTime(m.at)}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    <div style={{ fontSize: "10px", color: "#5C6378", marginBottom: "14px" }}>
                      Primer contacto: {formatFullDate(call.firstMessageAt)}
                    </div>
                    <button className="v-wa-btn" onClick={(e) => { e.stopPropagation(); openWhatsApp(call.phone); }} style={{ width: "100%", justifyContent: "center" }}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                      Responder por WhatsApp
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

function StatBtn({ label, value, color, icon, active, onClick }: { label: string; value: number; color: string; icon: string; active: boolean; onClick: () => void }) {
  return (
    <button className="v-stat-btn" onClick={onClick} style={{ background: active ? `${color}12` : "rgba(255,255,255,0.03)", border: `1px solid ${active ? `${color}35` : "rgba(255,255,255,0.06)"}`, boxShadow: active ? `0 0 20px ${color}10` : "none" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "6px" }}>
        <span style={{ fontSize: "11px", color: "#6B7280", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.04em" }}>{label}</span>
        <span style={{ fontSize: "14px" }}>{icon}</span>
      </div>
      <div className="v-stat-value" style={{ fontSize: "28px", fontWeight: "800", color: active ? color : "#F1F3F8", lineHeight: 1 }}>{value}</div>
    </button>
  );
}
