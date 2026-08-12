export default function Dashboard() {
  return (
    <section className="dashboard">
      <div className="metric-card">
        <div className="metric-top">
          <span>Applications</span>
          <span className="metric-icon">◈</span>
        </div>

        <div className="metric-value">42</div>

        <div className="metric-footer positive">
          <span>↑ 12%</span>
          <span>this month</span>
        </div>
      </div>

      <div className="metric-card">
        <div className="metric-top">
          <span>Pending</span>
          <span className="metric-icon">◷</span>
        </div>

        <div className="metric-value">3</div>

        <div className="metric-footer warning">
          <span>Requires attention</span>
        </div>
      </div>

      <div className="metric-card">
        <div className="metric-top">
          <span>Healthy</span>
          <span className="metric-icon">✓</span>
        </div>

        <div className="metric-value">18</div>

        <div className="metric-footer positive">
          <span>98.6%</span>
          <span>availability</span>
        </div>
      </div>

      <div className="metric-card">
        <div className="metric-top">
          <span>Avg Provision</span>
          <span className="metric-icon">⚡</span>
        </div>

        <div className="metric-value">2m</div>

        <div className="metric-footer">
          <span>Provisioning time</span>
        </div>
      </div>
    </section>
  );
}