import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import App from './App.js';
import { renderWithProviders } from './test/test-utils.js';

describe('App', () => {
  it('renders without crashing', () => {
    renderWithProviders(<App />);
  });

  it('renders the home page heading', () => {
    renderWithProviders(<App />);

    expect(
      screen.getByRole('heading', {
        name: 'MediCare+ Doctor Appointment System',
      }),
    ).toBeInTheDocument();
  });
});
