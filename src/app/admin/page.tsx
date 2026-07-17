"use client";

import { useState, useEffect } from "react";

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
  const [key, setKey] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [tab, setTab] = useState<"chats" | "knowledge" | "settings">("chats");

  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selected, setSelected] = useState<Conversation | null>(null);

  const [config, setConfig] = useState<BotConfig>(defaultConfig);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const authHeaders = `key=${key}`;

  const fetchConversations = async () => {
    try {
      const res = await fetch(`/api/conversations?${authHeaders}`);
      if (res.ok) {
        const data = await res.json();
        setConversations(data.conversations || []);
      }
    } catch {}
  };

  const fetchConfig = async () => {
    try {
      const res = await fetch(`/api/config?${authHeaders}`);
      if (res.ok) {
        const data = await res.json();
        setConfig({ ...defaultConfig, ...data });
      }
    } catch {}
  };

  const login = async () => {
    try {
      const res = await fetch(`/api/conversations?${authHeaders}`);
      if (res.ok) {
        setAuthenticated(true);
        fetchConversations();
        fetchConfig();
      } else {
        alert("Clave incorrecta");
      }
    } catch {
      alert("Error de conexión");
    }
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
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", background: "#f5f5f5" }}>
        <div style={{ background: "white", padding: "40px", borderRadius: "12px", boxShadow: "0 2px 10px rgba(0,0,0,0.1)", textAlign: "center" }}>
          <h1 style={{ marginBottom: "8px", fontFamily: "system-ui" }}>Panel Admin - FALPAT Bot</h1>
          <p style={{ color: "#666", marginBottom: "24px", fontFamily: "system-ui" }}>Conversaciones + Base de Conocimiento</p>
          <input
            type="password"
            placeholder="Clave de acceso"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && login()}
            style={{ padding: "12px 16px", border: "1px solid #ddd", borderRadius: "8px", fontSize: "16px", width: "250px", marginBottom: "16px" }}
          />
          <br />
          <button onClick={login} style={{ padding: "12px 32px", background: "#25D366", color: "white", border: "none", borderRadius: "8px", fontSize: "16px", cursor: "pointer", fontWeight: "bold" }}>
            Ingresar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", fontFamily: "system-ui", background: "#f5f5f5" }}>
      <div style={{ background: "#075e54", color: "white", padding: "12px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1 style={{ margin: 0, fontSize: "18px" }}>FALPAT Bot - Panel Admin</h1>
        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
          {tab === "knowledge" && (
            <button onClick={saveConfig} disabled={saving} style={{ padding: "8px 20px", background: saved ? "#4CAF50" : "#fff", color: saved ? "#fff" : "#075e54", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: "bold" }}>
              {saving ? "Guardando..." : saved ? "Guardado!" : "Guardar"}
            </button>
          )}
          <button onClick={() => { setAuthenticated(false); setSelected(null); }} style={{ padding: "8px 16px", background: "#e53935", color: "white", border: "none", borderRadius: "6px", cursor: "pointer", fontSize: "12px" }}>
            Cerrar
          </button>
        </div>
      </div>

      <div style={{ display: "flex", borderBottom: "1px solid #ddd", background: "white" }}>
        {(["chats", "knowledge", "settings"] as const).map((t) => (
          <button key={t} onClick={() => setTab(t)} style={{ padding: "12px 24px", border: "none", borderBottom: tab === t ? "3px solid #25D366" : "3px solid transparent", background: "transparent", cursor: "pointer", fontWeight: tab === t ? "bold" : "normal", color: tab === t ? "#075e54" : "#666" }}>
            {t === "chats" ? "Conversaciones" : t === "knowledge" ? "Base de Conocimiento" : "Configuración"}
          </button>
        ))}
      </div>

      {tab === "chats" && (
        <div style={{ display: "flex", height: "calc(100vh - 100px)" }}>
          <div style={{ width: "320px", background: "white", borderRight: "1px solid #e0e0e0", overflowY: "auto" }}>
            <div style={{ padding: "12px 16px", borderBottom: "1px solid #f0f0f0", display: "flex", justifyContent: "space-between" }}>
              <span style={{ fontWeight: "bold" }}>{conversations.length} chats</span>
              <button onClick={fetchConversations} style={{ border: "none", background: "transparent", cursor: "pointer", color: "#25D366" }}>Refrescar</button>
            </div>
            {conversations.map((conv) => (
              <div key={conv.id} onClick={() => setSelected(conv)} style={{ padding: "12px 16px", borderBottom: "1px solid #f0f0f0", cursor: "pointer", background: selected?.id === conv.id ? "#e8f5e9" : "white" }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <strong style={{ fontSize: "14px" }}>{conv.phone}</strong>
                  <span style={{ fontSize: "11px", color: "#999" }}>
                    {conv.lastMessage ? new Date(conv.lastMessage).toLocaleString("es-AR", { hour: "2-digit", minute: "2-digit", day: "2-digit", month: "2-digit" }) : ""}
                  </span>
                </div>
                <p style={{ margin: "4px 0 0", fontSize: "13px", color: "#666", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {conv.messages?.length ? conv.messages[conv.messages.length - 1].content.slice(0, 60) + "..." : "Sin mensajes"}
                </p>
              </div>
            ))}
          </div>
          <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
            {selected ? (
              <>
                <div style={{ padding: "12px 20px", background: "#e8f5e9", borderBottom: "1px solid #ddd" }}>
                  <strong>{selected.phone}</strong>
                  <span style={{ marginLeft: "12px", fontSize: "12px", color: "#666" }}>{selected.messageCount} mensajes</span>
                </div>
                <div style={{ flex: 1, overflowY: "auto", padding: "20px", display: "flex", flexDirection: "column", gap: "8px" }}>
                  {selected.messages?.map((msg, i) => (
                    <div key={i} style={{ maxWidth: "70%", padding: "10px 14px", borderRadius: "12px", fontSize: "14px", lineHeight: "1.4", alignSelf: msg.role === "user" ? "flex-start" : "flex-end", background: msg.role === "user" ? "#dcf8c6" : "#ffffff", border: msg.role === "user" ? "none" : "1px solid #e0e0e0", boxShadow: "0 1px 2px rgba(0,0,0,0.1)" }}>
                      {msg.content}
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center", color: "#999" }}>
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
              style={{ width: "100%", minHeight: "120px", padding: "12px", border: "1px solid #ddd", borderRadius: "8px", fontSize: "14px", fontFamily: "system-ui", resize: "vertical" }}
              placeholder="Ej: Sos el asistente virtual de FALPAT. Respondé de forma amable y profesional..."
            />
          </Section>

          <Section title="Productos" onAdd={addProduct}>
            {config.knowledge.products?.map((p, i) => (
              <div key={i} style={{ display: "flex", gap: "8px", marginBottom: "8px", alignItems: "flex-start" }}>
                <input value={p.name} onChange={(e) => { const products = [...config.knowledge.products]; products[i] = { ...products[i], name: e.target.value }; setConfig({ ...config, knowledge: { ...config.knowledge, products } }); }} placeholder="Nombre" style={{ flex: "0 0 200px", padding: "8px", border: "1px solid #ddd", borderRadius: "6px", fontSize: "14px" }} />
                <input value={p.description} onChange={(e) => { const products = [...config.knowledge.products]; products[i] = { ...products[i], description: e.target.value }; setConfig({ ...config, knowledge: { ...config.knowledge, products } }); }} placeholder="Descripción" style={{ flex: 1, padding: "8px", border: "1px solid #ddd", borderRadius: "6px", fontSize: "14px" }} />
                <button onClick={() => removeProduct(i)} style={{ padding: "8px 12px", background: "#e53935", color: "white", border: "none", borderRadius: "6px", cursor: "pointer" }}>X</button>
              </div>
            ))}
          </Section>

          <Section title="Servicios" onAdd={addService}>
            {config.knowledge.services?.map((s, i) => (
              <div key={i} style={{ display: "flex", gap: "8px", marginBottom: "8px" }}>
                <input value={s} onChange={(e) => { const services = [...config.knowledge.services]; services[i] = e.target.value; setConfig({ ...config, knowledge: { ...config.knowledge, services } }); }} placeholder="Servicio" style={{ flex: 1, padding: "8px", border: "1px solid #ddd", borderRadius: "6px", fontSize: "14px" }} />
                <button onClick={() => removeService(i)} style={{ padding: "8px 12px", background: "#e53935", color: "white", border: "none", borderRadius: "6px", cursor: "pointer" }}>X</button>
              </div>
            ))}
          </Section>

          <Section title="Preguntas Frecuentes" onAdd={addFAQ}>
            {config.knowledge.faq?.map((f, i) => (
              <div key={i} style={{ marginBottom: "12px", padding: "12px", background: "#f9f9f9", borderRadius: "8px" }}>
                <div style={{ display: "flex", gap: "8px", marginBottom: "8px" }}>
                  <input value={f.q} onChange={(e) => { const faq = [...config.knowledge.faq]; faq[i] = { ...faq[i], q: e.target.value }; setConfig({ ...config, knowledge: { ...config.knowledge, faq } }); }} placeholder="Pregunta" style={{ flex: 1, padding: "8px", border: "1px solid #ddd", borderRadius: "6px", fontSize: "14px" }} />
                  <button onClick={() => removeFAQ(i)} style={{ padding: "8px 12px", background: "#e53935", color: "white", border: "none", borderRadius: "6px", cursor: "pointer" }}>X</button>
                </div>
                <textarea value={f.a} onChange={(e) => { const faq = [...config.knowledge.faq]; faq[i] = { ...faq[i], a: e.target.value }; setConfig({ ...config, knowledge: { ...config.knowledge, faq } }); }} placeholder="Respuesta" style={{ width: "100%", minHeight: "60px", padding: "8px", border: "1px solid #ddd", borderRadius: "6px", fontSize: "14px", fontFamily: "system-ui", resize: "vertical" }} />
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
              <label style={{ display: "block", marginBottom: "4px", fontWeight: "bold", fontSize: "14px" }}>Mensaje fuera de horario</label>
              <textarea value={config.schedule.closedMessage || ""} onChange={(e) => setConfig({ ...config, schedule: { ...config.schedule, closedMessage: e.target.value } })} style={{ width: "100%", minHeight: "80px", padding: "8px", border: "1px solid #ddd", borderRadius: "6px", fontSize: "14px", fontFamily: "system-ui", resize: "vertical" }} />
            </div>
          </Section>

          <button onClick={saveConfig} disabled={saving} style={{ width: "100%", padding: "14px", background: saving ? "#999" : "#25D366", color: "white", border: "none", borderRadius: "8px", fontSize: "16px", cursor: "pointer", fontWeight: "bold", marginTop: "16px" }}>
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
        <h3 style={{ margin: 0, fontSize: "16px", color: "#075e54" }}>{title}</h3>
        {onAdd && (
          <button onClick={onAdd} style={{ padding: "6px 14px", background: "#25D366", color: "white", border: "none", borderRadius: "6px", cursor: "pointer", fontSize: "13px" }}>+ Agregar</button>
        )}
      </div>
      {children}
    </div>
  );
}

function Field({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div style={{ marginBottom: "12px" }}>
      <label style={{ display: "block", marginBottom: "4px", fontWeight: "bold", fontSize: "14px" }}>{label}</label>
      <input value={value || ""} onChange={(e) => onChange(e.target.value)} style={{ width: "100%", padding: "10px", border: "1px solid #ddd", borderRadius: "6px", fontSize: "14px" }} />
    </div>
  );
}
