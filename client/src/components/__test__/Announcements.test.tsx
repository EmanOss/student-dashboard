import React from 'react';
import { render } from '@testing-library/react';
import Announcements from '../Announcements';

describe('Announcements component', () => {
  it('renders the heading', () => {
    const { getByRole } = render(<Announcements />);
    const headingElement = getByRole('heading', { name: /announcements/i });
    expect(headingElement).toBeInTheDocument();
  });
});
