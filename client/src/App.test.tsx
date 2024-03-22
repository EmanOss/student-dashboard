import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders translation button', () => {
  render(<App />);
  const fabElement = screen.getByRole('button', { name: 'translate' });
  expect(fabElement).toBeInTheDocument();
});
