"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [showLogin, setShowLogin] = useState(false);
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const manualRef = useRef<HTMLDivElement>(null);
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
          <button onClick={() => manualRef.current?.scrollIntoView({ behavior: "smooth" })} style={{ padding: "8px 16px", background: "transparent", border: "none", color: "#8E94A8", cursor: "pointer", fontSize: "13px", fontWeight: "500" }}>Manual</button>
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

      {/* MANUAL COMPLETO */}
      <div ref={manualRef} style={{ position: "relative", zIndex: 1, maxWidth: "900px", margin: "0 auto", padding: "60px 40px 80px" }}>
        <SectionTitle>Manual de Uso</SectionTitle>
        <p style={{ color: "#8E94A8", fontSize: "15px", textAlign: "center", marginBottom: "48px", maxWidth: "650px", marginLeft: "auto", marginRight: "auto", lineHeight: "1.7" }}>
          Documentación completa del sistema de atención automatizada por WhatsApp de Grupo FALPAT. Esta guía explica cómo funciona la aplicación, cómo configurarla y cómo sacarle el máximo provecho.
        </p>

        {/* ÍNDICE */}
        <div style={{ padding: "28px 32px", background: "rgba(18,18,42,0.9)", border: "1px solid rgba(108,60,225,0.15)", borderRadius: "12px", marginBottom: "48px" }}>
          <h3 style={{ fontSize: "16px", fontWeight: "700", color: "#6C3CE1", margin: "0 0 16px" }}>Índice</h3>
          <ol style={{ margin: 0, paddingLeft: "20px", fontSize: "14px", color: "#8E94A8", lineHeight: "2.2" }}>
            <li>Visión General del Sistema</li>
            <li>Arquitectura Técnica</li>
            <li>Flujo de Mensajes — Paso a Paso</li>
            <li>Panel de Administración</li>
            <li>Base de Conocimiento — Secciones Disponibles</li>
            <li>Cómo Alimentar la Base de Conocimiento</li>
            <li>Configuración del Horario</li>
            <li>Buenas Prácticas y Consejos</li>
          </ol>
        </div>

        {/* ═══════════════════════════════════════════ */}
        {/* 1. VISIÓN GENERAL */}
        {/* ═══════════════════════════════════════════ */}
        <ManualSection number="1" title="Visión General del Sistema">
          <p>El <strong>WhatsApp Bot de Grupo FALPAT</strong> es un asistente virtual impulsado por inteligencia artificial que atiende automáticamente las consultas de los clientes a través de WhatsApp. Está diseñado para responder preguntas sobre productos, servicios, precios, horarios y cualquier otra información relevante del negocio, sin intervención humana.</p>
          <ManualSubTitle>Características principales</ManualSubTitle>
          <BulletList items={[
            "Funciona las 24 horas, los 7 días de la semana",
            "Utiliza IA generativa (Groq con Llama 3.3 70B) para respuestas naturales",
            "Mantiene el contexto de cada conversación individual",
            "Se adapta a los horarios de atención configurados",
            "No necesita redeployar para actualizarse — los cambios se aplican al instante",
            "Las conversaciones se guardan automáticamente en Firebase para revisión"
          ]} />
          <ManualSubTitle>Tecnologías utilizadas</ManualSubTitle>
          <p>El sistema está construido con una arquitectura 100% gratuita compuesta por:</p>
          <TechTable rows={[
            ["Componente", "Tecnología", "Función"],
            ["Motor de IA", "Groq (Llama 3.3 70B)", "Procesa consultas y genera respuestas"],
            ["Base de datos", "Firebase Firestore", "Almacena conversaciones y configuración"],
            ["Hosting", "Vercel", "Ejecuta el webhook y el panel admin"],
            ["Mensajería", "WhatsApp Business API (Meta)", "Canal de comunicación con clientes"],
            ["Frontend", "Next.js 14 + React", "Panel administrativo y landing page"]
          ]} />
        </ManualSection>

        {/* ═══════════════════════════════════════════ */}
        {/* 2. ARQUITECTURA TÉCNICA */}
        {/* ═══════════════════════════════════════════ */}
        <ManualSection number="2" title="Arquitectura Técnica">
          <p>La aplicación está compuesta por varios archivos clave, cada uno con una función específica en el ecosistema del bot:</p>
          <FileTree files={[
            { name: "src/app/api/webhook/route.ts", desc: "Punto de entrada. Recibe los mensajes de WhatsApp de Meta y coordina todo el flujo." },
            { name: "src/lib/ai.ts", desc: "Módulo de inteligencia artificial. Construye el system prompt dinámico desde Firebase y consulta Groq para generar respuestas." },
            { name: "src/lib/whatsapp.ts", desc: "Cliente HTTP para enviar mensajes de vuelta al usuario a través de la API de WhatsApp Business." },
            { name: "src/lib/firebase.ts", desc: "Conexión con Firebase Firestore. Soporta autenticación por JSON de service account o variables individuales." },
            { name: "src/lib/monitor.ts", desc: "Sistema de monitoreo. Registra cantidad de mensajes, lecturas y escrituras en Firebase." },
            { name: "src/app/admin/page.tsx", desc: "Panel de administración completo. Permite ver conversaciones, editar la base de conocimiento y ajustar configuración." },
            { name: "src/app/page.tsx", desc: "Landing page pública con este manual de uso y acceso al panel admin." },
            { name: ".env.local", desc: "Variables de entorno: API keys de Groq, WhatsApp, Firebase y credenciales de acceso." }
          ]} />
          <ManualSubTitle>Datos almacenados en Firebase</ManualSubTitle>
          <p>Toda la configuración del bot se guarda en la colección <code style={codeStyle}>config</code> de Firestore, en el documento <code style={codeStyle}>bot</code>. Esto incluye:</p>
          <BulletList items={[
            "Instrucciones del sistema (cómo se comporta el bot)",
            "Lista de productos con descripciones",
            "Lista de servicios con descripciones",
            "Preguntas frecuentes con respuestas",
            "Datos del negocio (nombre, dirección, teléfono, email)",
            "Configuración de horarios de atención"
          ]} />
          <p>Las conversaciones se guardan en la colección <code style={codeStyle}>conversations</code> con el número de teléfono del usuario como ID del documento.</p>
        </ManualSection>

        {/* ═══════════════════════════════════════════ */}
        {/* 3. FLUJO DE MENSAJES */}
        {/* ═══════════════════════════════════════════ */}
        <ManualSection number="3" title="Flujo de Mensajes — Paso a Paso">
          <p>Cada vez que un cliente envía un mensaje, se ejecuta el siguiente proceso:</p>
          <FlowStep number={1} title="El cliente escribe por WhatsApp" desc="Un usuario envía un mensaje al número de WhatsApp de FALPAT. Puede ser una consulta sobre un producto, un precio, un servicio o cualquier otra pregunta." />
          <FlowStep number={2} title="Meta envía el webhook" desc="WhatsApp Business API (Meta) recibe el mensaje y lo reenvía automáticamente como una petición HTTP POST a nuestro endpoint en Vercel: /api/webhook" />
          <FlowStep number={3} title="El webhook procesa la solicitud" desc="El archivo webhook/route.ts recibe el payload de Meta, extrae el número del usuario y el texto del mensaje. Si el mensaje es una imagen o documento, lo registra pero responde con texto." />
          <FlowStep number={4} title="Se recupera la configuración" desc="El sistema lee la base de conocimiento desde Firebase Firestore. Esto incluye los productos, servicios, FAQ, horarios e instrucciones del bot. Se cachea por 60 segundos para no saturar la base de datos." />
          <FlowStep number={5} title="Se construye el System Prompt" desc="Dinámicamente se arma el prompt del sistema con toda la información de la base de conocimiento: productos, servicios, FAQ, datos del negocio y horarios. Este prompt es lo que le da 'personalidad' y 'conocimiento' al bot." />
          <FlowStep number={6} title="Se recupera el historial" desc="Se buscan los mensajes anteriores de este usuario en Firebase para mantener el contexto de la conversación. La IA puede referenciar lo que el cliente preguntó antes." />
          <FlowStep number={7} title="Groq genera la respuesta" desc="Se envía todo (system prompt + historial + mensaje actual) al modelo Llama 3.3 70B a través de Groq. La IA genera una respuesta contextualizada, natural y basada en la información de la base de conocimiento." />
          <FlowStep number={8} title="Se envía la respuesta" desc="El módulo whatsapp.ts envía el texto generado como respuesta al cliente a través de la API de WhatsApp. Todo ocurre en pocos segundos." />
          <FlowStep number={9} title="Se guarda la conversación" desc="Tanto el mensaje del usuario como la respuesta del bot se almacenan en Firebase Firestore dentro del documento de conversación correspondiente a ese número de teléfono." />
          <FlowStep number={10} title="Horario fuera de atención" desc="Si el mensaje llega fuera del horario laboral configurado, el bot responde igual pero agrega una nota al pie indicando que el equipo responderá durante el próximo horario hábil. Nunca se queda sin responder." />

          <div style={{ marginTop: "24px", padding: "20px", background: "rgba(16,185,129,0.06)", border: "1px solid rgba(16,185,129,0.15)", borderRadius: "12px" }}>
            <h4 style={{ margin: "0 0 8px", fontSize: "14px", color: "#10B981", fontWeight: "700" }}>Importante</h4>
            <p style={{ margin: 0, fontSize: "14px", color: "#8E94A8", lineHeight: "1.6" }}>
              El bot <strong>siempre</strong> responde con inteligencia artificial, sin importar la hora del día o el día de la semana. La única diferencia es que, fuera del horario laboral, se agrega un mensaje indicando que la respuesta fue generada por el asistente virtual y que un representante se contactará durante el próximo horario hábil.
            </p>
          </div>
        </ManualSection>

        {/* ═══════════════════════════════════════════ */}
        {/* 4. PANEL DE ADMINISTRACIÓN */}
        {/* ═══════════════════════════════════════════ */}
        <ManualSection number="4" title="Panel de Administración">
          <p>El panel admin es el centro de control del bot. Se accede desde el botón "Admin" en la barra superior de esta página, o directamente en:</p>
          <div style={{ padding: "12px 16px", background: "rgba(10,10,26,0.8)", border: "1px solid rgba(108,60,225,0.2)", borderRadius: "8px", fontSize: "14px", color: "#6C3CE1", fontFamily: "monospace", marginBottom: "20px" }}>
            /admin?key=falpat-stats-2024
          </div>
          <ManualSubTitle>Credenciales de acceso</ManualSubTitle>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "24px" }}>
            <div style={{ padding: "14px 18px", background: "rgba(18,18,42,0.8)", border: "1px solid rgba(108,60,225,0.15)", borderRadius: "10px" }}>
              <span style={{ display: "block", fontSize: "12px", color: "#5C6378", marginBottom: "4px" }}>Usuario</span>
              <span style={{ fontSize: "18px", fontWeight: "700", color: "#F1F3F8", fontFamily: "monospace" }}>ADMIN</span>
            </div>
            <div style={{ padding: "14px 18px", background: "rgba(18,18,42,0.8)", border: "1px solid rgba(108,60,225,0.15)", borderRadius: "10px" }}>
              <span style={{ display: "block", fontSize: "12px", color: "#5C6378", marginBottom: "4px" }}>Clave</span>
              <span style={{ fontSize: "18px", fontWeight: "700", color: "#F1F3F8", fontFamily: "monospace" }}>123456</span>
            </div>
          </div>

          <ManualSubTitle>Sección 1: Conversaciones</ManualSubTitle>
          <p>Muestra una lista con todas las conversaciones activas del bot. Cada entrada muestra:</p>
          <BulletList items={[
            "El número de teléfono del cliente",
            "La cantidad de mensajes intercambiados",
            "La fecha y hora del último mensaje",
            "Un botón para expandir y ver la conversación completa"
          ]} />
          <p>Esta sección es ideal para monitorear qué preguntan los clientes, detectar problemas recurrentes y verificar que el bot está respondiendo correctamente.</p>

          <ManualSubTitle>Sección 2: Base de Conocimiento</ManualSubTitle>
          <p>Permite editar en tiempo real toda la información que el bot utiliza para responder. Los cambios se guardan en Firebase y se reflejan al instante (sin necesidad de redeployar). Contiene las siguientes sub-secciones:</p>
          <BulletList items={[
            "Instrucciones del Bot — El comportamiento general (tono, idioma, reglas)",
            "Productos — Lista de productos con nombre y descripción",
            "Servicios — Lista de servicios que ofrece la empresa",
            "Preguntas Frecuentes — Pares de pregunta-respuesta para consultas comunes",
            "Datos del Negocio — Nombre, dirección, teléfono, email, sitio web"
          ]} />

          <ManualSubTitle>Sección 3: Configuración</ManualSubTitle>
          <p>Ajustes generales del sistema. Permite modificar los datos de contacto del negocio, el horario de atención, y ver indicadores básicos de uso del sistema.</p>
        </ManualSection>

        {/* ═══════════════════════════════════════════ */}
        {/* 5. BASE DE CONOCIMIENTO */}
        {/* ═══════════════════════════════════════════ */}
        <ManualSection number="5" title="Base de Conocimiento — Secciones Disponibles">
          <p>Cada sección de la base de conocimiento alimenta directamente el comportamiento del bot. A continuación se detalla qué contiene cada una y cómo influye en las respuestas.</p>

          <div style={{ padding: "24px", background: "rgba(18,18,42,0.9)", border: "1px solid rgba(108,60,225,0.15)", borderRadius: "12px", marginBottom: "20px" }}>
            <h4 style={{ fontSize: "17px", fontWeight: "700", color: "#6C3CE1", margin: "0 0 12px" }}>5.1 Instrucciones del Bot</h4>
            <p style={{ fontSize: "14px", color: "#8E94A8", lineHeight: "1.7", margin: "0 0 12px" }}>
              Es el <strong>texto más importante</strong> de toda la base de conocimiento. Define la "personalidad" del asistente: cómo habla, qué puede y qué no puede hacer, y qué reglas debe seguir en cada respuesta.
            </p>
            <p style={{ fontSize: "14px", color: "#8E94A8", lineHeight: "1.7", margin: "0 0 12px" }}>Aquí se pueden definir cosas como:</p>
            <BulletList items={[
              "El tono de comunicación (formal, casual, cercano, profesional)",
              "El idioma (español rioplatense, español neutro, etc.)",
              "Reglas de negocio (nunca inventar precios, siempre derivar cotizaciones)",
              "Instrucciones de fallback (qué hacer cuando no sabe la respuesta)",
              "Formato de respuestas (breves, detalladas, con emojis, etc.)"
            ]} />
            <div style={{ padding: "14px 18px", background: "rgba(10,10,26,0.6)", border: "1px solid rgba(108,60,225,0.1)", borderRadius: "8px", marginTop: "8px" }}>
              <span style={{ fontSize: "12px", color: "#5C6378" }}>Ejemplo de instrucción:</span>
              <p style={{ fontSize: "14px", color: "#E2E4EA", margin: "6px 0 0", lineHeight: "1.6", fontStyle: "italic" }}>
                &quot;Sos el asistente virtual de Grupo FALPAT, empresa de hormigones. Respondé siempre en español rioplatense, de forma amable y profesional. No inventes precios; ante consultas de precio, derivate al equipo de ventas. Si el cliente necesita algo que no sabés, decile que un representante lo contactará pronto.&quot;
              </p>
            </div>
          </div>

          <div style={{ padding: "24px", background: "rgba(18,18,42,0.9)", border: "1px solid rgba(108,60,225,0.15)", borderRadius: "12px", marginBottom: "20px" }}>
            <h4 style={{ fontSize: "17px", fontWeight: "700", color: "#6C3CE1", margin: "0 0 12px" }}>5.2 Productos</h4>
            <p style={{ fontSize: "14px", color: "#8E94A8", lineHeight: "1.7", margin: "0 0 12px" }}>
              Lista completa de los productos que vende FALPAT. Cada producto tiene un <strong>nombre</strong> y una <strong>descripción detallada</strong>. El bot utiliza esta información para responder preguntas como "¿qué es el Fast Track?", "¿qué tipo de hormigón manejan?" o "¿tienen mortero RDC?".
            </p>
            <p style={{ fontSize: "14px", color: "#8E94A8", lineHeight: "1.7", margin: "0 0 12px" }}>Campos de cada producto:</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "1px", background: "rgba(108,60,225,0.1)", borderRadius: "8px", overflow: "hidden", marginBottom: "12px" }}>
              <div style={{ padding: "10px 14px", background: "rgba(10,10,26,0.8)", fontSize: "13px", fontWeight: "600", color: "#6C3CE1" }}>Nombre</div>
              <div style={{ padding: "10px 14px", background: "rgba(10,10,26,0.8)", fontSize: "13px", color: "#8E94A8" }}>Identificador corto del producto (ej: Hormigón Proyectado)</div>
              <div style={{ padding: "10px 14px", background: "rgba(18,18,42,0.8)", fontSize: "13px", fontWeight: "600", color: "#6C3CE1" }}>Descripción</div>
              <div style={{ padding: "10px 14px", background: "rgba(18,18,42,0.8)", fontSize: "13px", color: "#8E94A8" }}>Detalle completo: composición, usos, ventajas, aplicaciones, especificaciones técnicas</div>
            </div>
            <p style={{ fontSize: "14px", color: "#8E94A8", lineHeight: "1.7", margin: 0 }}>
              <strong>Consejo:</strong> Mientras más detallada sea la descripción, mejor podrá el bot responder preguntas específicas sobre ese producto.
            </p>
          </div>

          <div style={{ padding: "24px", background: "rgba(18,18,42,0.9)", border: "1px solid rgba(108,60,225,0.15)", borderRadius: "12px", marginBottom: "20px" }}>
            <h4 style={{ fontSize: "17px", fontWeight: "700", color: "#6C3CE1", margin: "0 0 12px" }}>5.3 Servicios</h4>
            <p style={{ fontSize: "14px", color: "#8E94A8", lineHeight: "1.7", margin: "0 0 12px" }}>
              Catálogo de servicios que ofrece la empresa. Cuando un cliente pregunta "¿qué hacen?", "¿qué servicios prestan?" o "¿alquilan mixer?", el bot consulta esta sección para dar una respuesta completa.
            </p>
            <p style={{ fontSize: "14px", color: "#8E94A8", lineHeight: "1.7", margin: 0 }}>Ejemplos de servicios que se pueden cargar: servicio post-venta, alquiler de mixer, alquiler de bombas pluma, servicio de laboratorio, carga en planta, asesoramiento técnico, etc.</p>
          </div>

          <div style={{ padding: "24px", background: "rgba(18,18,42,0.9)", border: "1px solid rgba(108,60,225,0.15)", borderRadius: "12px", marginBottom: "20px" }}>
            <h4 style={{ fontSize: "17px", fontWeight: "700", color: "#6C3CE1", margin: "0 0 12px" }}>5.4 Preguntas Frecuentes (FAQ)</h4>
            <p style={{ fontSize: "14px", color: "#8E94A8", lineHeight: "1.7", margin: "0 0 12px" }}>
              Pares de <strong>pregunta + respuesta</strong> para las consultas más comunes de los clientes. El bot utiliza este apartado para dar respuestas rápidas y consistentes sin necesidad de "pensar" demasiado en la respuesta.
            </p>
            <p style={{ fontSize: "14px", color: "#8E94A8", lineHeight: "1.7", margin: "0 0 12px" }}>Campos de cada FAQ:</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "1px", background: "rgba(108,60,225,0.1)", borderRadius: "8px", overflow: "hidden", marginBottom: "12px" }}>
              <div style={{ padding: "10px 14px", background: "rgba(10,10,26,0.8)", fontSize: "13px", fontWeight: "600", color: "#6C3CE1" }}>Pregunta</div>
              <div style={{ padding: "10px 14px", background: "rgba(10,10,26,0.8)", fontSize: "13px", color: "#8E94A8" }}>La consulta tal cual la haría el cliente (ej: "¿Hacen envíos a zona sur?")</div>
              <div style={{ padding: "10px 14px", background: "rgba(18,18,42,0.8)", fontSize: "13px", fontWeight: "600", color: "#6C3CE1" }}>Respuesta</div>
              <div style={{ padding: "10px 14px", background: "rgba(18,18,42,0.8)", fontSize: "13px", color: "#8E94A8" }}>La respuesta ideal que el bot debe dar (ej: "Sí, realizamos entregas en obra en todo Gran Buenos Aires y alrededores.")</div>
            </div>
          </div>

          <div style={{ padding: "24px", background: "rgba(18,18,42,0.9)", border: "1px solid rgba(108,60,225,0.15)", borderRadius: "12px", marginBottom: "20px" }}>
            <h4 style={{ fontSize: "17px", fontWeight: "700", color: "#6C3CE1", margin: "0 0 12px" }}>5.5 Datos del Negocio</h4>
            <p style={{ fontSize: "14px", color: "#8E94A8", lineHeight: "1.7", margin: "0 0 12px" }}>
              Información general de contacto de Grupo FALPAT. El bot usa estos datos cuando el cliente pregunta "¿dónde están?", "¿cuál es el teléfono?" o "¿cómo los contacto?".
            </p>
            <BulletList items={[
              "Nombre del negocio",
              "Dirección física",
              "Número de teléfono",
              "Correo electrónico",
              "Sitio web (si aplica)"
            ]} />
          </div>

          <div style={{ padding: "24px", background: "rgba(18,18,42,0.9)", border: "1px solid rgba(108,60,225,0.15)", borderRadius: "12px" }}>
            <h4 style={{ fontSize: "17px", fontWeight: "700", color: "#6C3CE1", margin: "0 0 12px" }}>5.6 Configuración de Horarios</h4>
            <p style={{ fontSize: "14px", color: "#8E94A8", lineHeight: "1.7", margin: "0 0 12px" }}>
              Define los horarios de atención de la empresa. El bot usa esta información para adaptar sus respuestas según el momento del día:
            </p>
            <BulletList items={[
              "En horario laboral: responde normalmente pero puede sugerir que un representante se contactará para consultas complejas",
              "Fuera de horario laboral: responde con IA y agrega una nota indicando que el equipo responderá durante el próximo horario hábil",
              "El huso horario se configura en el código (America/Argentina/Buenos_Aires)"
            ]} />
            <div style={{ marginTop: "12px", padding: "14px 18px", background: "rgba(10,10,26,0.6)", border: "1px solid rgba(108,60,225,0.1)", borderRadius: "8px" }}>
              <span style={{ fontSize: "12px", color: "#5C6378" }}>Configuración por defecto:</span>
              <p style={{ fontSize: "14px", color: "#E2E4EA", margin: "6px 0 0", lineHeight: "1.6" }}>
                Lunes a Viernes: horario laboral 8–17hs · Sábados: 8–14hs · Domingos: cerrado
              </p>
              <p style={{ fontSize: "13px", color: "#8E94A8", margin: "6px 0 0", lineHeight: "1.5" }}>
                El bot opera inversamente: fuera del horario laboral (nocturno, fines de semana) es cuando más actividad tiene, ya que los clientes suelen escribir fuera del horario de oficina.
              </p>
            </div>
          </div>
        </ManualSection>

        {/* ═══════════════════════════════════════════ */}
        {/* 6. CÓMO ALIMENTAR LA KB */}
        {/* ═══════════════════════════════════════════ */}
        <ManualSection number="6" title="Cómo Alimentar la Base de Conocimiento">
          <p>Para que el bot funcione correctamente, es fundamental cargar y mantener actualizada la información. Siguí estos pasos:</p>

          <NumberedStep number="1" title="Ingresar al Panel Admin">
            <p>Hacé click en el botón <strong>"Admin"</strong> de la barra superior de esta página. Ingresá con las credenciales indicadas en la sección 4 de este manual.</p>
          </NumberedStep>

          <NumberedStep number="2" title="Ir a la solapa 'Base de Conocimiento'">
            <p>Una vez dentro del panel, seleccioná la solapa <strong>"Base de Conocimiento"</strong>. Ahí vas a encontrar todas las secciones editables.</p>
          </NumberedStep>

          <NumberedStep number="3" title="Completar las Instrucciones del Bot">
            <p>Escribí cómo querés que se comporte el asistente. Definí el tono, el idioma, y las reglas que debe seguir. Este es el paso más importante porque define la personalidad del bot.</p>
          </NumberedStep>

          <NumberedStep number="4" title="Cargar Productos y Servicios">
            <p>Agregá cada producto y servicio haciendo click en el botón <strong>"+ Agregar"</strong>. Completá el nombre y una descripción lo más detallada posible. Si un producto tiene aplicaciones específicas, mencionalas.</p>
          </NumberedStep>

          <NumberedStep number="5" title="Crear Preguntas Frecuentes">
            <p>Escribí las preguntas que más recibís de los clientes junto con la respuesta ideal. Esto ayuda al bot a responder de forma precisa y consistente.</p>
          </NumberedStep>

          <NumberedStep number="6" title="Completar Datos del Negocio">
            <p>Cargá la información de contacto: nombre, dirección, teléfono, email. Así el bot puede brindar estos datos cuando el cliente los solicite.</p>
          </NumberedStep>

          <NumberedStep number="7" title="Guardar y Probar">
            <p>Hacé click en el botón <strong>"Guardar"</strong>. Los cambios se aplican al instante. Para probar, escribí al número del bot desde tu celular y verificá que las respuestas sean correctas.</p>
          </NumberedStep>

          <div style={{ marginTop: "12px", padding: "20px", background: "rgba(245,158,11,0.06)", border: "1px solid rgba(245,158,11,0.15)", borderRadius: "12px" }}>
            <h4 style={{ margin: "0 0 8px", fontSize: "14px", color: "#F59E0B", fontWeight: "700" }}>No hace falta redeployar</h4>
            <p style={{ margin: 0, fontSize: "14px", color: "#8E94A8", lineHeight: "1.6" }}>
              Los cambios en la base de conocimiento se aplican al instante. El bot lee la configuración de Firebase en cada mensaje (con un cache de 60 segundos). No es necesario hacer commit ni deployar a Vercel para que los cambios surtan efecto.
            </p>
          </div>
        </ManualSection>

        {/* ═══════════════════════════════════════════ */}
        {/* 7. CONFIGURACIÓN DEL HORARIO */}
        {/* ═══════════════════════════════════════════ */}
        <ManualSection number="7" title="Configuración del Horario">
          <p>El sistema de horarios permite que el bot se adapte a los momentos del día. La configuración se realiza desde la sección de Configuración del Panel Admin.</p>
          <ManualSubTitle>Cómo funciona la lógica de horarios</ManualSubTitle>
          <BulletList items={[
            "El bot siempre responde — nunca se queda sin contestar",
            "En horario laboral, responde con normalidad y puede sugerir contacto humano para consultas complejas",
            "Fuera de horario laboral, responde igualmente pero agrega un aviso al pie del mensaje indicando que el equipo lo contactará durante el próximo horario hábil",
            "El sistema usa el huso horario America/Argentina/Buenos_Aires"
          ]} />
          <ManualSubTitle>Ejemplo de comportamiento</ManualSubTitle>
          <div style={{ padding: "16px 20px", background: "rgba(10,10,26,0.8)", border: "1px solid rgba(108,60,225,0.15)", borderRadius: "10px", fontSize: "14px", lineHeight: "1.7" }}>
            <p style={{ color: "#8E94A8", margin: "0 0 12px" }}><strong style={{ color: "#F1F3F8" }}>Mensaje del cliente (martes 22:30hs):</strong></p>
            <p style={{ color: "#E2E4EA", margin: "0 0 16px", fontStyle: "italic" }}>&quot;Hola, ¿cuánto sale el metro cúbico de hormigón f'c=250?&quot;</p>
            <p style={{ color: "#8E94A8", margin: "0 0 12px" }}><strong style={{ color: "#10B981" }}>Respuesta del bot:</strong></p>
            <p style={{ color: "#E2E4EA", margin: 0, fontStyle: "italic" }}>&quot;Hola! Para una cotización del hormigón f&apos;c=250, te recomiendo comunicarte con nuestro equipo de ventas al +54 11-3197-2072 para obtener el precio más actualizado según el volumen y destino. Horario de atención: lunes a viernes de 8 a 17hs. ¡Cualquier otra consulta estoy para ayudarte!&quot;</p>
            <p style={{ color: "#F59E0B", margin: "12px 0 0", fontSize: "13px" }}>[El bot agrega automáticamente: "Nota: Respondido fuera del horario laboral. Un representante se contactará durante el próximo horario hábil."]</p>
          </div>
        </ManualSection>

        {/* ═══════════════════════════════════════════ */}
        {/* 8. BUENAS PRÁCTICAS */}
        {/* ═══════════════════════════════════════════ */}
        <ManualSection number="8" title="Buenas Prácticas y Consejos">
          <p>Para sacar el máximo provecho del bot, seguí estas recomendaciones:</p>

          <div style={{ display: "grid", gap: "16px" }}>
            <ManualTip icon="✏️" title="Sé específico en las descripciones">
              <p>Cuanto más detallada sea la descripción de un producto o servicio, mejor podrá el bot responder preguntas complejas. En vez de escribir "hormigón", escribí "hormigón proyectado f'c=300, aplicado mediante proyección neumática, ideal para revestimientos de piletas y túneles".</p>
            </ManualTip>

            <ManualTip icon="💰" title="Nunca pongas precios fijos en la base de conocimiento">
              <p>Si los precios varían por volumen, destino, zona o tipo de proyecto, es mejor indicar que "los precios dependen del volumen y destino, contactanos para una cotización personalizada". Así evitás problemas con precios desactualizados o incorrectos.</p>
            </ManualTip>

            <ManualTip icon="🔄" title="Mantené la información actualizada">
              <p>Cada vez que haya un nuevo producto, un servicio nuevo o un cambio en los datos de contacto, actualizá la base de conocimiento. No hace falta redeployar — los cambios se reflejan al instante.</p>
            </ManualTip>

            <ManualTip icon="🗣️" title="Usá el lenguaje de tus clientes">
              <p>Si tus clientes dicen "hormigón" en vez de "concreto", usá las palabras que ellos usan. Así el bot conecta mejor con el usuario y genera respuestas más naturales y cercanas.</p>
            </ManualTip>

            <ManualTip icon="🤝" title="Configurá un buen fallback">
              <p>Siempre tené una instrucción tipo: "Si no sabés algo, decile al cliente que un representante lo contactará pronto". Así el bot nunca queda en blanco y el cliente siempre se siente atendido.</p>
            </ManualTip>

            <ManualTip icon="📋" title="Revisá las conversaciones regularmente">
              <p>Entrá al Panel Admin → Conversaciones para ver qué preguntan los clientes. Si ves una pregunta que el bot no responde bien o no puede responder, agregala a las Preguntas Frecuentes con la respuesta correcta.</p>
            </ManualTip>

            <ManualTip icon="🔍" title="Monitoreá el rendimiento">
              <p>Revisá periódicamente las estadísticas del sistema para asegurarte de que todo funciona correctamente. Si notás que el bot está tardando mucho o dando respuestas incorrectas, puede ser necesario ajustar las instrucciones.</p>
            </ManualTip>
          </div>
        </ManualSection>
      </div>

      {/* FOOTER */}
      <div style={{ textAlign: "center", padding: "32px", color: "#5C6378", fontSize: "12px", borderTop: "1px solid rgba(108,60,225,0.1)" }}>
        &copy; 2026 Grupo FALPAT SRL &mdash; WhatsApp Bot con IA
      </div>
    </div>
  );
}

const codeStyle: React.CSSProperties = { padding: "2px 8px", background: "rgba(108,60,225,0.1)", border: "1px solid rgba(108,60,225,0.15)", borderRadius: "4px", fontSize: "13px", color: "#6C3CE1", fontFamily: "monospace" };

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

function ManualSection({ number, title, children }: { number: string; title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: "56px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "20px", paddingBottom: "16px", borderBottom: "1px solid rgba(108,60,225,0.15)" }}>
        <div style={{ width: "40px", height: "40px", borderRadius: "10px", background: "linear-gradient(135deg, #6C3CE1, #00D4FF)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px", fontWeight: "800", color: "#0A0A1A", flexShrink: 0 }}>{number}</div>
        <h3 style={{ fontSize: "22px", fontWeight: "800", color: "#F1F3F8", margin: 0 }}>{title}</h3>
      </div>
      <div style={{ fontSize: "15px", color: "#C0C4D0", lineHeight: "1.8" }}>
        {children}
      </div>
    </div>
  );
}

function ManualSubTitle({ children }: { children: React.ReactNode }) {
  return <h4 style={{ fontSize: "17px", fontWeight: "700", color: "#6C3CE1", margin: "24px 0 12px" }}>{children}</h4>;
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul style={{ margin: "8px 0 16px", paddingLeft: "20px" }}>
      {items.map((item, i) => <li key={i} style={{ marginBottom: "8px", lineHeight: "1.6" }}>{item}</li>)}
    </ul>
  );
}

function TechTable({ rows }: { rows: string[][] }) {
  return (
    <div style={{ margin: "12px 0 20px", borderRadius: "10px", overflow: "hidden", border: "1px solid rgba(108,60,225,0.15)" }}>
      {rows.map((row, i) => (
        <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 1fr 2fr", background: i === 0 ? "rgba(108,60,225,0.1)" : i % 2 === 0 ? "rgba(18,18,42,0.8)" : "rgba(10,10,26,0.8)" }}>
          {row.map((cell, j) => <div key={j} style={{ padding: "10px 16px", fontSize: i === 0 ? "13px" : "14px", fontWeight: i === 0 ? "700" : "400", color: i === 0 ? "#6C3CE1" : "#C0C4D0", borderRight: j < row.length - 1 ? "1px solid rgba(108,60,225,0.1)" : "none" }}>{cell}</div>)}
        </div>
      ))}
    </div>
  );
}

function FileTree({ files }: { files: { name: string; desc: string }[] }) {
  return (
    <div style={{ margin: "12px 0 20px", padding: "16px 20px", background: "rgba(10,10,26,0.8)", border: "1px solid rgba(108,60,225,0.15)", borderRadius: "10px" }}>
      {files.map((file, i) => (
        <div key={i} style={{ display: "flex", gap: "12px", padding: "8px 0", borderBottom: i < files.length - 1 ? "1px solid rgba(108,60,225,0.08)" : "none", alignItems: "flex-start" }}>
          <span style={{ fontFamily: "monospace", fontSize: "13px", color: "#6C3CE1", flexShrink: 0, minWidth: "320px" }}>{file.name}</span>
          <span style={{ fontSize: "13px", color: "#8E94A8", lineHeight: "1.4" }}>{file.desc}</span>
        </div>
      ))}
    </div>
  );
}

function FlowStep({ number, title, desc }: { number: number; title: string; desc: string }) {
  return (
    <div style={{ display: "flex", gap: "16px", marginBottom: "20px" }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
        <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "rgba(108,60,225,0.2)", color: "#6C3CE1", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "13px", fontWeight: "700" }}>{number}</div>
        {number < 10 && <div style={{ width: "2px", flex: 1, background: "rgba(108,60,225,0.15)", marginTop: "4px" }} />}
      </div>
      <div style={{ paddingTop: "4px", paddingBottom: "8px" }}>
        <h4 style={{ fontSize: "15px", fontWeight: "700", color: "#F1F3F8", margin: "0 0 6px" }}>{title}</h4>
        <p style={{ fontSize: "14px", color: "#8E94A8", margin: 0, lineHeight: "1.6" }}>{desc}</p>
      </div>
    </div>
  );
}

function NumberedStep({ number, title, children }: { number: number; title: string; children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", gap: "16px", marginBottom: "28px", padding: "20px", background: "rgba(18,18,42,0.6)", border: "1px solid rgba(108,60,225,0.1)", borderRadius: "12px" }}>
      <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: "rgba(108,60,225,0.2)", color: "#6C3CE1", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px", fontWeight: "700", flexShrink: 0 }}>{number}</div>
      <div>
        <h4 style={{ fontSize: "16px", fontWeight: "700", color: "#F1F3F8", margin: "0 0 8px" }}>{title}</h4>
        <div style={{ fontSize: "14px", color: "#8E94A8", lineHeight: "1.6" }}>{children}</div>
      </div>
    </div>
  );
}

function ManualTip({ icon, title, children }: { icon: string; title: string; children: React.ReactNode }) {
  return (
    <div style={{ padding: "20px 24px", background: "rgba(18,18,42,0.8)", border: "1px solid rgba(108,60,225,0.15)", borderRadius: "12px" }}>
      <div style={{ display: "flex", gap: "12px", alignItems: "center", marginBottom: "10px" }}>
        <span style={{ fontSize: "22px" }}>{icon}</span>
        <h4 style={{ fontSize: "15px", fontWeight: "700", color: "#F1F3F8", margin: 0 }}>{title}</h4>
      </div>
      <div style={{ fontSize: "14px", color: "#8E94A8", lineHeight: "1.6" }}>{children}</div>
    </div>
  );
}
