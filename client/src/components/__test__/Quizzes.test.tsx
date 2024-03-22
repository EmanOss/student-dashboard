import React from 'react';
import { render } from '@testing-library/react';
import Quizzes from '../Quizzes';

describe('Quizzes component', () => {
  it('renders the heading', () => {
    const { getByRole } = render(<Quizzes />);
    const headingElement = getByRole('heading', { name: /quizzes/i });
    expect(headingElement).toBeInTheDocument();
  });
});
