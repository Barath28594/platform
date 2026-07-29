import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <div className="layout">

      <aside className="sidebar">
        <h1>🚀 Velocity</h1>

        <p className="subtitle">
          Internal Developer Platform
        </p>

        <nav>
          <div className="menu-item active">🏠 Dashboard</div>
          <div className="menu-item">🚀 Provision</div>
          <div className="menu-item">📦 Catalog</div>
          <div className="menu-item">📄 Requests</div>
          <div className="menu-item">⚙ Settings</div>
        </nav>

      </aside>

      <main className="content">

        <header className="header">
          <div>
            <h2>Provision Application</h2>
            <p>
              Accelerating Developer Delivery
            </p>
          </div>
        </header>

        {children}

      </main>

    </div>
  );
}