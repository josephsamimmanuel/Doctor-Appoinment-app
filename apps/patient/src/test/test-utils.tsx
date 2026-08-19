import { render as rtlRender, type RenderOptions } from '@testing-library/react';
import type { ReactElement, ReactNode } from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';

import { store } from '../app/store.js';

export * from '@testing-library/react';

interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  route?: string;
}

function AllProviders({
  children,
  route = '/',
}: {
  children: ReactNode;
  route?: string;
}) {
  return (
    <Provider store={store}>
      <MemoryRouter initialEntries={[route]}>{children}</MemoryRouter>
    </Provider>
  );
}

export function render(ui: ReactElement, options: CustomRenderOptions = {}) {
  const { route, ...renderOptions } = options;

  return rtlRender(ui, {
    wrapper: ({ children }) => (
      <AllProviders route={route}>{children}</AllProviders>
    ),
    ...renderOptions,
  });
}

export function renderWithProviders(
  ui: ReactElement,
  options: Omit<RenderOptions, 'wrapper'> = {},
) {
  return rtlRender(ui, {
    wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
    ...options,
  });
}
