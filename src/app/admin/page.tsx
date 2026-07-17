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

export default function AdminPage() {
  const [key, setKey] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selected, setSelected] = useState<Conversation | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchConversations = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/conversations?key=${key}`);
      if (res.ok) {
        const data = await res.json();
        setConversations(data.conversations || []);
        setAuthenticated(true);
      } else {
        alert("Clave incorrecta");
      }
    } catch {
      alert("Error de conexión");
    }
    setLoading(false);
  };

  if (!authenticated) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", background: "#f5f5f5" }}>
        <div style={{ background: "white", padding: "40px", borderRadius: "12px", boxShadow: "0 2px 10px rgba(0,0,0,0.1)", textAlign: "center" }}>
          <h1 style={{ marginBottom: "8px", fontFamily: "system-ui" }}>Panel de Conversaciones</h1>
          <p style={{ color: "#666", marginBottom: "24px", fontFamily: "system-ui" }}>Grupo FALPAT - Bot WhatsApp</p>
          <input
            type="password"
            placeholder="Clave de acceso"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && fetchConversations()}
            style={{ padding: "12px 16px", border: "1px solid #ddd", borderRadius: "8px", fontSize: "16px", width: "250px", marginBottom: "16px" }}
          />
          <br />
          <button
            onClick={fetchConversations}
            style={{ padding: "12px 32px", background: "#25D366", color: "white", border: "none", borderRadius: "8px", fontSize: "16px", cursor: "pointer", fontWeight: "bold" }}
          >
            Ingresar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", height: "100vh", fontFamily: "system-ui", background: "#f5f5f5" }}>
      <div style={{ width: "320px", background: "white", borderRight: "1px solid #e0e0e0", display: "flex", flexDirection: "column" }}>
        <div style={{ padding: "16px", borderBottom: "1px solid #e0e0e0", background: "#075e54", color: "white" }}>
          <h2 style={{ margin: 0, fontSize: "18px" }}>Conversaciones</h2>
          <span style={{ fontSize: "12px", opacity: 0.8 }}>{conversations.length} chats</span>
        </div>
        <div style={{ flex: 1, overflowY: "auto" }}>
          {conversations.map((conv) => (
            <div
              key={conv.id}
              onClick={() => setSelected(conv)}
              style={{
                padding: "12px 16px",
                borderBottom: "1px solid #f0f0f0",
                cursor: "pointer",
                background: selected?.id === conv.id ? "#e8f5e9" : "white",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
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
          {conversations.length === 0 && (
            <div style={{ padding: "40px 20px", textAlign: "center", color: "#999" }}>
              <p>No hay conversaciones aún</p>
            </div>
          )}
        </div>
      </div>

      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        {selected ? (
          <>
            <div style={{ padding: "12px 20px", background: "#075e54", color: "white" }}>
              <strong>{selected.phone}</strong>
              <span style={{ marginLeft: "12px", fontSize: "12px", opacity: 0.8 }}>{selected.messageCount} mensajes</span>
            </div>
            <div style={{ flex: 1, overflowY: "auto", padding: "20px", display: "flex", flexDirection: "column", gap: "8px" }}>
              {selected.messages?.map((msg, i) => (
                <div
                  key={i}
                  style={{
                    maxWidth: "70%",
                    padding: "10px 14px",
                    borderRadius: "12px",
                    fontSize: "14px",
                    lineHeight: "1.4",
                    alignSelf: msg.role === "user" ? "flex-start" : "flex-end",
                    background: msg.role === "user" ? "#dcf8c6" : "#ffffff",
                    border: msg.role === "user" ? "none" : "1px solid #e0e0e0",
                    boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
                  }}
                >
                  {msg.content}
                </div>
              ))}
            </div>
          </>
        ) : (
          <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center", color: "#999" }}>
            <p>Seleccioná una conversación para ver los mensajes</p>
          </div>
        )}
      </div>

      <button
        onClick={() => { setAuthenticated(false); setSelected(null); setConversations([]); }}
        style={{ position: "fixed", top: "12px", right: "12px", padding: "8px 16px", background: "#e53935", color: "white", border: "none", borderRadius: "6px", cursor: "pointer", fontSize: "12px" }}
      >
        Cerrar
      </button>
    </div>
  );
}
