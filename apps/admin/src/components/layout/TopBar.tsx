export function TopBar() {
  return (
    <header className="topbar">
      <div className="topbar__left">
        <input
          id="admin-search"
          className="topbar__search"
          type="search"
          placeholder="Search records…"
          aria-label="Search records"
        />
      </div>
      <div className="topbar__right">
        <button
          id="topbar-notifications-btn"
          className="topbar__icon-btn"
          aria-label="Notifications"
          type="button"
        >
          🔔
        </button>
        <div className="topbar__user">Admin ▾</div>
      </div>
    </header>
  );
}
