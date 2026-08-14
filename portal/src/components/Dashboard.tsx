export default function Dashboard() {
  return (
    <div className="dashboard">

      <div className="metric-card">
        <h3>Applications</h3>
        <h1>42</h1>
      </div>

      <div className="metric-card">
        <h3>Pending</h3>
        <h1>3</h1>
      </div>

      <div className="metric-card">
        <h3>Healthy</h3>
        <h1>18</h1>
      </div>

      <div className="metric-card">
        <h3>Avg Provision</h3>
        <h1>2m</h1>
      </div>

    </div>
  );
}