import { render, RenderOptions } from '@testing-library/react';
import { ReactElement } from 'react';

type CustomRenderOptions = Omit<RenderOptions, 'queries'>;

export function renderWithProviders(
  ui: ReactElement,
  options?: CustomRenderOptions
) {
  return render(ui, options);
}

export * from '@testing-library/react';
export { default as userEvent } from '@testing-library/user-event';
