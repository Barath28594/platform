export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-mark">V</div>

        <div>
          <h1>VELOCITY</h1>
          <p>Internal Developer Platform</p>
        </div>
      </div>

      <nav className="sidebar-nav">
        <div className="nav-section">
          <span>PLATFORM</span>

          <div className="menu-item active">
            <span className="nav-icon">⌂</span>
            Dashboard
          </div>

          <div className="menu-item">
            <span className="nav-icon">＋</span>
            Provision
          </div>

          <div className="menu-item">
            <span className="nav-icon">◈</span>
            Service Catalog
          </div>

          <div className="menu-item">
            <span className="nav-icon">◷</span>
            Requests
          </div>
        </div>

        <div className="nav-section">
          <span>INSIGHTS</span>

          <div className="menu-item">
            <span className="nav-icon">⌁</span>
            Analytics
          </div>

          <div className="menu-item">
            <span className="nav-icon">⚙</span>
            Settings
          </div>
        </div>
      </nav>

      <div className="sidebar-footer">
        <div className="platform-status">
          <span className="status-dot" />
          <div>
            <strong>Platform Online</strong>
            <small>All systems operational</small>
          </div>
        </div>
      </div>
    </aside>
  );
}