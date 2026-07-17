"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [showLogin, setShowLogin] = useState(false);
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState<"como" | "kb" | "ajustes">("como");
  const router = useRouter();
  const kbRef = useRef<HTMLDivElement>(null);
  const comoRef = useRef<HTMLDivElement>(null);

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

      {/* NAV */}
      <nav style={{ position: "sticky", top: 0, zIndex: 10, padding: "16px 40px", display: "flex", justifyContent: "space-between", alignItems: "center", background: "rgba(10,10,26,0.9)", backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(108,60,225,0.1)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{ width: "36px", height: "36px", borderRadius: "8px", background: "linear-gradient(135deg, #6C3CE1, #00D4FF)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px", fontWeight: "bold", color: "#0A0A1A" }}>F</div>
          <span style={{ fontSize: "16px", fontWeight: "700" }}>Grupo FALPAT</span>
        </div>
        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
          <button onClick={() => comoRef.current?.scrollIntoView({ behavior: "smooth" })} style={{ padding: "8px 16px", background: "transparent", border: "none", color: "#8E94A8", cursor: "pointer", fontSize: "13px", fontWeight: "500" }}>Cómo funciona</button>
          <button onClick={() => kbRef.current?.scrollIntoView({ behavior: "smooth" })} style={{ padding: "8px 16px", background: "transparent", border: "none", color: "#8E94A8", cursor: "pointer", fontSize: "13px", fontWeight: "500" }}>Base de Conocimiento</button>
          <button onClick={() => setShowLogin(!showLogin)} style={{ padding: "8px 20px", background: "rgba(108,60,225,0.15)", border: "1px solid rgba(108,60,225,0.3)", borderRadius: "8px", color: "#6C3CE1", cursor: "pointer", fontSize: "13px", fontWeight: "600" }}>Admin</button>
        </div>
      </nav>

      {/* LOGIN MODAL */}
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
            <button onClick={handleLogin} style={{ width: "100%", padding: "12px", background: "linear-gradient(135deg, #6C3CE1, #00D4FF)", border: "none", borderRadius: "8px", color: "#0A0A1A", fontSize: "16px", fontWeight: "700", cursor: "pointer" }}>Ingresar</button>
            <button onClick={() => setShowLogin(false)} style={{ width: "100%", padding: "8px", background: "transparent", border: "none", color: "#8E94A8", fontSize: "13px", cursor: "pointer", marginTop: "8px" }}>Cancelar</button>
          </div>
        </div>
      )}

      {/* HERO */}
      <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "70vh", padding: "60px 40px 40px", textAlign: "center" }}>
        <div style={{ width: "80px", height: "80px", borderRadius: "20px", background: "linear-gradient(135deg, #6C3CE1, #00D4FF)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "32px", boxShadow: "0 8px 32px rgba(108,60,225,0.3)" }}>
          <svg width="40" height="40" fill="none" stroke="#0A0A1A" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/></svg>
        </div>
        <h1 style={{ fontSize: "48px", fontWeight: "900", marginBottom: "16px", lineHeight: "1.1" }}>
          <span style={{ color: "#6C3CE1" }}>WhatsApp</span> Bot
          <br />
          <span style={{ fontSize: "36px", color: "#8E94A8", fontWeight: "400" }}>Grupo FALPAT</span>
        </h1>
        <p style={{ fontSize: "18px", color: "#8E94A8", maxWidth: "550px", marginBottom: "40px", lineHeight: "1.6" }}>
          Asistente virtual inteligente con IA que atiende a tus clientes por WhatsApp las 24 horas. Responde preguntas sobre productos, servicios y cotizaciones de forma automática y profesional.
        </p>
        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", justifyContent: "center" }}>
          <StatusBadge text="Groq IA (Llama 3.3)" color="#10B981" />
          <StatusBadge text="Firebase Firestore" color="#10B981" />
          <StatusBadge text="Vercel Hosting" color="#10B981" />
          <StatusBadge text="WhatsApp Business API" color="#10B981" />
        </div>
      </div>

      {/* CÓMO FUNCIONA */}
      <div ref={comoRef} style={{ position: "relative", zIndex: 1, maxWidth: "1000px", margin: "0 auto", padding: "40px 40px 60px" }}>
        <SectionTitle>¿Cómo funciona?</SectionTitle>
        <p style={{ color: "#8E94A8", fontSize: "15px", textAlign: "center", marginBottom: "40px", maxWidth: "600px", marginLeft: "auto", marginRight: "auto" }}>
          El bot recibe mensajes de WhatsApp, procesa la consulta con inteligencia artificial y responde automáticamente usando la información configurada en la Base de Conocimiento.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px" }}>
          <StepCard step="1" title="Cliente envía mensaje" desc="Un cliente escribe al número de WhatsApp de FALPAT con una consulta sobre productos, precios o servicios." icon="💬" />
          <StepCard step="2" title="Meta recibe el mensaje" desc="WhatsApp Business API (Meta) recibe el mensaje y lo envía automáticamente a nuestro webhook en Vercel." icon="📨" />
          <StepCard step="3" title="IA procesa la consulta" desc="Groq (Llama 3.3 70B) analiza la pregunta del cliente junto con el historial de la conversación y la base de conocimiento." icon="🧠" />
          <StepCard step="4" title="Se genera la respuesta" desc="La IA genera una respuesta personalizada basada en los productos, servicios y preguntas frecuentes configurados." icon="✍️" />
          <StepCard step="5" title="Respuesta automática" desc="El bot envía la respuesta al cliente por WhatsApp en pocos segundos. La conversación se guarda en Firebase." icon="⚡" />
          <StepCard step="6" title="Monitoreo en tiempo real" desc="Desde el Panel Admin podés ver todas las conversaciones, estadísticas y configurar las respuestas del bot." icon="📊" />
        </div>

        <div style={{ marginTop: "32px", padding: "20px", background: "rgba(108,60,225,0.05)", border: "1px solid rgba(108,60,225,0.15)", borderRadius: "12px" }}>
          <h4 style={{ margin: "0 0 8px", fontSize: "14px", color: "#6C3CE1" }}>Horario del bot</h4>
          <p style={{ margin: 0, fontSize: "14px", color: "#8E94A8", lineHeight: "1.6" }}>
            <strong>Lunes a Viernes:</strong> Bot activo de 17:00 a 08:00 hs (fuera del horario laboral). En horario laboral (8-17) responde igual pero avisa que un representante contactará.
            <br />
            <strong>Sábados:</strong> Bot activo desde 14:00 hs.
            <br />
            <strong>Domingos:</strong> Activo todo el día.
          </p>
        </div>
      </div>

      {/* BASE DE CONOCIMIENTO */}
      <div ref={kbRef} style={{ position: "relative", zIndex: 1, maxWidth: "1000px", margin: "0 auto", padding: "40px 40px 60px" }}>
        <SectionTitle>Base de Conocimiento</SectionTitle>
        <p style={{ color: "#8E94A8", fontSize: "15px", textAlign: "center", marginBottom: "32px", maxWidth: "650px", marginLeft: "auto", marginRight: "auto" }}>
          La Base de Conocimiento es lo que le da "inteligencia" al bot. Mientras más completa y precisa sea la información, mejores respuestas dará a tus clientes.
        </p>

        {/* Tabs */}
        <div style={{ display: "flex", gap: "4px", marginBottom: "24px", background: "rgba(10,10,26,0.5)", padding: "4px", borderRadius: "10px", border: "1px solid rgba(108,60,225,0.1)", maxWidth: "500px", marginLeft: "auto", marginRight: "auto" }}>
          {([["como", "Cómo alimentarla"], ["kb", "Secciones"], ["ajustes", "Consejos"]] as const).map(([key, label]) => (
            <button key={key} onClick={() => setActiveTab(key as any)} style={{ flex: 1, padding: "10px 16px", border: "none", borderRadius: "8px", cursor: "pointer", fontSize: "13px", fontWeight: "600", transition: "all 0.2s", background: activeTab === key ? "rgba(108,60,225,0.2)" : "transparent", color: activeTab === key ? "#6C3CE1" : "#8E94A8" }}>
              {label}
            </button>
          ))}
        </div>

        {activeTab === "como" && (
          <div style={{ display: "grid", gap: "16px" }}>
            <HowCard
              title="Paso 1: Ingresar al Panel Admin"
              desc='Hacé click en el botón "Admin" de la barra superior. Ingresá con usuario ADMIN y clave 123456.'
              detail="Una vez dentro, seleccioná la solapa 'Base de Conocimiento' para empezar a editar."
            />
            <HowCard
              title="Paso 2: Configurar los datos del negocio"
              desc='Andá a la solapa "Configuración" y completá los datos de FALPAT: nombre, teléfono, email, dirección, etc.'
              detail="Estos datos se usan para que el bot pueda dar información de contacto a los clientes."
            />
            <HowCard
              title="Paso 3: Cargar los productos"
              desc='En "Base de Conocimiento" → "Productos", hacé click en "+ Agregar" y completá nombre y descripción de cada producto.'
              detail="Ejemplo: Nombre: Hormigón Proyectado / Descripción: Se aplica mediante proyección neumática. Ideal para piletas y revestimientos."
            />
            <HowCard
              title="Paso 4: Cargar los servicios"
              desc='En "Servicios", agregá cada servicio que ofrece FALPAT (alquiler de mixer, laboratorio, etc).'
              detail="El bot usará esta información para responder consultas sobre qué servicios ofrecen."
            />
            <HowCard
              title="Paso 5: Crear preguntas frecuentes"
              desc='En "Preguntas Frecuentes", escribí las preguntas más comunes de tus clientes y las respuestas ideales.'
              detail="Ejemplo: Pregunta: ¿Hacen envíos? / Respuesta: Sí, realizamos entregas en obra en Gran Buenos Aires y alrededores."
            />
            <HowCard
              title="Paso 6: Personalizar las instrucciones"
              desc='En "Instrucciones del Bot" escribí cómo querés que se comporte el asistente (tono, idioma, reglas).'
              detail='Ejemplo: "Sos el asistente virtual de FALPAT. Respondé de forma amable, profesional y concisa. Si no sabés algo, derivalo a un humano."'
            />
            <HowCard
              title="Paso 7: Guardar y probar"
              desc='Hacé click en "Guardar" (arriba a la derecha). Las respuestas se actualizan en tiempo real, no hace falta redeployar.'
              detail="Escribí al número del bot desde tu celular para probar las nuevas respuestas."
            />
          </div>
        )}

        {activeTab === "kb" && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "16px" }}>
            <KBCard title="Instrucciones del Bot" icon="🎯" desc="El comportamiento general del asistente. Define el tono (formal, casual, profesional), el idioma, y reglas como 'no inventar precios' o 'derivar a un humano en consultas complejas'." example='Sos el asistente virtual de Grupo FALPAT. Respondé de forma amable, concisa y profesional en español. Nunca inventes información.' />
            <KBCard title="Productos" icon="📦" desc="Todos los productos que vende FALPAT con su descripción detallada. Mientras más completa sea la descripción, mejor podrá responder el bot." example="Hormigón Proyectado: Se aplica mediante proyección neumática. Ideal para construcción de piletas y revestimientos." />
            <KBCard title="Servicios" icon="🔧" desc="Los servicios que ofrece la empresa. El bot los menciona cuando el cliente pregunta qué hacen o qué ofrecen." example="Servicio post-venta, Alquiler de Mixer, Alquiler bombas pluma, Servicio de laboratorio, Carga en planta" />
            <KBCard title="Preguntas Frecuentes" icon="❓" desc="Las preguntas que más hacen los clientes con sus respuestas ideales. El bot prioriza estas respuestas cuando detecta una pregunta similar." example='Pregunta: ¿Cuánto cuesta? / Respuesta: Los precios dependen del tipo de hormigón y volumen. Contactanos al +54 11-3197-2072.' />
            <KBCard title="Datos del Negocio" icon="🏢" desc="Información de contacto, ubicación, horarios y redes sociales. El bot usa estos datos para dar información general." example="Grupo FALPAT, Ruta 6 y 34 km 156, Luján, Tel: +54 11-3197-2072" />
            <KBCard title="Horarios" icon="🕐" desc="Configurá el horario de atención. Fuera de horario, el bot responde igual pero avisa que un representante contactará." example="Lun-Vie 8-17hs, Sáb hasta 14hs. Domingos: 24hs." />
          </div>
        )}

        {activeTab === "ajustes" && (
          <div style={{ display: "grid", gap: "16px" }}>
            <TipCard icon="✏️" title="Sé específico en las descripciones" desc="Cuanto más detallada sea la descripción de un producto, mejor podrá el bot responder preguntas como '¿qué es el Fast Track?' o '¿para qué sirve el mortero RDC?'." />
            <TipCard icon="💰" title="Nunca pongas precios fijos" desc="Si los precios varían por volumen o zona, mejor decí 'los precios dependen del volumen y destino, contactanos para una cotización'. Así evitás problemas." />
            <TipCard icon="🔄" title="Actualizá regularly" desc="Cada vez que haya un nuevo producto, servicio o cambio de precio, actualizá la base de conocimiento. El bot se adapta al instante." />
            <TipCard icon="🗣️" title="Usá el lenguaje de tus clientes" desc="Si tus clientes dicen 'hormigón' en vez de 'concreto', usá las palabras que ellos usan. Así el bot conecta mejor." />
            <TipCard icon="🤝" title="Agregá respuestas de fallback" desc="Siempre tené una regla como 'si no sabés algo, decí que un representante te contactará'. Así el bot nunca queda en blanco." />
            <TipCard icon="📋" title="Revisá las conversaciones" desc="Entrá al Panel Admin → Conversaciones para ver qué preguntan los clientes. Si ves una pregunta que el bot no responde bien, agregala a las FAQs." />
            <TipCard icon="⚡" title="No hace falta redeployar" desc="Los cambios en la base de conocimiento se aplican al instante. El bot lee la configuración de Firebase en cada mensaje (con cache de 1 minuto)." />
          </div>
        )}
      </div>

      {/* FOOTER */}
      <div style={{ textAlign: "center", padding: "32px", color: "#5C6378", fontSize: "12px", borderTop: "1px solid rgba(108,60,225,0.1)" }}>
        &copy; 2026 Grupo FALPAT SRL &mdash; WhatsApp Bot con IA
      </div>
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 style={{ fontSize: "28px", fontWeight: "800", textAlign: "center", marginBottom: "12px" }}><span style={{ color: "#6C3CE1" }}>{children}</span></h2>;
}

function StatusBadge({ text, color }: { text: string; color: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "8px 16px", background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.2)", borderRadius: "8px" }}>
      <span style={{ color, fontWeight: "bold", fontSize: "14px" }}>✓</span>
      <span style={{ color: "#8E94A8", fontSize: "13px" }}>{text}</span>
    </div>
  );
}

function StepCard({ step, title, desc, icon }: { step: string; title: string; desc: string; icon: string }) {
  return (
    <div style={{ padding: "24px", background: "rgba(18,18,42,0.8)", border: "1px solid rgba(108,60,225,0.15)", borderRadius: "12px", position: "relative" }}>
      <div style={{ position: "absolute", top: "16px", right: "16px", fontSize: "24px" }}>{icon}</div>
      <div style={{ width: "28px", height: "28px", borderRadius: "50%", background: "rgba(108,60,225,0.2)", color: "#6C3CE1", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "13px", fontWeight: "700", marginBottom: "12px" }}>{step}</div>
      <h3 style={{ fontSize: "16px", fontWeight: "700", marginBottom: "8px", color: "#F1F3F8" }}>{title}</h3>
      <p style={{ fontSize: "13px", color: "#8E94A8", margin: 0, lineHeight: "1.5" }}>{desc}</p>
    </div>
  );
}

function HowCard({ title, desc, detail }: { title: string; desc: string; detail: string }) {
  return (
    <div style={{ padding: "20px", background: "rgba(18,18,42,0.8)", border: "1px solid rgba(108,60,225,0.15)", borderRadius: "12px" }}>
      <h4 style={{ fontSize: "15px", fontWeight: "700", marginBottom: "8px", color: "#F1F3F8", margin: "0 0 8px" }}>{title}</h4>
      <p style={{ fontSize: "14px", color: "#8E94A8", margin: "0 0 8px", lineHeight: "1.5" }}>{desc}</p>
      <p style={{ fontSize: "13px", color: "#5C6378", margin: 0, lineHeight: "1.5", fontStyle: "italic" }}>{detail}</p>
    </div>
  );
}

function KBCard({ title, icon, desc, example }: { title: string; icon: string; desc: string; example: string }) {
  return (
    <div style={{ padding: "20px", background: "rgba(18,18,42,0.8)", border: "1px solid rgba(108,60,225,0.15)", borderRadius: "12px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
        <span style={{ fontSize: "22px" }}>{icon}</span>
        <h4 style={{ fontSize: "15px", fontWeight: "700", color: "#F1F3F8", margin: 0 }}>{title}</h4>
      </div>
      <p style={{ fontSize: "13px", color: "#8E94A8", margin: "0 0 10px", lineHeight: "1.5" }}>{desc}</p>
      <div style={{ padding: "10px 14px", background: "rgba(108,60,225,0.06)", border: "1px solid rgba(108,60,225,0.1)", borderRadius: "8px", fontSize: "12px", color: "#6C3CE1", lineHeight: "1.5" }}>
        <strong>Ejemplo:</strong> {example}
      </div>
    </div>
  );
}

function TipCard({ icon, title, desc }: { icon: string; title: string; desc: string }) {
  return (
    <div style={{ padding: "20px", background: "rgba(18,18,42,0.8)", border: "1px solid rgba(108,60,225,0.15)", borderRadius: "12px", display: "flex", gap: "16px", alignItems: "flex-start" }}>
      <span style={{ fontSize: "24px", flexShrink: 0 }}>{icon}</span>
      <div>
        <h4 style={{ fontSize: "15px", fontWeight: "700", marginBottom: "6px", color: "#F1F3F8", margin: "0 0 6px" }}>{title}</h4>
        <p style={{ fontSize: "13px", color: "#8E94A8", margin: 0, lineHeight: "1.5" }}>{desc}</p>
      </div>
    </div>
  );
}
