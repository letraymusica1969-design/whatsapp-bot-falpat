export default function Home() {
  return (
    <main
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        fontFamily: "system-ui",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <h1>WhatsApp AI Bot</h1>
        <p>Bot activo y funcionando</p>
        <p style={{ color: "#666" }}>
          Webhook: <code>/api/webhook</code>
        </p>
      </div>
    </main>
  );
}
