import { Outlet } from 'react-router';

import { Header } from './Header.js';

export function AppLayout() {
  return (
    <>
      <Header />
      <main className="app-main">
        <Outlet />
      </main>
    </>
  );
}
