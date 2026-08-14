export default function Sidebar() {
  return (
    <aside className="sidebar">

      {/* BRAND */}
      <div className="brand">
        <div className="brand-mark">
          V
        </div>

        <div>
          <h1>VELOCITY</h1>
          <p>Internal Developer Platform</p>
        </div>
      </div>

      {/* NAVIGATION */}
      <nav className="sidebar-nav">

        <div className="nav-section">
          <span>PLATFORM</span>

          <div className="menu-item active">
            <span className="nav-icon">⌂</span>
            <span>Dashboard</span>
          </div>

          <div className="menu-item">
            <span className="nav-icon">＋</span>
            <span>Provision</span>
          </div>

          <div className="menu-item">
            <span className="nav-icon">◇</span>
            <span>Service Catalog</span>
          </div>

          <div className="menu-item">
            <span className="nav-icon">◷</span>
            <span>Requests</span>
          </div>
        </div>

        <div className="nav-section">
          <span>INSIGHTS</span>

          <div className="menu-item">
            <span className="nav-icon">⌁</span>
            <span>Analytics</span>
          </div>
        </div>

        <div className="nav-section">
          <span>SETTINGS</span>

          <div className="menu-item">
            <span className="nav-icon">⚙</span>
            <span>Settings</span>
          </div>
        </div>

      </nav>

      {/* PLATFORM STATUS */}
      <div className="sidebar-footer">
        <div className="platform-status">

          <span className="status-dot"></span>

          <div>
            <strong>Platform Online</strong>
            <small>All systems operational</small>
          </div>

        </div>
      </div>

    </aside>
  );
}