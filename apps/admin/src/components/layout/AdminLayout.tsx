import { Outlet } from 'react-router';

import { Sidebar } from './Sidebar.js';
import { TopBar } from './TopBar.js';

export function AdminLayout() {
  return (
    <div className="admin-layout">
      <Sidebar />
      <div className="admin-layout__body">
        <TopBar />
        <main className="admin-layout__main">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
