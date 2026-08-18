import { NavLink } from 'react-router';

export function Header() {
  return (
    <header className="app-header">
      <div className="app-header__inner">
        <NavLink to="/" className="app-header__brand">
          MediCare+
        </NavLink>
        <nav className="app-header__nav">
          <NavLink to="/" className="app-header__link" end>
            Home
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
