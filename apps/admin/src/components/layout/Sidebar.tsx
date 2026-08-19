import { NavLink } from 'react-router';

const NAV_ITEMS = [
  { label: '📊 Dashboard', to: '/' },
  { label: '📅 Appointments', to: '/appointments' },
  { label: '🩺 Doctors', to: '/doctors' },
  { label: '🧑 Patients', to: '/patients' },
  { label: '🏥 Departments', to: '/departments' },
  { label: '🗓 Schedules', to: '/schedules' },
  { label: '💬 Messages', to: '/messages' },
  { label: '🔔 Notifications', to: '/notifications' },
  { label: '💳 Payments', to: '/payments' },
  { label: '📈 Reports', to: '/reports' },
  { label: '🧷 Audit Logs', to: '/audit-logs' },
  { label: '👥 Users & Roles', to: '/users-roles' },
  { label: '⚙ Settings', to: '/settings' },
] as const;

export function Sidebar() {
  return (
    <aside className="sidebar" id="sidebar">
      <div className="sidebar__header">
        <span className="sidebar__brand">MediCare+ Admin</span>
      </div>
      <nav className="sidebar__nav" aria-label="Admin navigation">
        {NAV_ITEMS.map(({ label, to }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              ['sidebar__link', isActive ? 'sidebar__link--active' : ''].join(' ')
            }
          >
            {label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
