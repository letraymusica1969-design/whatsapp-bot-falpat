"use client";

import { useState, useEffect, useRef } from "react";

const operational = [
  { id: "op1", num: "01", title: "Qué es el Bot" },
  { id: "op2", num: "02", title: "Panel de Administración" },
  { id: "op3", num: "03", title: "Base de Conocimiento" },
  { id: "op4", num: "04", title: "Cómo Alimentar la KB" },
  { id: "op5", num: "05", title: "Configuración del Horario" },
  { id: "op6", num: "06", title: "Buenas Prácticas" },
];

const technical = [
  { id: "te1", num: "01", title: "Arquitectura del Sistema" },
  { id: "te2", num: "02", title: "Estructura de Archivos" },
  { id: "te3", num: "03", title: "Flujo de Mensajes" },
  { id: "te4", num: "04", title: "Base de Datos Firebase" },
  { id: "te5", num: "05", title: "Variables de Entorno" },
  { id: "te6", num: "06", title: "Despliegue y Mantenimiento" },
];

type Tab = "operativo" | "tecnico";

export default function ManualPage() {
  const [tab, setTab] = useState<Tab>("operativo");
  const [active, setActive] = useState("op1");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const mainRef = useRef<HTMLDivElement>(null);
  const chapters = tab === "operativo" ? operational : technical;

  useEffect(() => { setActive(chapters[0].id); }, [tab]);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => { const vis = entries.filter((e) => e.isIntersecting); if (vis.length > 0) setActive(vis[0].target.id); },
      { rootMargin: "-80px 0px -55% 0px", threshold: 0 }
    );
    chapters.forEach((ch) => { const el = document.getElementById(ch.id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, [tab, chapters]);

  const handleTabChange = (newTab: Tab) => { setTab(newTab); mainRef.current?.scrollTo({ top: 0, behavior: "smooth" }); };

  const handleNavClick = (id: string) => {
    setSidebarOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div style={{ minHeight: "100vh", background: "#0A0A1A", color: "#FFF", fontFamily: "'Inter', system-ui, sans-serif", lineHeight: "1.6", overflowX: "hidden" }}>
      <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none", background: "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)", backgroundSize: "50px 50px" }} />

      <style>{`
        html { scrollbar-width: thin; scrollbar-color: #6C3CE1 transparent; }
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: rgba(255,255,255,0.05); border-radius: 10px; }
        ::-webkit-scrollbar-thumb { background: linear-gradient(180deg, #6C3CE1, #00D4FF); border-radius: 10px; }
        .gl { background: rgba(255,255,255,0.04); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); border: 1px solid rgba(255,255,255,0.08); box-shadow: 0 25px 50px -12px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.08); transition: border-color 0.3s, box-shadow 0.3s; }
        .gl:hover { border-color: rgba(108,60,225,0.3); box-shadow: 0 30px 60px -12px rgba(0,0,0,0.8), 0 0 40px -10px rgba(108,60,225,0.25); }
        .tg { background: linear-gradient(135deg, #6C3CE1, #00D4FF); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
        .ng { text-shadow: 0 0 7px rgba(108,60,225,0.6), 0 0 20px rgba(108,60,225,0.3); }
        .nl { display: flex; align-items: center; gap: 10px; padding: 10px 14px; border-radius: 8px; font-size: 13px; color: #B0B0D0; transition: all 0.2s; text-decoration: none; cursor: pointer; }
        .nl:hover { color: #fff; background: rgba(255,255,255,0.05); }
        .nl.active { color: #fff; background: linear-gradient(to right, rgba(108,60,225,0.2), transparent); border-left: 3px solid #6C3CE1; }
        @media (max-width: 768px) {
          .desktop-sidebar { display: none !important; }
          .mobile-sidebar { position: fixed !important; top: 56px; left: 0; right: 0; bottom: 0; z-index: 50; background: rgba(10,10,26,0.98); backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px); overflow-y: auto; padding: 16px !important; transform: translateY(0); transition: transform 0.3s ease; }
          .mobile-sidebar.hidden { transform: translateY(100%); pointer-events: none; }
          .main-content { margin-left: 0 !important; padding: 24px 16px 60px !important; }
          .mobile-overlay { display: block !important; }
        }
        @media (min-width: 769px) {
          .mobile-sidebar { display: none !important; }
          .mobile-overlay { display: none !important; }
          .hamburger-btn { display: none !important; }
        }
      `}</style>

      {/* HEADER */}
      <header style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 40, height: "56px", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 16px", background: "rgba(10,10,26,0.9)", backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <button className="hamburger-btn" onClick={() => setSidebarOpen(!sidebarOpen)} style={{ padding: "6px", background: "none", border: "none", color: "#8E94A8", cursor: "pointer", fontSize: "18px", display: "flex", alignItems: "center" }}>
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" d={sidebarOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} /></svg>
          </button>
          <a href="/" style={{ display: "flex", alignItems: "center", gap: "8px", textDecoration: "none" }}>
            <div style={{ width: "28px", height: "28px", borderRadius: "6px", background: "linear-gradient(135deg, #6C3CE1, #00D4FF)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: "800", color: "#0A0A1A" }}>F</div>
            <span style={{ fontSize: "13px", fontWeight: "700", color: "#F1F3F8" }}>Grupo FALPAT</span>
          </a>
          <span style={{ color: "rgba(255,255,255,0.15)", fontSize: "12px" }}>/</span>
          <span className="tg" style={{ fontSize: "13px", fontWeight: "600" }}>Manual</span>
        </div>
        <span style={{ fontSize: "10px", color: "#5C6378", padding: "3px 8px", border: "1px solid rgba(108,60,225,0.15)", borderRadius: "6px", fontWeight: "600" }}>v1.0</span>
      </header>

      {/* MOBILE OVERLAY */}
      <div className="mobile-overlay" onClick={() => setSidebarOpen(false)} style={{ display: "none", position: "fixed", inset: 0, top: "56px", background: "rgba(0,0,0,0.5)", zIndex: 45 }} />

      {/* MOBILE SIDEBAR */}
      <div className={`mobile-sidebar ${sidebarOpen ? "" : "hidden"}`}>
        <Tabs tab={tab} onChange={handleTabChange} />
        <p style={{ fontSize: "10px", fontWeight: "700", color: "#6B6B8A", textTransform: "uppercase", letterSpacing: "0.1em", margin: "16px 0 8px" }}>Contenidos</p>
        <nav>
          {chapters.map((ch) => (
            <a key={ch.id} onClick={() => handleNavClick(ch.id)} className={`nl ${active === ch.id ? "active" : ""}`} style={{ marginBottom: "2px" }}>
              <span style={{ width: "22px", height: "22px", borderRadius: "5px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "10px", fontWeight: "700", flexShrink: 0, background: active === ch.id ? "rgba(108,60,225,0.2)" : "rgba(108,60,225,0.06)", color: active === ch.id ? "#6C3CE1" : "#5C6378" }}>{ch.num}</span>
              <span>{ch.title}</span>
            </a>
          ))}
        </nav>
      </div>

      {/* DESKTOP SIDEBAR */}
      <aside className="desktop-sidebar" style={{ position: "fixed", top: "56px", left: 0, bottom: 0, width: "260px", padding: "24px 16px", overflowY: "auto", background: "rgba(10,10,26,0.95)", borderRight: "1px solid rgba(255,255,255,0.05)", display: "flex", flexDirection: "column" }}>
        <Tabs tab={tab} onChange={handleTabChange} />
        <p style={{ fontSize: "10px", fontWeight: "700", color: "#6B6B8A", textTransform: "uppercase", letterSpacing: "0.1em", margin: "16px 0 12px 14px" }}>Contenidos</p>
        <nav style={{ flex: 1 }}>
          {chapters.map((ch) => (
            <a key={ch.id} href={`#${ch.id}`} className={`nl ${active === ch.id ? "active" : ""}`} style={{ marginBottom: "2px" }}>
              <span style={{ width: "24px", height: "24px", borderRadius: "6px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "10px", fontWeight: "700", flexShrink: 0, background: active === ch.id ? "rgba(108,60,225,0.2)" : "rgba(108,60,225,0.06)", color: active === ch.id ? "#6C3CE1" : "#5C6378" }}>{ch.num}</span>
              <span style={{ fontSize: "13px" }}>{ch.title}</span>
            </a>
          ))}
        </nav>
        <div style={{ marginTop: "24px", padding: "14px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "10px" }}>
          <p style={{ fontSize: "10px", color: "#6B6B8A", margin: "0 0 4px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.05em" }}>Última actualización</p>
          <p style={{ fontSize: "12px", color: "#B0B0D0", margin: 0, fontWeight: "600" }}>17 de Julio, 2026</p>
        </div>
      </aside>

      {/* MAIN */}
      <main ref={mainRef} className="main-content" style={{ marginLeft: "260px", maxWidth: "780px", padding: "40px 48px 80px" }}>
        <div style={{ marginBottom: "48px", paddingBottom: "36px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "5px 12px", background: "rgba(108,60,225,0.1)", border: "1px solid rgba(108,60,225,0.2)", borderRadius: "20px", fontSize: "10px", fontWeight: "700", color: "#6C3CE1", letterSpacing: "0.05em", marginBottom: "20px" }}>
            {tab === "operativo" ? "👤 MANUAL OPERATIVO" : "⚙️ MANUAL TÉCNICO"}
          </div>
          <h1 className="tg ng" style={{ fontSize: "clamp(28px, 5vw, 38px)", fontWeight: "900", margin: "0 0 8px", lineHeight: "1.1" }}>
            {tab === "operativo" ? "Manual Operativo" : "Manual Técnico"}
          </h1>
          <h2 style={{ fontSize: "clamp(16px, 3vw, 18px)", fontWeight: "400", margin: "0 0 16px" }}>
            <span style={{ color: "#B0B0D0" }}>WhatsApp Bot — </span><span className="tg">Grupo FALPAT</span>
          </h2>
          <p style={{ fontSize: "14px", color: "#6B7280", lineHeight: "1.7", maxWidth: "560px", margin: 0 }}>
            {tab === "operativo"
              ? "Guía completa para administrar el bot de WhatsApp. Aprender a configurar, alimentar y mantener la base de conocimiento."
              : "Documentación técnica del sistema. Arquitectura, estructura de código, flujos de datos y procedimientos de despliegue."
            }
          </p>
        </div>

        {tab === "operativo" && <OperativoContent />}
        {tab === "tecnico" && <TecnicoContent />}

        <div style={{ marginTop: "56px", paddingTop: "24px", borderTop: "1px solid rgba(255,255,255,0.06)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "8px" }}>
          <p style={{ margin: 0, fontSize: "11px", color: "#5C6378" }}>&copy; 2026 Grupo FALPAT SRL</p>
          <p style={{ margin: 0, fontSize: "11px", color: "#5C6378" }}>Documento generado automáticamente</p>
        </div>
      </main>
    </div>
  );
}

function Tabs({ tab, onChange }: { tab: Tab; onChange: (t: Tab) => void }) {
  return (
    <div style={{ display: "flex", background: "rgba(255,255,255,0.04)", borderRadius: "10px", padding: "3px", border: "1px solid rgba(255,255,255,0.06)" }}>
      <button onClick={() => onChange("operativo")} style={{ flex: 1, padding: "10px 6px", border: "none", borderRadius: "8px", cursor: "pointer", fontSize: "12px", fontWeight: "700", transition: "all 0.2s", background: tab === "operativo" ? "linear-gradient(135deg, #6C3CE1, #00D4FF)" : "transparent", color: tab === "operativo" ? "#0A0A1A" : "#6B7280" }}>
        <span style={{ display: "block", fontSize: "16px", marginBottom: "2px" }}>👤</span>Operativo
      </button>
      <button onClick={() => onChange("tecnico")} style={{ flex: 1, padding: "10px 6px", border: "none", borderRadius: "8px", cursor: "pointer", fontSize: "12px", fontWeight: "700", transition: "all 0.2s", background: tab === "tecnico" ? "linear-gradient(135deg, #6C3CE1, #00D4FF)" : "transparent", color: tab === "tecnico" ? "#0A0A1A" : "#6B7280" }}>
        <span style={{ display: "block", fontSize: "16px", marginBottom: "2px" }}>⚙️</span>Técnico
      </button>
    </div>
  );
}

/* ═══════════════════════════════════════ */
/*  OPERATIVO                               */
/* ═══════════════════════════════════════ */
function OperativoContent() {
  return (<>
    <Section id="op1" num="01" title="Qué es el Bot">
      <p>El <strong>WhatsApp Bot de Grupo FALPAT</strong> es un asistente virtual que responde automáticamente las consultas de tus clientes por WhatsApp, las 24 horas del día.</p>
      <SubTitle>¿Qué hace?</SubTitle>
      <p>Cuando un cliente envía un mensaje, el bot:</p>
      <List items={["Recibe y analiza la consulta", "Busca información en la base de conocimiento", "Genera una respuesta personalizada con IA", "La envía en pocos segundos", "Guarda la conversación para revisión"]} />
      <SubTitle>¿Qué necesitás saber?</SubTitle>
      <p>Como administrador, solo necesitás:</p>
      <List items={["Cómo acceder al Panel de Administración", "Cómo cargar y mantener la información de la Base de Conocimiento"]} />
      <Note color="green">El bot <strong>siempre</strong> responde. Nunca se queda sin contestar. Fuera del horario laboral agrega un aviso indicando que un representante se contactará.</Note>
    </Section>

    <Section id="op2" num="02" title="Panel de Administración">
      <p>El Panel de Administración es donde controlás todo el bot.</p>
      <SubTitle>Cómo acceder</SubTitle>
      <CodeBlock>/admin?key=falpat-stats-2024</CodeBlock>
      <p>O hacé click en &quot;Admin&quot; en la barra superior de la página principal.</p>
      <SubTitle>Credenciales</SubTitle>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: "12px", margin: "0 0 28px" }}>
        <div className="gl" style={{ padding: "16px", borderRadius: "12px" }}>
          <p style={{ margin: "0 0 4px", fontSize: "10px", color: "#6B6B8A", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.1em" }}>Usuario</p>
          <p style={{ margin: 0, fontSize: "20px", fontWeight: "800", color: "#F1F3F8", fontFamily: "'JetBrains Mono', monospace" }}>ADMIN</p>
        </div>
        <div className="gl" style={{ padding: "16px", borderRadius: "12px" }}>
          <p style={{ margin: "0 0 4px", fontSize: "10px", color: "#6B6B8A", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.1em" }}>Clave</p>
          <p style={{ margin: 0, fontSize: "20px", fontWeight: "800", color: "#F1F3F8", fontFamily: "'JetBrains Mono', monospace" }}>123456</p>
        </div>
      </div>
      <SubTitle>Las 3 secciones del panel</SubTitle>
      <MiniCard color="#6C3CE1" title="1. Conversaciones" text="Todas las conversaciones activas del bot. Número de cliente, cantidad de mensajes, fecha y conversación completa." />
      <MiniCard color="#6C3CE1" title="2. Base de Conocimiento" text="Editá la información que el bot usa para responder. Cambios al instante, sin redeployar." />
      <MiniCard color="#6C3CE1" title="3. Configuración" text="Datos de contacto, horarios de atención e indicadores de uso del sistema." />
    </Section>

    <Section id="op3" num="03" title="Base de Conocimiento">
      <p>La Base de Conocimiento es lo que le da &quot;inteligencia&quot; al bot. Tiene 5 secciones:</p>
      <GlassBox title="3.1 Instrucciones del Bot">
        <p>La sección <strong>más importante</strong>. Define la personalidad: cómo habla, qué puede hacer, qué reglas sigue.</p>
        <List items={["Tono de comunicación (formal, casual, profesional)", "Idioma (español rioplatense, neutro, etc.)", "Reglas de negocio (nunca inventar precios)", "Fallback (qué hacer si no sabe la respuesta)"]} />
        <CodeExample label="Ejemplo">&quot;Sos el asistente virtual de Grupo FALPAT. Respondé en español rioplatense, amable y profesional. No inventes precios.&quot;</CodeExample>
      </GlassBox>
      <GlassBox title="3.2 Productos">Lista de productos con nombre y <strong>descripción detallada</strong>. Mientras más completa la descripción, mejor responde el bot.</GlassBox>
      <GlassBox title="3.3 Servicios">Catálogo de servicios (alquiler mixer, bombas pluma, laboratorio, etc.). El bot los menciona cuando preguntan qué hacen.</GlassBox>
      <GlassBox title="3.4 Preguntas Frecuentes (FAQ)">Pares de <strong>pregunta + respuesta</strong> para consultas comunes. El bot detecta preguntas similares y usa estas respuestas.</GlassBox>
      <GlassBox title="3.5 Datos del Negocio">Nombre, dirección, teléfono, email. El bot brinda estos datos cuando el cliente los solicita.</GlassBox>
    </Section>

    <Section id="op4" num="04" title="Cómo Alimentar la KB">
      <p>Seguí estos pasos en orden:</p>
      <Step n={1} title="Ingresar al Panel Admin">Click en &quot;Admin&quot; → ADMIN / 123456.</Step>
      <Step n={2} title="Ir a 'Base de Conocimiento'">Seleccioná la solapa correspondiente.</Step>
      <Step n={3} title="Instrucciones del Bot">Escribí tono, idioma y reglas. El paso más importante.</Step>
      <Step n={4} title="Productos y Servicios">Click en &quot;+ Agregar&quot;. Nombre + descripción detallada.</Step>
      <Step n={5} title="Preguntas Frecuentes">Las preguntas más comunes con sus respuestas ideales.</Step>
      <Step n={6} title="Datos del Negocio">Nombre, dirección, teléfono, email.</Step>
      <Step n={7} title="Guardar y Probar">Click en &quot;Guardar&quot;. Escribí al bot desde tu celular.</Step>
      <Note color="amber"><strong>Sin redeployar.</strong> Los cambios se aplican al instante (cache de 60 segundos).</Note>
    </Section>

    <Section id="op5" num="05" title="Configuración del Horario">
      <p>Desde <strong>Configuración</strong> definís los horarios de atención.</p>
      <List items={["El bot SIEMPRE responde", "En horario laboral: responde normalmente", "Fuera de horario: responde + aviso de representante", "Huso horario: America/Argentina/Buenos_Aires"]} />
      <SubTitle>Ejemplo</SubTitle>
      <div className="gl" style={{ padding: "20px", borderRadius: "12px", margin: "12px 0" }}>
        <p style={{ margin: "0 0 6px", fontSize: "10px", color: "#6B6B8A", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.1em" }}>Mensaje del cliente (22:30hs)</p>
        <div style={{ padding: "10px 14px", background: "rgba(108,60,225,0.06)", borderLeft: "3px solid #6C3CE1", borderRadius: "0 8px 8px 0", fontSize: "13px", color: "#F1F3F8", fontStyle: "italic", marginBottom: "12px" }}>&quot;¿Cuánto sale el metro cúbico de hormigón f&apos;c=250?&quot;</div>
        <p style={{ margin: "0 0 6px", fontSize: "10px", color: "#6B6B8A", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.1em" }}>Respuesta del bot</p>
        <div style={{ padding: "10px 14px", background: "rgba(16,185,129,0.06)", borderLeft: "3px solid #10B981", borderRadius: "0 8px 8px 0", fontSize: "13px", color: "#B0B0D0", lineHeight: "1.6" }}>
          &quot;Para una cotización, comunicate con nuestro equipo al +54 11-3197-2072.&quot;
          <div style={{ marginTop: "8px", padding: "6px 10px", background: "rgba(245,158,11,0.08)", border: "1px solid rgba(245,158,11,0.15)", borderRadius: "6px", fontSize: "11px", color: "#FCD34D" }}>[Nota: Fuera del horario laboral]</div>
        </div>
      </div>
    </Section>

    <Section id="op6" num="06" title="Buenas Prácticas">
      <Tip icon="✏️" title="Sé específico">Descripciones detalladas = mejores respuestas.</Tip>
      <Tip icon="💰" title="Sin precios fijos">Si varían, decí &quot;contactanos para cotización&quot;.</Tip>
      <Tip icon="🔄" title="Actualizá seguido">Nuevos productos o cambios? Actualizá al instante.</Tip>
      <Tip icon="🗣️" title="Lenguaje de tus clientes">Usá las palabras que ellos usan.</Tip>
      <Tip icon="🤝" title="Fallback">Siempre: &quot;Si no sabés, un representante lo contactará&quot;.</Tip>
      <Tip icon="📋" title="Revisá conversaciones">Detectá qué preguntan y mejorá las FAQs.</Tip>
    </Section>
  </>);
}

/* ═══════════════════════════════════════ */
/*  TÉCNICO                                */
/* ═══════════════════════════════════════ */
function TecnicoContent() {
  return (<>
    <Section id="te1" num="01" title="Arquitectura del Sistema">
      <p>Arquitectura serverless 100% gratuita:</p>
      <Table headers={["Componente", "Tecnología", "Función"]} rows={[
        ["Motor de IA", "Groq (Llama 3.3 70B)", "Procesa consultas y genera respuestas"],
        ["Base de datos", "Firebase Firestore", "Almacena conversaciones y configuración"],
        ["Hosting", "Vercel", "Ejecuta el webhook y el panel admin"],
        ["Mensajería", "WhatsApp Business API", "Canal de comunicación con clientes"],
        ["Frontend", "Next.js 14 + React", "Panel administrativo y landing page"]
      ]} />
      <SubTitle>Diagrama</SubTitle>
      <div style={{ padding: "20px", background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "12px", fontFamily: "'JetBrains Mono', monospace", fontSize: "12px", color: "#B0B0D0", lineHeight: "2", overflowX: "auto" }}>
        <div style={{ textAlign: "center", color: "#6C3CE1", fontWeight: "700" }}>Cliente (WhatsApp)</div>
        <div style={{ textAlign: "center", color: "#5C6378" }}>│ POST</div>
        <div style={{ textAlign: "center" }}><span style={{ color: "#6C3CE1", fontWeight: "700" }}>Vercel</span> /api/webhook</div>
        <div style={{ display: "flex", justifyContent: "center", gap: "24px", flexWrap: "wrap", marginTop: "8px" }}>
          <div style={{ textAlign: "center" }}><div style={{ color: "#5C6378" }}>│</div><div style={{ color: "#10B981", fontWeight: "700" }}>Firebase</div><div style={{ fontSize: "10px", color: "#6B7280" }}>config + convos</div></div>
          <div style={{ textAlign: "center" }}><div style={{ color: "#5C6378" }}>│</div><div style={{ color: "#F59E0B", fontWeight: "700" }}>Groq API</div><div style={{ fontSize: "10px", color: "#6B7280" }}>Llama 3.3</div></div>
        </div>
        <div style={{ textAlign: "center", color: "#5C6378" }}>│ POST</div>
        <div style={{ textAlign: "center", color: "#B0B0D0" }}>WhatsApp API → Cliente</div>
      </div>
    </Section>

    <Section id="te2" num="02" title="Estructura de Archivos">
      <FileBlock files={[
        { path: "src/app/api/webhook/route.ts", desc: "Endpoint POST que recibe payloads de WhatsApp Business API." },
        { path: "src/lib/ai.ts", desc: "Construye el system prompt dinámico desde Firebase, consulta Groq." },
        { path: "src/lib/whatsapp.ts", desc: "Wrapper HTTP para enviar mensajes vía WhatsApp Business API." },
        { path: "src/lib/firebase.ts", desc: "Inicialización Firebase Admin SDK. Soporta JSON o variables individuales." },
        { path: "src/lib/monitor.ts", desc: "Métricas de uso: mensajes, lecturas, escrituras en Firebase." },
        { path: "src/lib/types.ts", desc: "Definiciones TypeScript del sistema." },
        { path: "src/app/admin/page.tsx", desc: "Panel de administración completo (CRUD, conversaciones, config)." },
        { path: "src/app/page.tsx", desc: "Landing page pública con hero, features y acceso admin." },
        { path: ".env.local", desc: "Variables de entorno: API keys, tokens, service account." }
      ]} />
    </Section>

    <Section id="te3" num="03" title="Flujo de Mensajes">
      <Flow num={1} title="Webhook recibe payload">Meta envía HTTP POST a <code style={ci}>/api/webhook</code> con número, tipo y contenido del mensaje.</Flow>
      <Flow num={2} title="Validación">Se verifica firma <code style={ci}>X-Hub-Signature-256</code>, se parsea el mensaje. Imágenes → respuesta de solo texto.</Flow>
      <Flow num={3} title="Configuración">Se lee <code style={ci}>config/bot</code> de Firestore (cache 60s). Productos, servicios, FAQ, horarios.</Flow>
      <Flow num={4} title="System Prompt">Se arma dinámicamente: instrucciones + negocio + productos + servicios + FAQ + horarios.</Flow>
      <Flow num={5} title="Historial">Se busca <code style={ci}>conversations/{phone}</code> para mantener contexto de la conversación.</Flow>
      <Flow num={6} title="Groq API">Se envía todo a <code style={ci}>api.groq.com</code> con modelo <code style={ci}>llama-3.3-70b-versatile</code>.</Flow>
      <Flow num={7} title="Respuesta">Se extrae <code style={ci}>choices[0].message.content</code>. Fuera de horario → se agrega nota.</Flow>
      <Flow num={8} title="Envío">POST a WhatsApp Business API con el número y token de autenticación.</Flow>
      <Flow num={9} title="Persistencia">Se guarda user + assistant en <code style={ci}>conversations/{phone}</code> en Firestore.</Flow>
      <Note color="green"><strong>Error handling:</strong> Si Groq falla → mensaje fallback genérico. Si WhatsApp falla → se loguea pero la conversación se guarda.</Note>
    </Section>

    <Section id="te4" num="04" title="Base de Datos Firebase">
      <SubTitle>Colección: config</SubTitle>
      <div style={{ padding: "16px 20px", background: "rgba(0,0,0,0.2)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "12px", fontFamily: "'JetBrains Mono', monospace", fontSize: "11px", color: "#B0B0D0", lineHeight: "2", overflowX: "auto", marginBottom: "24px" }}>
        <div><span style={{ color: "#6C3CE1" }}>config</span>/<span style={{ color: "#F1F3F8" }}>bot</span></div>
        <div style={{ paddingLeft: "16px" }}>├── <span style={{ color: "#10B981" }}>instructions</span>: string</div>
        <div style={{ paddingLeft: "16px" }}>├── <span style={{ color: "#10B981" }}>business</span>: {"{ name, address, phone, email }"}</div>
        <div style={{ paddingLeft: "16px" }}>├── <span style={{ color: "#10B981" }}>products</span>: [{"{ name, description }"}]</div>
        <div style={{ paddingLeft: "16px" }}>├── <span style={{ color: "#10B981" }}>services</span>: [{"{ name, description }"}]</div>
        <div style={{ paddingLeft: "16px" }}>├── <span style={{ color: "#10B981" }}>faq</span>: [{"{ question, answer }"}]</div>
        <div style={{ paddingLeft: "16px" }}>└── <span style={{ color: "#10B981" }}>schedule</span>: {"{ timezone, days: {...} }"}</div>
      </div>
      <SubTitle>Colección: conversations</SubTitle>
      <div style={{ padding: "16px 20px", background: "rgba(0,0,0,0.2)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "12px", fontFamily: "'JetBrains Mono', monospace", fontSize: "11px", color: "#B0B0D0", lineHeight: "2", overflowX: "auto" }}>
        <div><span style={{ color: "#6C3CE1" }}>conversations</span>/<span style={{ color: "#F1F3F8" }}>"{`{phone}`}"</span></div>
        <div style={{ paddingLeft: "16px" }}>├── <span style={{ color: "#10B981" }}>phone</span>: string</div>
        <div style={{ paddingLeft: "16px" }}>├── <span style={{ color: "#10B981" }}>createdAt</span>: Timestamp</div>
        <div style={{ paddingLeft: "16px" }}>├── <span style={{ color: "#10B981" }}>updatedAt</span>: Timestamp</div>
        <div style={{ paddingLeft: "16px" }}>└── <span style={{ color: "#10B981" }}>messages</span>: [{"{ role, content, timestamp }"}]</div>
      </div>
    </Section>

    <Section id="te5" num="05" title="Variables de Entorno">
      <p>Todas en <code style={ci}>.env.local</code>. Nunca commitear a Git.</p>
      <SubTitle>Groq</SubTitle>
      <Table headers={["Variable", "Descripción"]} rows={[["GROQ_API_KEY", "API key de Groq para Llama 3.3 70B"]]} />
      <SubTitle>WhatsApp</SubTitle>
      <Table headers={["Variable", "Descripción"]} rows={[
        ["WHATSAPP_PHONE_NUMBER_ID", "ID del número en Meta Business Suite"],
        ["WHATSAPP_ACCESS_TOKEN", "Token de larga duración para la API"],
        ["WHATSAPP_VERIFY_TOKEN", "Token de verificación del webhook"]
      ]} />
      <SubTitle>Firebase</SubTitle>
      <Table headers={["Variable", "Descripción"]} rows={[
        ["FIREBASE_SERVICE_ACCOUNT", "JSON completo de service account (recomendado)"],
        ["FIREBASE_PROJECT_ID", "ID del proyecto (alternativa)"],
        ["FIREBASE_CLIENT_EMAIL", "Email de la service account (alternativa)"],
        ["FIREBASE_PRIVATE_KEY", "Clave privada (alternativa)"]
      ]} />
      <Note color="amber"><strong>Recomendado:</strong> Usar <code style={ci}>FIREBASE_SERVICE_ACCOUNT</code> con el JSON completo. Las variables individuales pueden fallar por problemas de escape.</Note>
      <SubTitle>Otras</SubTitle>
      <Table headers={["Variable", "Descripción"]} rows={[
        ["MONITOR_SECRET_KEY", "Clave para endpoints de monitoreo"],
        ["ADMIN_USER", "Usuario del panel admin"],
        ["ADMIN_PASS", "Contraseña del panel admin"]
      ]} />
    </Section>

    <Section id="te6" num="06" title="Despliegue y Mantenimiento">
      <SubTitle>Pipeline</SubTitle>
      <List items={["Push a master → build automático en Vercel", "npm install → next build → deploy", "Variables de entorno en dashboard de Vercel", "Builds fallidos en Deployments del dashboard"]} />
      <SubTitle>Comandos</SubTitle>
      <div style={{ display: "grid", gap: "6px", margin: "12px 0 24px" }}>
        {[{ c: "npm run dev", d: "Desarrollo local (localhost:3000)" }, { c: "npm run build", d: "Build de producción" }, { c: "npm run lint", d: "Verificar código" }, { c: "git push origin master", d: "Deploy automático" }].map((x, i) => (
          <div key={i} style={{ display: "flex", gap: "12px", alignItems: "center", padding: "10px 14px", background: "rgba(0,0,0,0.2)", border: "1px solid rgba(255,255,255,0.04)", borderRadius: "8px", flexWrap: "wrap" }}>
            <code style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "12px", color: "#6C3CE1", minWidth: "180px" }}>{x.c}</code>
            <span style={{ fontSize: "12px", color: "#6B7280" }}>{x.d}</span>
          </div>
        ))}
      </div>
      <SubTitle>Mantenimiento</SubTitle>
      <List items={["Verificar token de WhatsApp periódicamente", "Monitorear cuota Groq (30 req/min, 14,400/día)", "Revisar uso Firestore (50K lecturas/día)", "Actualizar dependencias con npm update"]} />
    </Section>
  </>);
}

/* ═══════════════════════════════════════ */
/*  COMPONENTES COMPARTIDOS                */
/* ═══════════════════════════════════════ */
const ci: React.CSSProperties = { padding: "1px 6px", background: "rgba(108,60,225,0.1)", border: "1px solid rgba(108,60,225,0.15)", borderRadius: "4px", fontSize: "12px", color: "#6C3CE1", fontFamily: "'JetBrains Mono', monospace" };

function Section({ id, num, title, children }: { id: string; num: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="gl" style={{ marginBottom: "24px", padding: "clamp(20px, 4vw, 32px)", borderRadius: "16px", scrollMarginTop: "72px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px", paddingBottom: "14px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ width: "36px", height: "36px", borderRadius: "10px", background: "linear-gradient(135deg, #6C3CE1, #00D4FF)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "13px", fontWeight: "800", color: "#0A0A1A", flexShrink: 0 }}>{num}</div>
        <h2 className="tg" style={{ fontSize: "clamp(18px, 3.5vw, 22px)", fontWeight: "800", margin: 0 }}>{title}</h2>
      </div>
      <div style={{ fontSize: "14px", color: "#B0B0D0", lineHeight: "1.8" }}>{children}</div>
    </section>
  );
}

function SubTitle({ children }: { children: React.ReactNode }) {
  return <h3 style={{ fontSize: "15px", fontWeight: "700", color: "#F1F3F8", margin: "24px 0 12px", paddingLeft: "12px", borderLeft: "3px solid #6C3CE1" }}>{children}</h3>;
}

function List({ items }: { items: string[] }) {
  return <ul style={{ margin: "6px 0 16px", paddingLeft: "0", listStyle: "none" }}>{items.map((item, i) => <li key={i} style={{ display: "flex", gap: "8px", marginBottom: "8px", alignItems: "flex-start", lineHeight: "1.6", color: "#B0B0D0", fontSize: "14px" }}><span style={{ color: "#6C3CE1", fontSize: "8px", marginTop: "6px", flexShrink: 0 }}>◆</span><span>{item}</span></li>)}</ul>;
}

function Table({ headers, rows }: { headers: string[]; rows: string[][] }) {
  return (
    <div style={{ margin: "12px 0 20px", borderRadius: "10px", overflow: "hidden", border: "1px solid rgba(255,255,255,0.08)" }}>
      <div style={{ display: "grid", gridTemplateColumns: headers.length === 3 ? "minmax(100px, 1fr) minmax(120px, 1.5fr) 2fr" : "minmax(140px, 1fr) 2fr", background: "rgba(108,60,225,0.08)" }}>
        {headers.map((h, i) => <div key={i} style={{ padding: "8px 12px", fontSize: "10px", fontWeight: "700", color: "#6C3CE1", textTransform: "uppercase", letterSpacing: "0.08em", borderRight: i < headers.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none" }}>{h}</div>)}
      </div>
      {rows.map((row, i) => (
        <div key={i} style={{ display: "grid", gridTemplateColumns: headers.length === 3 ? "minmax(100px, 1fr) minmax(120px, 1.5fr) 2fr" : "minmax(140px, 1fr) 2fr", background: i % 2 === 0 ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.1)", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
          {row.map((cell, j) => <div key={j} style={{ padding: "8px 12px", fontSize: "13px", color: "#B0B0D0", borderRight: j < row.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none", wordBreak: "break-word" }}>{cell}</div>)}
        </div>
      ))}
    </div>
  );
}

function FileBlock({ files }: { files: { path: string; desc: string }[] }) {
  return (
    <div style={{ margin: "12px 0 20px", padding: "16px 20px", background: "rgba(0,0,0,0.2)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "12px" }}>
      {files.map((f, i) => (
        <div key={i} style={{ padding: "8px 0", borderBottom: i < files.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none" }}>
          <code style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "11px", color: "#6C3CE1", display: "block", marginBottom: "2px", wordBreak: "break-all" }}>{f.path}</code>
          <span style={{ fontSize: "12px", color: "#6B7280", lineHeight: "1.4" }}>{f.desc}</span>
        </div>
      ))}
    </div>
  );
}

function CodeBlock({ children }: { children: string }) {
  return <div style={{ padding: "12px 16px", background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "8px", fontFamily: "'JetBrains Mono', monospace", fontSize: "13px", color: "#6C3CE1", marginBottom: "20px", wordBreak: "break-all" }}>{children}</div>;
}

function CodeExample({ label, children }: { label: string; children: React.ReactNode }) {
  return <div style={{ padding: "12px 16px", background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "8px", marginTop: "10px" }}><p style={{ margin: "0 0 4px", fontSize: "10px", color: "#6B6B8A", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.1em" }}>{label}</p><p style={{ margin: 0, fontSize: "13px", color: "#B0B0D0", lineHeight: "1.7", fontStyle: "italic" }}>{children}</p></div>;
}

function Flow({ num, title, children }: { num: number; title: string; children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", gap: "12px", marginBottom: "20px" }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
        <div style={{ width: "28px", height: "28px", borderRadius: "50%", background: "rgba(108,60,225,0.15)", color: "#6C3CE1", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "11px", fontWeight: "700" }}>{num}</div>
        {num < 10 && <div style={{ width: "1px", flex: 1, background: "rgba(255,255,255,0.06)", marginTop: "4px" }} />}
      </div>
      <div style={{ paddingBottom: "2px" }}>
        <h4 style={{ fontSize: "13px", fontWeight: "700", color: "#F1F3F8", margin: "0 0 4px" }}>{title}</h4>
        <p style={{ fontSize: "13px", color: "#6B7280", margin: 0, lineHeight: "1.6" }}>{children}</p>
      </div>
    </div>
  );
}

function Step({ n, title, children }: { n: number; title: string; children: React.ReactNode }) {
  return (
    <div className="gl" style={{ display: "flex", gap: "12px", marginBottom: "12px", padding: "16px 20px", borderRadius: "12px" }}>
      <div style={{ width: "30px", height: "30px", borderRadius: "50%", background: "linear-gradient(135deg, rgba(108,60,225,0.2), rgba(0,212,255,0.2))", color: "#6C3CE1", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "13px", fontWeight: "700", flexShrink: 0 }}>{n}</div>
      <div>
        <h4 style={{ fontSize: "14px", fontWeight: "700", color: "#F1F3F8", margin: "0 0 6px" }}>{title}</h4>
        <p style={{ fontSize: "13px", color: "#6B7280", margin: 0, lineHeight: "1.6" }}>{children}</p>
      </div>
    </div>
  );
}

function MiniCard({ color, title, text }: { color: string; title: string; text: string }) {
  return <div className="gl" style={{ padding: "16px 20px", borderRadius: "12px", marginBottom: "10px" }}><h4 style={{ fontSize: "14px", fontWeight: "700", color, margin: "0 0 6px" }}>{title}</h4><p style={{ fontSize: "13px", color: "#6B7280", margin: 0, lineHeight: "1.5" }}>{text}</p></div>;
}

function GlassBox({ title, children }: { title: string; children: React.ReactNode }) {
  return <div className="gl" style={{ padding: "20px", borderRadius: "12px", marginBottom: "12px" }}><h4 style={{ fontSize: "15px", fontWeight: "700", color: "#6C3CE1", margin: "0 0 8px" }}>{title}</h4><div style={{ fontSize: "14px", color: "#B0B0D0", lineHeight: "1.7" }}>{children}</div></div>;
}

function Note({ color, children }: { color: "green" | "amber"; children: React.ReactNode }) {
  const c = color === "green" ? { bg: "rgba(16,185,129,0.08)", bdr: "3px solid rgba(16,185,129,0.3)" } : { bg: "rgba(245,158,11,0.08)", bdr: "3px solid rgba(245,158,11,0.3)" };
  return <div style={{ padding: "16px 20px", background: c.bg, borderLeft: c.bdr, borderRadius: "0 12px 12px 0", margin: "20px 0", fontSize: "13px", color: "#B0B0D0", lineHeight: "1.7" }}>{children}</div>;
}

function Tip({ icon, title, children }: { icon: string; title: string; children: React.ReactNode }) {
  return <div className="gl" style={{ display: "flex", gap: "12px", padding: "16px 20px", borderRadius: "12px", marginBottom: "10px" }}><span style={{ fontSize: "20px", flexShrink: 0, marginTop: "2px" }}>{icon}</span><div><h4 style={{ fontSize: "14px", fontWeight: "700", color: "#F1F3F8", margin: "0 0 6px" }}>{title}</h4><p style={{ fontSize: "13px", color: "#6B7280", margin: 0, lineHeight: "1.6" }}>{children}</p></div></div>;
}
