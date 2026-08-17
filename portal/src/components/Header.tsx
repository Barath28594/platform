export default function Header() {
  return (
    <header className="topbar">
      <div className="topbar-content">
        <div className="topbar-title">
          <span className="eyebrow">INTERNAL DEVELOPER PLATFORM</span>

          <h2>Provision Application</h2>

          <p>
            Build secure cloud infrastructure in minutes.
          </p>
        </div>

        <div className="topbar-actions">
          <div className="environment-pill">
            <span className="status-dot" />
            <span>Platform Healthy</span>
          </div>

          <div className="avatar">
            BK
          </div>
        </div>
      </div>
    </header>
  );
}