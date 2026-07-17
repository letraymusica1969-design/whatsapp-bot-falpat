"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface Conversation {
  id: string;
  phone: string;
  messages: Message[];
  lastMessage: string;
  messageCount: number;
}

interface Product {
  name: string;
  description: string;
}

interface FAQ {
  q: string;
  a: string;
}

interface BotConfig {
  business: {
    name: string;
    phone: string;
    email: string;
    address: string;
    website: string;
    instagram: string;
  };
  knowledge: {
    products: Product[];
    services: string[];
    faq: FAQ[];
    customInstructions: string;
  };
  schedule: {
    timezone: string;
    closedMessage: string;
  };
}

const defaultConfig: BotConfig = {
  business: { name: "", phone: "", email: "", address: "", website: "", instagram: "" },
  knowledge: { products: [], services: [], faq: [], customInstructions: "" },
  schedule: { timezone: "America/Argentina/Buenos_Aires", closedMessage: "" },
};

export default function AdminPage() {
  return (
    <Suspense>
      <AdminContent />
    </Suspense>
  );
}

function AdminContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const urlKey = searchParams.get("key") || "";

  const [key, setKey] = useState(urlKey);
  const [authenticated, setAuthenticated] = useState(false);
  const [tab, setTab] = useState<"chats" | "knowledge" | "settings">("chats");

  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selected, setSelected] = useState<Conversation | null>(null);

  const [config, setConfig] = useState<BotConfig>(defaultConfig);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const authHeaders = `key=${key}`;

  useEffect(() => {
    if (urlKey) {
      setKey(urlKey);
      login(urlKey);
    }
  }, [urlKey]);

  const login = async (keyToUse?: string) => {
    const k = keyToUse || key;
    try {
      const res = await fetch(`/api/conversations?key=${k}`);
      if (res.ok) {
        setKey(k);
        setAuthenticated(true);
        fetchConversations(k);
        fetchConfig(k);
      } else if (keyToUse) {
        router.push("/admin");
      }
    } catch {
      if (keyToUse) router.push("/admin");
    }
  };

  const fetchConversations = async (keyToUse?: string) => {
    try {
      const res = await fetch(`/api/conversations?key=${keyToUse || key}`);
      if (res.ok) {
        const data = await res.json();
        setConversations(data.conversations || []);
      }
    } catch {}
  };

  const fetchConfig = async (keyToUse?: string) => {
    try {
      const res = await fetch(`/api/config?key=${keyToUse || key}`);
      if (res.ok) {
        const data = await res.json();
        setConfig({ ...defaultConfig, ...data });
      }
    } catch {}
  };

  const saveConfig = async () => {
    setSaving(true);
    try {
      const res = await fetch(`/api/config?${authHeaders}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(config),
      });
      if (res.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
      }
    } catch {
      alert("Error al guardar");
    }
    setSaving(false);
  };

  const addProduct = () => {
    setConfig({
      ...config,
      knowledge: {
        ...config.knowledge,
        products: [...(config.knowledge.products || []), { name: "", description: "" }],
      },
    });
  };

  const removeProduct = (i: number) => {
    const products = [...config.knowledge.products];
    products.splice(i, 1);
    setConfig({ ...config, knowledge: { ...config.knowledge, products } });
  };

  const addService = () => {
    setConfig({
      ...config,
      knowledge: { ...config.knowledge, services: [...(config.knowledge.services || []), ""] },
    });
  };

  const removeService = (i: number) => {
    const services = [...config.knowledge.services];
    services.splice(i, 1);
    setConfig({ ...config, knowledge: { ...config.knowledge, services } });
  };

  const addFAQ = () => {
    setConfig({
      ...config,
      knowledge: { ...config.knowledge, faq: [...(config.knowledge.faq || []), { q: "", a: "" }] },
    });
  };

  const removeFAQ = (i: number) => {
    const faq = [...config.knowledge.faq];
    faq.splice(i, 1);
    setConfig({ ...config, knowledge: { ...config.knowledge, faq } });
  };

  if (!authenticated) {
    return (
      <div style={{ minHeight: "100vh", background: "#0A0A1A", color: "white", fontFamily: "'Inter', system-ui, sans-serif", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <div style={{ background: "#12122A", border: "1px solid rgba(108,60,225,0.2)", borderRadius: "16px", padding: "40px", width: "100%", maxWidth: "400px", boxShadow: "0 20px 60px rgba(0,0,0,0.5)" }}>
          <div style={{ textAlign: "center", marginBottom: "32px" }}>
            <div style={{ width: "60px", height: "60px", borderRadius: "50%", background: "linear-gradient(135deg, #6C3CE1, #00D4FF)", display: "inline-flex", alignItems: "center", justifyContent: "center", marginBottom: "16px" }}>
              <span style={{ fontSize: "24px", fontWeight: "bold", color: "#0A0A1A" }}>F</span>
            </div>
            <h1 style={{ fontSize: "22px", fontWeight: "700", marginBottom: "4px" }}>Panel Admin</h1>
            <p style={{ color: "#8E94A8", fontSize: "14px" }}>Ingresá tus credenciales</p>
          </div>
          <div style={{ marginBottom: "12px" }}>
            <label style={{ display: "block", fontSize: "13px", color: "#8E94A8", marginBottom: "6px" }}>Usuario</label>
            <input type="text" placeholder="Usuario" value={key} onChange={(e) => setKey(e.target.value)} onKeyDown={(e) => e.key === "Enter" && login()} style={{ width: "100%", padding: "12px 16px", background: "#0A0A1A", border: "1px solid rgba(108,60,225,0.2)", borderRadius: "8px", color: "white", fontSize: "16px", outline: "none", boxSizing: "border-box" }} />
          </div>
          <button onClick={() => login()} style={{ width: "100%", padding: "12px", background: "linear-gradient(135deg, #6C3CE1, #00D4FF)", border: "none", borderRadius: "8px", color: "#0A0A1A", fontSize: "16px", fontWeight: "700", cursor: "pointer", marginTop: "8px" }}>
            Ingresar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", fontFamily: "'Inter', system-ui, sans-serif", background: "#0A0A1A", color: "white" }}>
      <div style={{ background: "#12122A", borderBottom: "1px solid rgba(108,60,225,0.2)", padding: "12px 24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <a href="/" style={{ width: "32px", height: "32px", borderRadius: "8px", background: "rgba(108,60,225,0.15)", border: "1px solid rgba(108,60,225,0.2)", display: "flex", alignItems: "center", justifyContent: "center", textDecoration: "none", flexShrink: 0 }}>
            <svg width="16" height="16" fill="none" stroke="#6C3CE1" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
          </a>
          <h1 style={{ margin: 0, fontSize: "16px", fontWeight: "600" }}>FALPAT Bot - Admin</h1>
        </div>
        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
          {tab === "knowledge" && (
            <button onClick={saveConfig} disabled={saving} style={{ padding: "8px 20px", background: saved ? "#10B981" : "rgba(108,60,225,0.2)", color: saved ? "white" : "#6C3CE1", border: saved ? "none" : "1px solid rgba(108,60,225,0.3)", borderRadius: "6px", cursor: "pointer", fontWeight: "600", fontSize: "13px" }}>
              {saving ? "Guardando..." : saved ? "Guardado!" : "Guardar"}
            </button>
          )}
          <button onClick={() => { setAuthenticated(false); setSelected(null); router.push("/"); }} style={{ padding: "8px 16px", background: "rgba(239,68,68,0.1)", color: "#ef4444", border: "1px solid rgba(239,68,68,0.2)", borderRadius: "6px", cursor: "pointer", fontSize: "13px" }}>
            Cerrar
          </button>
        </div>
      </div>

      <div style={{ display: "flex", borderBottom: "1px solid rgba(108,60,225,0.1)", background: "#12122A" }}>
        {(["chats", "knowledge", "settings"] as const).map((t) => (
          <button key={t} onClick={() => setTab(t)} style={{ padding: "12px 24px", border: "none", borderBottom: tab === t ? "3px solid #6C3CE1" : "3px solid transparent", background: "transparent", cursor: "pointer", fontWeight: tab === t ? "600" : "400", color: tab === t ? "#6C3CE1" : "#8E94A8", fontSize: "14px", transition: "all 0.2s" }}>
            {t === "chats" ? "Conversaciones" : t === "knowledge" ? "Base de Conocimiento" : "Configuración"}
          </button>
        ))}
      </div>

      {tab === "chats" && (
        <div style={{ display: "flex", height: "calc(100vh - 97px)" }}>
          <div style={{ width: "320px", background: "#12122A", borderRight: "1px solid rgba(108,60,225,0.1)", overflowY: "auto" }}>
            <div style={{ padding: "12px 16px", borderBottom: "1px solid rgba(108,60,225,0.1)", display: "flex", justifyContent: "space-between" }}>
              <span style={{ fontWeight: "600", fontSize: "14px" }}>{conversations.length} chats</span>
              <button onClick={() => fetchConversations()} style={{ border: "none", background: "transparent", cursor: "pointer", color: "#6C3CE1", fontSize: "13px" }}>Refrescar</button>
            </div>
            {conversations.map((conv) => (
              <div key={conv.id} onClick={() => setSelected(conv)} style={{ padding: "12px 16px", borderBottom: "1px solid rgba(108,60,225,0.05)", cursor: "pointer", background: selected?.id === conv.id ? "rgba(108,60,225,0.1)" : "transparent", transition: "background 0.15s" }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <strong style={{ fontSize: "14px" }}>{conv.phone}</strong>
                  <span style={{ fontSize: "11px", color: "#5C6378" }}>
                    {conv.lastMessage ? new Date(conv.lastMessage).toLocaleString("es-AR", { hour: "2-digit", minute: "2-digit", day: "2-digit", month: "2-digit" }) : ""}
                  </span>
                </div>
                <p style={{ margin: "4px 0 0", fontSize: "13px", color: "#8E94A8", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {conv.messages?.length ? conv.messages[conv.messages.length - 1].content.slice(0, 60) + "..." : "Sin mensajes"}
                </p>
              </div>
            ))}
            {conversations.length === 0 && (
              <div style={{ padding: "40px 20px", textAlign: "center", color: "#5C6378", fontSize: "14px" }}>No hay conversaciones</div>
            )}
          </div>
          <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
            {selected ? (
              <>
                <div style={{ padding: "12px 20px", background: "rgba(108,60,225,0.05)", borderBottom: "1px solid rgba(108,60,225,0.1)" }}>
                  <strong>{selected.phone}</strong>
                  <span style={{ marginLeft: "12px", fontSize: "12px", color: "#8E94A8" }}>{selected.messageCount} mensajes</span>
                </div>
                <div style={{ flex: 1, overflowY: "auto", padding: "20px", display: "flex", flexDirection: "column", gap: "8px" }}>
                  {selected.messages?.map((msg, i) => (
                    <div key={i} style={{ maxWidth: "70%", padding: "10px 14px", borderRadius: "12px", fontSize: "14px", lineHeight: "1.4", alignSelf: msg.role === "user" ? "flex-start" : "flex-end", background: msg.role === "user" ? "rgba(16,185,129,0.15)" : "rgba(108,60,225,0.1)", border: msg.role === "user" ? "1px solid rgba(16,185,129,0.2)" : "1px solid rgba(108,60,225,0.2)", color: "#F1F3F8" }}>
                      {msg.content}
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center", color: "#5C6378" }}>
                <p>Seleccioná una conversación</p>
              </div>
            )}
          </div>
        </div>
      )}

      {tab === "knowledge" && (
        <div style={{ maxWidth: "800px", margin: "0 auto", padding: "24px" }}>
          <Section title="Instrucciones del Bot">
            <textarea
              value={config.knowledge.customInstructions || ""}
              onChange={(e) => setConfig({ ...config, knowledge: { ...config.knowledge, customInstructions: e.target.value } })}
              style={{ width: "100%", minHeight: "120px", padding: "12px", background: "#0A0A1A", border: "1px solid rgba(108,60,225,0.2)", borderRadius: "8px", fontSize: "14px", fontFamily: "'Inter', system-ui", resize: "vertical", color: "#F1F3F8", boxSizing: "border-box" }}
              placeholder="Ej: Sos el asistente virtual de FALPAT. Respondé de forma amable y profesional..."
            />
          </Section>

          <Section title="Productos" onAdd={addProduct}>
            {config.knowledge.products?.map((p, i) => (
              <div key={i} style={{ display: "flex", gap: "8px", marginBottom: "8px", alignItems: "flex-start" }}>
                <input value={p.name} onChange={(e) => { const products = [...config.knowledge.products]; products[i] = { ...products[i], name: e.target.value }; setConfig({ ...config, knowledge: { ...config.knowledge, products } }); }} placeholder="Nombre" style={{ flex: "0 0 200px", padding: "8px", background: "#0A0A1A", border: "1px solid rgba(108,60,225,0.2)", borderRadius: "6px", fontSize: "14px", color: "#F1F3F8" }} />
                <input value={p.description} onChange={(e) => { const products = [...config.knowledge.products]; products[i] = { ...products[i], description: e.target.value }; setConfig({ ...config, knowledge: { ...config.knowledge, products } }); }} placeholder="Descripción" style={{ flex: 1, padding: "8px", background: "#0A0A1A", border: "1px solid rgba(108,60,225,0.2)", borderRadius: "6px", fontSize: "14px", color: "#F1F3F8" }} />
                <button onClick={() => removeProduct(i)} style={{ padding: "8px 12px", background: "rgba(239,68,68,0.15)", color: "#ef4444", border: "1px solid rgba(239,68,68,0.2)", borderRadius: "6px", cursor: "pointer" }}>X</button>
              </div>
            ))}
          </Section>

          <Section title="Servicios" onAdd={addService}>
            {config.knowledge.services?.map((s, i) => (
              <div key={i} style={{ display: "flex", gap: "8px", marginBottom: "8px" }}>
                <input value={s} onChange={(e) => { const services = [...config.knowledge.services]; services[i] = e.target.value; setConfig({ ...config, knowledge: { ...config.knowledge, services } }); }} placeholder="Servicio" style={{ flex: 1, padding: "8px", background: "#0A0A1A", border: "1px solid rgba(108,60,225,0.2)", borderRadius: "6px", fontSize: "14px", color: "#F1F3F8" }} />
                <button onClick={() => removeService(i)} style={{ padding: "8px 12px", background: "rgba(239,68,68,0.15)", color: "#ef4444", border: "1px solid rgba(239,68,68,0.2)", borderRadius: "6px", cursor: "pointer" }}>X</button>
              </div>
            ))}
          </Section>

          <Section title="Preguntas Frecuentes" onAdd={addFAQ}>
            {config.knowledge.faq?.map((f, i) => (
              <div key={i} style={{ marginBottom: "12px", padding: "12px", background: "rgba(108,60,225,0.05)", border: "1px solid rgba(108,60,225,0.1)", borderRadius: "8px" }}>
                <div style={{ display: "flex", gap: "8px", marginBottom: "8px" }}>
                  <input value={f.q} onChange={(e) => { const faq = [...config.knowledge.faq]; faq[i] = { ...faq[i], q: e.target.value }; setConfig({ ...config, knowledge: { ...config.knowledge, faq } }); }} placeholder="Pregunta" style={{ flex: 1, padding: "8px", background: "#0A0A1A", border: "1px solid rgba(108,60,225,0.2)", borderRadius: "6px", fontSize: "14px", color: "#F1F3F8" }} />
                  <button onClick={() => removeFAQ(i)} style={{ padding: "8px 12px", background: "rgba(239,68,68,0.15)", color: "#ef4444", border: "1px solid rgba(239,68,68,0.2)", borderRadius: "6px", cursor: "pointer" }}>X</button>
                </div>
                <textarea value={f.a} onChange={(e) => { const faq = [...config.knowledge.faq]; faq[i] = { ...faq[i], a: e.target.value }; setConfig({ ...config, knowledge: { ...config.knowledge, faq } }); }} placeholder="Respuesta" style={{ width: "100%", minHeight: "60px", padding: "8px", background: "#0A0A1A", border: "1px solid rgba(108,60,225,0.2)", borderRadius: "6px", fontSize: "14px", fontFamily: "'Inter', system-ui", resize: "vertical", color: "#F1F3F8", boxSizing: "border-box" }} />
              </div>
            ))}
          </Section>
        </div>
      )}

      {tab === "settings" && (
        <div style={{ maxWidth: "600px", margin: "0 auto", padding: "24px" }}>
          <Section title="Datos del Negocio">
            <Field label="Nombre" value={config.business.name} onChange={(v) => setConfig({ ...config, business: { ...config.business, name: v } })} />
            <Field label="Teléfono" value={config.business.phone} onChange={(v) => setConfig({ ...config, business: { ...config.business, phone: v } })} />
            <Field label="Email" value={config.business.email} onChange={(v) => setConfig({ ...config, business: { ...config.business, email: v } })} />
            <Field label="Dirección" value={config.business.address} onChange={(v) => setConfig({ ...config, business: { ...config.business, address: v } })} />
            <Field label="Sitio Web" value={config.business.website} onChange={(v) => setConfig({ ...config, business: { ...config.business, website: v } })} />
            <Field label="Instagram" value={config.business.instagram} onChange={(v) => setConfig({ ...config, business: { ...config.business, instagram: v } })} />
          </Section>

          <Section title="Horarios y Mensajes">
            <Field label="Zona Horaria" value={config.schedule.timezone} onChange={(v) => setConfig({ ...config, schedule: { ...config.schedule, timezone: v } })} />
            <div style={{ marginBottom: "12px" }}>
              <label style={{ display: "block", marginBottom: "4px", fontWeight: "600", fontSize: "14px", color: "#8E94A8" }}>Mensaje fuera de horario</label>
              <textarea value={config.schedule.closedMessage || ""} onChange={(e) => setConfig({ ...config, schedule: { ...config.schedule, closedMessage: e.target.value } })} style={{ width: "100%", minHeight: "80px", padding: "8px", background: "#0A0A1A", border: "1px solid rgba(108,60,225,0.2)", borderRadius: "6px", fontSize: "14px", fontFamily: "'Inter', system-ui", resize: "vertical", color: "#F1F3F8", boxSizing: "border-box" }} />
            </div>
          </Section>

          <button onClick={saveConfig} disabled={saving} style={{ width: "100%", padding: "14px", background: saving ? "#5C6378" : "linear-gradient(135deg, #6C3CE1, #00D4FF)", color: "#0A0A1A", border: "none", borderRadius: "8px", fontSize: "16px", cursor: "pointer", fontWeight: "700", marginTop: "16px" }}>
            {saving ? "Guardando..." : "Guardar Configuración"}
          </button>
        </div>
      )}
    </div>
  );
}

function Section({ title, children, onAdd }: { title: string; children: React.ReactNode; onAdd?: () => void }) {
  return (
    <div style={{ marginBottom: "24px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
        <h3 style={{ margin: 0, fontSize: "16px", color: "#F1F3F8", fontWeight: "600" }}>{title}</h3>
        {onAdd && (
          <button onClick={onAdd} style={{ padding: "6px 14px", background: "rgba(108,60,225,0.2)", color: "#6C3CE1", border: "1px solid rgba(108,60,225,0.3)", borderRadius: "6px", cursor: "pointer", fontSize: "13px", fontWeight: "600" }}>+ Agregar</button>
        )}
      </div>
      {children}
    </div>
  );
}

function Field({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div style={{ marginBottom: "12px" }}>
      <label style={{ display: "block", marginBottom: "4px", fontWeight: "600", fontSize: "14px", color: "#8E94A8" }}>{label}</label>
      <input value={value || ""} onChange={(e) => onChange(e.target.value)} style={{ width: "100%", padding: "10px", background: "#0A0A1A", border: "1px solid rgba(108,60,225,0.2)", borderRadius: "6px", fontSize: "14px", color: "#F1F3F8", boxSizing: "border-box" }} />
    </div>
  );
}
