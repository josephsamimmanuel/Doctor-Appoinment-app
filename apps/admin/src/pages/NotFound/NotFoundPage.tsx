import { Link } from 'react-router';

export function NotFoundPage() {
  return (
    <section className="page page--not-found">
      <h1>404</h1>
      <p className="page__subtitle">This page does not exist.</p>
      <Link to="/" className="page__link">
        Return to Dashboard
      </Link>
    </section>
  );
}
