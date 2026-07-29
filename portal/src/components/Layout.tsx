import type { ReactNode } from "react";

import Sidebar from "./Sidebar";
import Header from "./Header";

type Props = {
  children: ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <div className="layout">

      <Sidebar />

      <main className="content">

        <Header />

        {children}

      </main>

    </div>
  );
}