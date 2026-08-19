import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import App from './App.js';
import { renderWithProviders } from './test/test-utils.js';

describe('App', () => {
  it('renders without crashing', () => {
    renderWithProviders(<App />);
  });

  it('renders the dashboard page heading', () => {
    renderWithProviders(<App />);

    expect(
      screen.getByRole('heading', { name: 'Dashboard' }),
    ).toBeInTheDocument();
  });
});
