import React from 'react';
import { render, screen } from '@testing-library/react';
import {StudentDashboard} from '../StudentDashboard';

describe('StudentDashboard component', () => {
  it('renders the heading', () => {
    render(<StudentDashboard />);
    expect(screen.getByTestId('dashboard-container')).toBeInTheDocument();
  });
});
