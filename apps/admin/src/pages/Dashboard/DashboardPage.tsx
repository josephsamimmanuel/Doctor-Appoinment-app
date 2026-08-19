const STAT_CARDS = [
  { label: 'Total Appointments', value: '1,248' },
  { label: "Today's Appointments", value: '156' },
  { label: 'Total Patients', value: '23,856' },
  { label: 'Total Revenue', value: '₹24,58,900' },
] as const;

export function DashboardPage() {
  return (
    <div className="page page--dashboard">
      <div className="page-header">
        <h1 className="page-header__title">Dashboard</h1>
      </div>

      <section className="stat-grid" aria-label="Key metrics">
        {STAT_CARDS.map(({ label, value }) => (
          <article key={label} className="stat-card">
            <div className="stat-card__label">{label}</div>
            <div className="stat-card__value">{value}</div>
          </article>
        ))}
      </section>

      <section className="chart-grid">
        <div className="chart-placeholder">
          <p>Appointments Overview — chart placeholder</p>
        </div>
        <div className="chart-placeholder">
          <p>By Department — chart placeholder</p>
        </div>
      </section>
    </div>
  );
}
