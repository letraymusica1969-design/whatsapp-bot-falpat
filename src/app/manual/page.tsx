"use client";

import { useState, useEffect } from "react";

const chapters = [
  { id: "ch1", num: "01", title: "Visión General", icon: "◈" },
  { id: "ch2", num: "02", title: "Arquitectura Técnica", icon: "◈" },
  { id: "ch3", num: "03", title: "Flujo de Mensajes", icon: "◈" },
  { id: "ch4", num: "04", title: "Panel de Administración", icon: "◈" },
  { id: "ch5", num: "05", title: "Base de Conocimiento", icon: "◈" },
  { id: "ch6", num: "06", title: "Cómo Alimentar la KB", icon: "◈" },
  { id: "ch7", num: "07", title: "Configuración del Horario", icon: "◈" },
  { id: "ch8", num: "08", title: "Buenas Prácticas", icon: "◈" },
];

export default function ManualPage() {
  const [active, setActive] = useState("ch1");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        const vis = entries.filter((e) => e.isIntersecting);
        if (vis.length > 0) setActive(vis[0].target.id);
      },
      { rootMargin: "-80px 0px -55% 0px", threshold: 0 }
    );
    chapters.forEach((ch) => {
      const el = document.getElementById(ch.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  return (
    <div style={{ minHeight: "100vh", background: "#0A0A1A", color: "#FFFFFF", fontFamily: "'Inter', system-ui, -apple-system, sans-serif", lineHeight: "1.6", overflowX: "hidden" }}>

      {/* GRID BACKGROUND — exacto de herramientas-five */}
      <div style={{
        position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none",
        background: "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
        backgroundSize: "50px 50px"
      }} />

      {/* SCROLLBAR — estilo exacto herramientas-five */}
      <style>{`
        html { scrollbar-width: thin; scrollbar-color: #6C3CE1 transparent; }
        ::-webkit-scrollbar { width: 8px; height: 8px; }
        ::-webkit-scrollbar-track { background: rgba(255,255,255,0.05); border-radius: 10px; }
        ::-webkit-scrollbar-thumb { background: linear-gradient(180deg, #6C3CE1, #00D4FF); border-radius: 10px; }
        ::-webkit-scrollbar-thumb:hover { background: linear-gradient(180deg, #00D4FF, #6C3CE1); }
        .glass-card-manual {
          background: rgba(255,255,255,0.04);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255,255,255,0.08);
          box-shadow: 0 25px 50px -12px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.08);
          transition: border-color 0.3s, box-shadow 0.3s;
        }
        .glass-card-manual:hover {
          border-color: rgba(108,60,225,0.3);
          box-shadow: 0 30px 60px -12px rgba(0,0,0,0.8), 0 0 40px -10px rgba(108,60,225,0.25), inset 0 1px 0 rgba(255,255,255,0.08);
        }
        .text-gradient-title {
          background: linear-gradient(135deg, #6C3CE1, #00D4FF);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .neon-glow {
          text-shadow: 0 0 7px rgba(108,60,225,0.6), 0 0 20px rgba(108,60,225,0.3), 0 0 40px rgba(108,60,225,0.15);
        }
        .nav-link-manual {
          display: flex; align-items: center; gap: 10px; padding: 10px 14px; border-radius: 8px; font-size: 13px; color: #B0B0D0; transition: all 0.2s ease; text-decoration: none;
        }
        .nav-link-manual:hover { color: white; background: rgba(255,255,255,0.05); }
        .nav-link-manual.active {
          color: white;
          background: linear-gradient(to right, rgba(108,60,225,0.2), transparent);
          border-left: 3px solid #6C3CE1;
        }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .fade-in-up { animation: fadeInUp 0.4s ease-out; }
      `}</style>

      {/* HEADER — exacto herramientas-five */}
      <header style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 40,
        height: "56px", display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 24px",
        background: "rgba(10,10,26,0.9)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(255,255,255,0.05)"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <button onClick={() => setMobileOpen(!mobileOpen)} style={{ display: "none", padding: "6px", background: "none", border: "none", color: "#8E94A8", cursor: "pointer", fontSize: "18px" }} className="mobile-menu-btn">
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16"/></svg>
          </button>
          <a href="/" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}>
            <div style={{ width: "32px", height: "32px", borderRadius: "8px", background: "linear-gradient(135deg, #6C3CE1, #00D4FF)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px", fontWeight: "800", color: "#0A0A1A" }}>F</div>
            <span style={{ fontSize: "14px", fontWeight: "700", color: "#F1F3F8" }}>Grupo FALPAT</span>
          </a>
          <span style={{ color: "rgba(255,255,255,0.15)", fontSize: "14px" }}>/</span>
          <span style={{ fontSize: "14px", fontWeight: "600" }}>
            <span className="text-gradient-title">Manual de Uso</span>
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <span style={{ fontSize: "11px", color: "#5C6378", padding: "4px 10px", border: "1px solid rgba(108,60,225,0.15)", borderRadius: "6px", fontWeight: "600" }}>v1.0</span>
        </div>
      </header>

      <div style={{ display: "flex", paddingTop: "56px", minHeight: "100vh", position: "relative", zIndex: 1 }}>

        {/* SIDEBAR — exacto estilo herramientas-five */}
        <aside className="sidebar-glass" style={{
          position: "fixed", top: "56px", left: 0, bottom: 0, width: "260px",
          padding: "24px 16px 24px 16px", overflowY: "auto", zIndex: 30,
          background: "rgba(10,10,26,0.95)", borderRight: "1px solid rgba(255,255,255,0.05)"
        }}>
          <p style={{ fontSize: "10px", fontWeight: "700", color: "#6B6B8A", textTransform: "uppercase", letterSpacing: "0.1em", margin: "0 0 12px 14px" }}>Contenidos</p>
          <nav>
            {chapters.map((ch) => (
              <a key={ch.id} href={`#${ch.id}`} className={`nav-link-manual ${active === ch.id ? "active" : ""}`} style={{ marginBottom: "2px" }}>
                <span style={{
                  width: "24px", height: "24px", borderRadius: "6px",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "10px", fontWeight: "700", flexShrink: 0,
                  background: active === ch.id ? "rgba(108,60,225,0.2)" : "rgba(108,60,225,0.06)",
                  color: active === ch.id ? "#6C3CE1" : "#5C6378"
                }}>{ch.num}</span>
                <span style={{ fontSize: "13px" }}>{ch.title}</span>
              </a>
            ))}
          </nav>
          <div style={{ marginTop: "32px", padding: "16px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "10px", marginLeft: "6px", marginRight: "6px" }}>
            <p style={{ fontSize: "10px", color: "#6B6B8A", margin: "0 0 6px", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.05em" }}>Última actualización</p>
            <p style={{ fontSize: "13px", color: "#B0B0D0", margin: 0, fontWeight: "600" }}>17 de Julio, 2026</p>
          </div>
        </aside>

        {/* MAIN CONTENT */}
        <main style={{ marginLeft: "260px", flex: 1, maxWidth: "780px", padding: "40px 48px 80px" }}>

          {/* COVER */}
          <div style={{ marginBottom: "64px", paddingBottom: "48px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
            <div style={{ display: "inline-block", padding: "6px 14px", background: "rgba(108,60,225,0.1)", border: "1px solid rgba(108,60,225,0.2)", borderRadius: "20px", fontSize: "11px", fontWeight: "700", color: "#6C3CE1", letterSpacing: "0.05em", marginBottom: "24px" }}>DOCUMENTACIÓN TÉCNICA</div>
            <h1 className="text-gradient-title neon-glow" style={{ fontSize: "40px", fontWeight: "900", margin: "0 0 8px", lineHeight: "1.1", background: "linear-gradient(135deg, #6C3CE1, #00D4FF)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Manual de Uso</h1>
            <h2 style={{ fontSize: "20px", fontWeight: "400", margin: "0 0 24px" }}>
              <span style={{ color: "#B0B0D0" }}>WhatsApp Bot — </span>
              <span className="text-gradient-title">Grupo FALPAT</span>
            </h2>
            <p style={{ fontSize: "15px", color: "#6B7280", lineHeight: "1.7", maxWidth: "560px", margin: 0 }}>
              Documentación completa del sistema de atención automatizada por WhatsApp. Esta guía explica cómo funciona la aplicación, cómo configurarla y cómo sacarle el máximo provecho.
            </p>
          </div>

          {/* CH1: VISIÓN GENERAL */}
          <Section id="ch1" num="01" title="Visión General del Sistema">
            <p>El <strong>WhatsApp Bot de Grupo FALPAT</strong> es un asistente virtual impulsado por inteligencia artificial que atiende automáticamente las consultas de los clientes a través de WhatsApp. Está diseñado para responder preguntas sobre productos, servicios, precios, horarios y cualquier otra información relevante del negocio, sin intervención humana.</p>
            <SubTitle>Características principales</SubTitle>
            <List items={[
              "Funciona las 24 horas, los 7 días de la semana",
              "Utiliza IA generativa (Groq con Llama 3.3 70B) para respuestas naturales y contextuales",
              "Mantiene el contexto completo de cada conversación individual",
              "Se adapta a los horarios de atención configurados desde el panel admin",
              "No necesita redeployar para actualizarse — los cambios se aplican al instante",
              "Las conversaciones se guardan automáticamente en Firebase para revisión posterior"
            ]} />
            <SubTitle>Tecnologías utilizadas</SubTitle>
            <p>El sistema está construido con una arquitectura 100% gratuita compuesta por:</p>
            <Table headers={["Componente", "Tecnología", "Función"]} rows={[
              ["Motor de IA", "Groq (Llama 3.3 70B)", "Procesa consultas y genera respuestas"],
              ["Base de datos", "Firebase Firestore", "Almacena conversaciones y configuración"],
              ["Hosting", "Vercel", "Ejecuta el webhook y el panel admin"],
              ["Mensajería", "WhatsApp Business API", "Canal de comunicación con clientes"],
              ["Frontend", "Next.js 14 + React", "Panel administrativo y landing page"]
            ]} />
          </Section>

          {/* CH2: ARQUITECTURA */}
          <Section id="ch2" num="02" title="Arquitectura Técnica">
            <p>La aplicación está compuesta por varios archivos clave, cada uno con una función específica dentro del ecosistema del bot:</p>
            <FileBlock files={[
              { path: "src/app/api/webhook/route.ts", desc: "Punto de entrada principal. Recibe los mensajes de WhatsApp de Meta y coordina todo el flujo de procesamiento." },
              { path: "src/lib/ai.ts", desc: "Módulo de inteligencia artificial. Construye el system prompt dinámico desde Firebase y consulta Groq para generar respuestas." },
              { path: "src/lib/whatsapp.ts", desc: "Cliente HTTP para enviar mensajes de vuelta al usuario a través de la API de WhatsApp Business." },
              { path: "src/lib/firebase.ts", desc: "Conexión con Firebase Firestore. Soporta autenticación por JSON de service account o variables individuales." },
              { path: "src/lib/monitor.ts", desc: "Sistema de monitoreo. Registra cantidad de mensajes, lecturas y escrituras en Firebase." },
              { path: "src/app/admin/page.tsx", desc: "Panel de administración completo. Permite ver conversaciones, editar la base de conocimiento y ajustar configuración." },
              { path: ".env.local", desc: "Variables de entorno: API keys de Groq, WhatsApp, Firebase y credenciales de acceso." }
            ]} />
            <SubTitle>Datos almacenados en Firebase</SubTitle>
            <p>Toda la configuración del bot se guarda en la colección <code style={codeInline}>config</code> de Firestore, en el documento <code style={codeInline}>bot</code>. Esto incluye:</p>
            <List items={[
              "Instrucciones del sistema — Define el comportamiento y personalidad del bot",
              "Lista de productos con descripciones detalladas",
              "Lista de servicios que ofrece la empresa",
              "Preguntas frecuentes con respuestas predefinidas",
              "Datos del negocio — Nombre, dirección, teléfono, email",
              "Configuración de horarios de atención por día de la semana"
            ]} />
            <p>Las conversaciones se guardan en la colección <code style={codeInline}>conversations</code> con el número de teléfono del usuario como identificador del documento.</p>
          </Section>

          {/* CH3: FLUJO */}
          <Section id="ch3" num="03" title="Flujo de Mensajes — Paso a Paso">
            <p>Cada vez que un cliente envía un mensaje por WhatsApp, se ejecuta el siguiente proceso completo:</p>
            <Flow num={1} title="El cliente escribe por WhatsApp">Un usuario envía un mensaje al número de WhatsApp de FALPAT. Puede ser una consulta sobre un producto, un precio, un servicio, o cualquier otra pregunta sobre el negocio.</Flow>
            <Flow num={2} title="Meta reenvía el webhook">WhatsApp Business API (Meta) recibe el mensaje y lo reenvía automáticamente como una petición HTTP POST al endpoint <code style={codeInline}>/api/webhook</code> en Vercel.</Flow>
            <Flow num={3} title="El webhook procesa la solicitud">El archivo <code style={codeInline}>webhook/route.ts</code> recibe el payload de Meta, extrae el número del usuario y el texto del mensaje. Si el mensaje es una imagen o documento, lo registra pero responde indicando que solo procesa texto.</Flow>
            <Flow num={4} title="Se recupera la configuración">El sistema lee la base de conocimiento completa desde Firebase Firestore: productos, servicios, FAQ, horarios e instrucciones del bot. Los datos se cachean por 60 segundos para optimizar rendimiento.</Flow>
            <Flow num={5} title="Se construye el System Prompt">Dinámicamente se arma el prompt del sistema concatenando toda la información de la base de conocimiento. Este prompt es lo que le da &quot;personalidad&quot; y &quot;conocimiento&quot; al bot para cada conversación.</Flow>
            <Flow num={6} title="Se recupera el historial">Se buscan los mensajes anteriores de este usuario en Firebase para mantener el contexto de la conversación. La IA puede referenciar preguntas y respuestas anteriores.</Flow>
            <Flow num={7} title="Groq genera la respuesta">Se envía el system prompt completo + historial + mensaje actual al modelo Llama 3.3 70B a través de la API de Groq. La IA genera una respuesta contextualizada y basada en la información configurada.</Flow>
            <Flow num={8} title="Se envía la respuesta">El módulo <code style={codeInline}>whatsapp.ts</code> envía el texto generado como respuesta al cliente a través de la API de WhatsApp Business. Todo el proceso ocurre en pocos segundos.</Flow>
            <Flow num={9} title="Se guarda la conversación">Tanto el mensaje del usuario como la respuesta del bot se almacenan en Firebase Firestore dentro del documento de conversación correspondiente a ese número de teléfono.</Flow>
            <Flow num={10} title="Manejo de horarios">Si el mensaje llega fuera del horario laboral configurado, el bot responde igual pero agrega una nota al pie indicando que el equipo responderá durante el próximo horario hábil. Nunca se queda sin responder.</Flow>
            <Note color="green">
              El bot <strong>siempre</strong> responde con inteligencia artificial, sin importar la hora o el día. La única diferencia es que, fuera del horario laboral, se agrega un mensaje indicando que un representante se contactará durante el próximo horario hábil.
            </Note>
          </Section>

          {/* CH4: PANEL ADMIN */}
          <Section id="ch4" num="04" title="Panel de Administración">
            <p>El panel admin es el centro de control del bot. Se accede desde el botón &quot;Admin&quot; en la barra superior de la landing page, o directamente visitando:</p>
            <CodeBlock>/admin?key=falpat-stats-2024</CodeBlock>
            <SubTitle>Credenciales de acceso</SubTitle>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", margin: "0 0 32px" }}>
              <div className="glass-card-manual" style={{ padding: "20px", borderRadius: "12px" }}>
                <p style={{ margin: "0 0 6px", fontSize: "10px", color: "#6B6B8A", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.1em" }}>Usuario</p>
                <p style={{ margin: 0, fontSize: "22px", fontWeight: "800", color: "#F1F3F8", fontFamily: "'JetBrains Mono', monospace" }}>ADMIN</p>
              </div>
              <div className="glass-card-manual" style={{ padding: "20px", borderRadius: "12px" }}>
                <p style={{ margin: "0 0 6px", fontSize: "10px", color: "#6B6B8A", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.1em" }}>Clave</p>
                <p style={{ margin: 0, fontSize: "22px", fontWeight: "800", color: "#F1F3F8", fontFamily: "'JetBrains Mono', monospace" }}>123456</p>
              </div>
            </div>
            <SubTitle>Conversaciones</SubTitle>
            <p>Muestra una lista con todas las conversaciones activas del bot. Cada entrada incluye el número de teléfono del cliente, la cantidad de mensajes intercambiados, la fecha del último mensaje y un botón para expandir la conversación completa. Ideal para monitorear qué preguntan los clientes y verificar que el bot responde correctamente.</p>
            <SubTitle>Base de Conocimiento</SubTitle>
            <p>Permite editar en tiempo real toda la información que el bot utiliza para responder. Los cambios se guardan directamente en Firebase y se reflejan al instante, sin necesidad de redeployar. Contiene cinco sub-secciones:</p>
            <List items={[
              "Instrucciones del Bot — El comportamiento general (tono, idioma, reglas)",
              "Productos — Lista de productos con nombre y descripción detallada",
              "Servicios — Catálogo de servicios que ofrece la empresa",
              "Preguntas Frecuentes — Pares de pregunta-respuesta para consultas comunes",
              "Datos del Negocio — Nombre, dirección, teléfono, email y sitio web"
            ]} />
            <SubTitle>Configuración</SubTitle>
            <p>Ajustes generales del sistema. Permite modificar los datos de contacto del negocio, el horario de atención por día de la semana, y ver indicadores básicos de uso del sistema.</p>
          </Section>

          {/* CH5: BASE DE CONOCIMIENTO */}
          <Section id="ch5" num="05" title="Base de Conocimiento — Secciones">
            <p>Cada sección de la base de conocimiento alimenta directamente el comportamiento del bot. A continuación se detalla qué contiene cada una y cómo influye en las respuestas.</p>

            <SubTitle>5.1 Instrucciones del Bot</SubTitle>
            <div className="glass-card-manual" style={{ padding: "24px", borderRadius: "12px", marginBottom: "32px" }}>
              <p>Es el <strong>texto más importante</strong> de toda la base de conocimiento. Define la &quot;personalidad&quot; del asistente: cómo habla, qué puede y qué no puede hacer, y qué reglas debe seguir.</p>
              <List items={[
                "El tono de comunicación (formal, casual, cercano, profesional)",
                "El idioma (español rioplatense, español neutro, etc.)",
                "Reglas de negocio (nunca inventar precios, siempre derivar cotizaciones)",
                "Instrucciones de fallback (qué hacer cuando no sabe la respuesta)",
                "Formato de las respuestas (breves, detalladas, con o sin emojis)"
              ]} />
              <div style={{ padding: "16px 20px", background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "8px", marginTop: "4px" }}>
                <p style={{ margin: "0 0 6px", fontSize: "10px", color: "#6B6B8A", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.1em" }}>Ejemplo de instrucción</p>
                <p style={{ margin: 0, fontSize: "14px", color: "#B0B0D0", lineHeight: "1.7", fontStyle: "italic" }}>&quot;Sos el asistente virtual de Grupo FALPAT, empresa de hormigones. Respondé siempre en español rioplatense, de forma amable y profesional. No inventes precios; ante consultas de precio, derivá al equipo de ventas. Si el cliente necesita algo que no sabés, decile que un representante lo contactará pronto.&quot;</p>
              </div>
            </div>

            <SubTitle>5.2 Productos</SubTitle>
            <div className="glass-card-manual" style={{ padding: "24px", borderRadius: "12px", marginBottom: "32px" }}>
              <p>Lista completa de los productos que vende FALPAT. Cada producto tiene un <strong>nombre</strong> y una <strong>descripción detallada</strong>. El bot utiliza esta información para responder preguntas específicas sobre cada producto.</p>
              <p style={{ marginBottom: "12px" }}>Campos de cada producto:</p>
              <FieldTable fields={[
                { name: "Nombre", desc: "Identificador corto del producto (ej: Hormigón Proyectado)" },
                { name: "Descripción", desc: "Detalle completo: composición, usos, ventajas, aplicaciones, especificaciones técnicas" }
              ]} />
            </div>

            <SubTitle>5.3 Servicios</SubTitle>
            <div className="glass-card-manual" style={{ padding: "24px", borderRadius: "12px", marginBottom: "32px" }}>
              <p>Catálogo de servicios que ofrece la empresa. Cuando un cliente pregunta &quot;¿qué hacen?&quot; o &quot;¿qué servicios prestan?&quot;, el bot consulta esta sección para dar una respuesta completa. Ejemplos: servicio post-venta, alquiler de mixer, bombas pluma, laboratorio, carga en planta.</p>
            </div>

            <SubTitle>5.4 Preguntas Frecuentes (FAQ)</SubTitle>
            <div className="glass-card-manual" style={{ padding: "24px", borderRadius: "12px", marginBottom: "32px" }}>
              <p>Pares de <strong>pregunta + respuesta</strong> para las consultas más comunes. El bot utiliza este apartado para dar respuestas rápidas y consistentes.</p>
              <FieldTable fields={[
                { name: "Pregunta", desc: "La consulta tal cual la haría el cliente (ej: \"¿Hacen envíos a zona sur?\")" },
                { name: "Respuesta", desc: "La respuesta ideal que el bot debe dar (ej: \"Sí, realizamos entregas en obra en todo GBA.\")" }
              ]} />
            </div>

            <SubTitle>5.5 Datos del Negocio</SubTitle>
            <div className="glass-card-manual" style={{ padding: "24px", borderRadius: "12px", marginBottom: "32px" }}>
              <p>Información de contacto de Grupo FALPAT. El bot usa estos datos cuando el cliente pregunta &quot;¿dónde están?&quot;, &quot;¿cuál es el teléfono?&quot; o &quot;¿cómo los contacto?&quot;.</p>
              <List items={["Nombre del negocio", "Dirección física completa", "Número de teléfono", "Correo electrónico", "Sitio web (si aplica)"]} />
            </div>

            <SubTitle>5.6 Configuración de Horarios</SubTitle>
            <div className="glass-card-manual" style={{ padding: "24px", borderRadius: "12px" }}>
              <p>Define los horarios de atención de la empresa. El bot usa esta información para adaptar sus respuestas según el momento del día.</p>
              <List items={[
                "En horario laboral: responde normalmente y sugiere contacto humano para consultas complejas",
                "Fuera de horario laboral: responde con IA y agrega una nota de aviso al pie",
                "El huso horario se configura en el código (America/Argentina/Buenos_Aires)"
              ]} />
              <div style={{ marginTop: "16px", padding: "16px 20px", background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "8px" }}>
                <p style={{ margin: "0 0 4px", fontSize: "10px", color: "#6B6B8A", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.1em" }}>Configuración por defecto</p>
                <p style={{ margin: 0, fontSize: "14px", color: "#B0B0D0" }}>Lunes a Viernes: 8–17hs · Sábados: 8–14hs · Domingos: cerrado</p>
              </div>
            </div>
          </Section>

          {/* CH6: CÓMO ALIMENTAR */}
          <Section id="ch6" num="06" title="Cómo Alimentar la Base de Conocimiento">
            <p>Para que el bot funcione correctamente, es fundamental cargar y mantener actualizada la información. Seguí estos pasos en orden:</p>
            <Step n={1} title="Ingresar al Panel Admin">Hacé click en el botón &quot;Admin&quot; en la barra superior de la landing page. Ingresá con las credenciales indicadas en la sección 4 de este manual (ADMIN / 123456).</Step>
            <Step n={2} title="Ir a la solapa 'Base de Conocimiento'">Una vez dentro del panel, seleccioná la solapa &quot;Base de Conocimiento&quot;. Ahí vas a encontrar todas las secciones editables del bot.</Step>
            <Step n={3} title="Completar las Instrucciones del Bot">Escribí cómo querés que se comporte el asistente. Definí el tono, el idioma, y las reglas que debe seguir. Este es el paso más importante porque define la personalidad del bot.</Step>
            <Step n={4} title="Cargar Productos y Servicios">Agregá cada producto y servicio haciendo click en &quot;+ Agregar&quot;. Completá el nombre y una descripción lo más detallada posible.</Step>
            <Step n={5} title="Crear Preguntas Frecuentes">Escribí las preguntas que más recibís de los clientes junto con la respuesta ideal. Esto ayuda al bot a responder de forma precisa y consistente.</Step>
            <Step n={6} title="Completar Datos del Negocio">Cargá la información de contacto: nombre, dirección, teléfono y email. Así el bot puede brindar estos datos cuando el cliente los solicite.</Step>
            <Step n={7} title="Guardar y Probar">Hacé click en &quot;Guardar&quot;. Los cambios se aplican al instante. Para probar, escribí al número del bot desde tu celular.</Step>
            <Note color="amber">
              <strong>No hace falta redeployar.</strong> Los cambios en la base de conocimiento se aplican al instante. El bot lee la configuración de Firebase en cada mensaje (con un cache de 60 segundos). No es necesario hacer commit ni deployar a Vercel.
            </Note>
          </Section>

          {/* CH7: HORARIOS */}
          <Section id="ch7" num="07" title="Configuración del Horario">
            <p>El sistema de horarios permite que el bot se adapte a los momentos del día. La configuración se realiza desde la sección de <strong>Configuración</strong> del Panel Admin.</p>
            <SubTitle>Cómo funciona la lógica de horarios</SubTitle>
            <List items={[
              "El bot siempre responde — nunca se queda sin contestar a ninguna consulta",
              "En horario laboral, responde con normalidad y sugiere contacto humano para cotizaciones",
              "Fuera de horario laboral, agrega un aviso indicando que el equipo lo contactará pronto",
              "El sistema usa el huso horario de America/Argentina/Buenos_Aires"
            ]} />
            <SubTitle>Ejemplo de comportamiento</SubTitle>
            <div className="glass-card-manual" style={{ padding: "24px", borderRadius: "12px", margin: "12px 0 24px" }}>
              <div style={{ marginBottom: "20px" }}>
                <p style={{ margin: "0 0 8px", fontSize: "10px", color: "#6B6B8A", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.1em" }}>Mensaje del cliente (martes 22:30hs)</p>
                <div style={{ padding: "12px 16px", background: "rgba(108,60,225,0.06)", borderLeft: "3px solid #6C3CE1", borderRadius: "0 8px 8px 0", fontSize: "14px", color: "#F1F3F8", fontStyle: "italic" }}>
                  &quot;Hola, ¿cuánto sale el metro cúbico de hormigón f&apos;c=250?&quot;
                </div>
              </div>
              <div>
                <p style={{ margin: "0 0 8px", fontSize: "10px", color: "#6B6B8A", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.1em" }}>Respuesta del bot</p>
                <div style={{ padding: "12px 16px", background: "rgba(16,185,129,0.06)", borderLeft: "3px solid #10B981", borderRadius: "0 8px 8px 0", fontSize: "14px", color: "#B0B0D0", lineHeight: "1.7" }}>
                  &quot;Hola! Para una cotización del hormigón f&apos;c=250, te recomiendo comunicarte con nuestro equipo de ventas al +54 11-3197-2072 para obtener el precio más actualizado según el volumen y destino. ¡Cualquier otra consulta estoy para ayudarte!&quot;
                  <div style={{ marginTop: "10px", padding: "8px 12px", background: "rgba(245,158,11,0.08)", border: "1px solid rgba(245,158,11,0.15)", borderRadius: "6px", fontSize: "12px", color: "#FCD34D" }}>
                    [Nota automática: Respondido fuera del horario laboral. Un representante se contactará durante el próximo horario hábil.]
                  </div>
                </div>
              </div>
            </div>
          </Section>

          {/* CH8: BUENAS PRÁCTICAS */}
          <Section id="ch8" num="08" title="Buenas Prácticas y Consejos">
            <p>Para sacar el máximo provecho del bot, seguí estas recomendaciones:</p>
            <Tip icon="✏️" title="Sé específico en las descripciones">Cuanto más detallada sea la descripción de un producto o servicio, mejor podrá el bot responder preguntas complejas.</Tip>
            <Tip icon="💰" title="Nunca pongas precios fijos">Si los precios varían por volumen o destino, indicá que &quot;los precios dependen del volumen y destino, contactanos para una cotización&quot;.</Tip>
            <Tip icon="🔄" title="Mantené la información actualizada">Cada vez que haya un nuevo producto o cambio en los datos de contacto, actualizá la base de conocimiento. Los cambios se reflejan al instante.</Tip>
            <Tip icon="🗣️" title="Usá el lenguaje de tus clientes">Si tus clientes dicen &quot;hormigón&quot; en vez de &quot;concreto&quot;, usá las palabras que ellos usan. Así el bot conecta mejor.</Tip>
            <Tip icon="🤝" title="Configurá un buen fallback">Escribí una instrucción tipo: &quot;Si no sabés algo, decile que un representante lo contactará pronto&quot;.</Tip>
            <Tip icon="📋" title="Revisá las conversaciones">Entrá al Panel Admin → Conversaciones para ver qué preguntan los clientes y detectar qué mejorar.</Tip>
            <Tip icon="🔍" title="Monitoreá el rendimiento">Revisá periódicamente las estadísticas para asegurarte de que todo funciona correctamente.</Tip>
          </Section>

          {/* FOOTER */}
          <div style={{ marginTop: "64px", paddingTop: "32px", borderTop: "1px solid rgba(255,255,255,0.06)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <p style={{ margin: 0, fontSize: "12px", color: "#5C6378" }}>&copy; 2026 Grupo FALPAT SRL</p>
            <p style={{ margin: 0, fontSize: "12px", color: "#5C6378" }}>Documento generado automáticamente</p>
          </div>
        </main>
      </div>
    </div>
  );
}

const codeInline: React.CSSProperties = { padding: "2px 8px", background: "rgba(108,60,225,0.1)", border: "1px solid rgba(108,60,225,0.15)", borderRadius: "4px", fontSize: "13px", color: "#6C3CE1", fontFamily: "'JetBrains Mono', monospace" };

function Section({ id, num, title, children }: { id: string; num: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="glass-card-manual" style={{ marginBottom: "32px", padding: "32px", borderRadius: "16px", scrollMarginTop: "80px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "28px", paddingBottom: "16px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ width: "40px", height: "40px", borderRadius: "10px", background: "linear-gradient(135deg, #6C3CE1, #00D4FF)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px", fontWeight: "800", color: "#0A0A1A", flexShrink: 0 }}>{num}</div>
        <h2 className="text-gradient-title" style={{ fontSize: "22px", fontWeight: "800", margin: 0, background: "linear-gradient(135deg, #6C3CE1, #00D4FF)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>{title}</h2>
      </div>
      <div style={{ fontSize: "15px", color: "#B0B0D0", lineHeight: "1.8" }}>
        {children}
      </div>
    </section>
  );
}

function SubTitle({ children }: { children: React.ReactNode }) {
  return <h3 style={{ fontSize: "16px", fontWeight: "700", color: "#F1F3F8", margin: "28px 0 14px", paddingLeft: "14px", borderLeft: "3px solid #6C3CE1" }}>{children}</h3>;
}

function List({ items }: { items: string[] }) {
  return (
    <ul style={{ margin: "8px 0 20px", paddingLeft: "0", listStyle: "none" }}>
      {items.map((item, i) => (
        <li key={i} style={{ display: "flex", gap: "10px", marginBottom: "10px", alignItems: "flex-start", lineHeight: "1.6", color: "#B0B0D0" }}>
          <span style={{ color: "#6C3CE1", fontSize: "8px", marginTop: "7px", flexShrink: 0 }}>◆</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function Table({ headers, rows }: { headers: string[]; rows: string[][] }) {
  return (
    <div style={{ margin: "16px 0 24px", borderRadius: "10px", overflow: "hidden", border: "1px solid rgba(255,255,255,0.08)" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 2fr", background: "rgba(108,60,225,0.08)" }}>
        {headers.map((h, i) => <div key={i} style={{ padding: "10px 16px", fontSize: "11px", fontWeight: "700", color: "#6C3CE1", textTransform: "uppercase", letterSpacing: "0.08em", borderRight: i < headers.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none" }}>{h}</div>)}
      </div>
      {rows.map((row, i) => (
        <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 1fr 2fr", background: i % 2 === 0 ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.1)", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
          {row.map((cell, j) => <div key={j} style={{ padding: "10px 16px", fontSize: "14px", color: "#B0B0D0", borderRight: j < row.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none" }}>{cell}</div>)}
        </div>
      ))}
    </div>
  );
}

function FieldTable({ fields }: { fields: { name: string; desc: string }[] }) {
  return (
    <div style={{ margin: "8px 0", borderRadius: "8px", overflow: "hidden", border: "1px solid rgba(255,255,255,0.06)" }}>
      {fields.map((f, i) => (
        <div key={i} style={{ display: "grid", gridTemplateColumns: "140px 1fr", background: i % 2 === 0 ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.1)", borderTop: i > 0 ? "1px solid rgba(255,255,255,0.04)" : "none" }}>
          <div style={{ padding: "10px 14px", fontSize: "13px", fontWeight: "600", color: "#6C3CE1" }}>{f.name}</div>
          <div style={{ padding: "10px 14px", fontSize: "13px", color: "#6B7280" }}>{f.desc}</div>
        </div>
      ))}
    </div>
  );
}

function FileBlock({ files }: { files: { path: string; desc: string }[] }) {
  return (
    <div style={{ margin: "16px 0 24px", padding: "20px 24px", background: "rgba(0,0,0,0.2)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "12px" }}>
      {files.map((f, i) => (
        <div key={i} style={{ display: "flex", gap: "16px", padding: "10px 0", borderBottom: i < files.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none", alignItems: "flex-start" }}>
          <code style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "12px", color: "#6C3CE1", flexShrink: 0, minWidth: "280px", padding: "2px 0" }}>{f.path}</code>
          <span style={{ fontSize: "13px", color: "#6B7280", lineHeight: "1.5" }}>{f.desc}</span>
        </div>
      ))}
    </div>
  );
}

function CodeBlock({ children }: { children: string }) {
  return (
    <div style={{ padding: "14px 20px", background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "10px", fontFamily: "'JetBrains Mono', monospace", fontSize: "14px", color: "#6C3CE1", marginBottom: "24px" }}>
      {children}
    </div>
  );
}

function Flow({ num, title, children }: { num: number; title: string; children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", gap: "16px", marginBottom: "24px" }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
        <div style={{ width: "30px", height: "30px", borderRadius: "50%", background: "rgba(108,60,225,0.15)", color: "#6C3CE1", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: "700" }}>{num}</div>
        {num < 10 && <div style={{ width: "1px", flex: 1, background: "rgba(255,255,255,0.06)", marginTop: "4px" }} />}
      </div>
      <div style={{ paddingBottom: "4px" }}>
        <h4 style={{ fontSize: "14px", fontWeight: "700", color: "#F1F3F8", margin: "0 0 6px" }}>{title}</h4>
        <p style={{ fontSize: "14px", color: "#6B7280", margin: 0, lineHeight: "1.6" }}>{children}</p>
      </div>
    </div>
  );
}

function Step({ n, title, children }: { n: number; title: string; children: React.ReactNode }) {
  return (
    <div className="glass-card-manual" style={{ display: "flex", gap: "16px", marginBottom: "16px", padding: "20px 24px", borderRadius: "12px" }}>
      <div style={{ width: "34px", height: "34px", borderRadius: "50%", background: "linear-gradient(135deg, rgba(108,60,225,0.2), rgba(0,212,255,0.2))", color: "#6C3CE1", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px", fontWeight: "700", flexShrink: 0 }}>{n}</div>
      <div>
        <h4 style={{ fontSize: "15px", fontWeight: "700", color: "#F1F3F8", margin: "0 0 8px" }}>{title}</h4>
        <p style={{ fontSize: "14px", color: "#6B7280", margin: 0, lineHeight: "1.7" }}>{children}</p>
      </div>
    </div>
  );
}

function Note({ color, children }: { color: "green" | "amber"; children: React.ReactNode }) {
  const c = color === "green"
    ? { bg: "rgba(16,185,129,0.08)", border: "3px solid rgba(16,185,129,0.3)" }
    : { bg: "rgba(245,158,11,0.08)", border: "3px solid rgba(245,158,11,0.3)" };
  return (
    <div style={{ padding: "20px 24px", background: c.bg, borderLeft: c.border, borderRadius: "0 12px 12px 0", margin: "24px 0", fontSize: "14px", color: "#B0B0D0", lineHeight: "1.7" }}>
      {children}
    </div>
  );
}

function Tip({ icon, title, children }: { icon: string; title: string; children: React.ReactNode }) {
  return (
    <div className="glass-card-manual" style={{ display: "flex", gap: "16px", padding: "20px 24px", borderRadius: "12px", marginBottom: "12px" }}>
      <span style={{ fontSize: "22px", flexShrink: 0, marginTop: "2px" }}>{icon}</span>
      <div>
        <h4 style={{ fontSize: "15px", fontWeight: "700", color: "#F1F3F8", margin: "0 0 8px" }}>{title}</h4>
        <p style={{ fontSize: "14px", color: "#6B7280", margin: 0, lineHeight: "1.7" }}>{children}</p>
      </div>
    </div>
  );
}
