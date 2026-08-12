export default function Header() {
  return (
    <header className="topbar">
      <div>
        <div className="eyebrow">INTERNAL DEVELOPER PLATFORM</div>

        <h2>Provision Application</h2>

        <p>
          Build secure cloud infrastructure in minutes.
        </p>
      </div>

      <div className="topbar-actions">
        <div className="environment-pill">
          <span className="status-dot" />
          Platform Healthy
        </div>

        <div className="avatar">
          BK
        </div>
      </div>
    </header>
  );
}