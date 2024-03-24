import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import HomePage from '../HomePage';
import { MemoryRouter } from 'react-router-dom';

// mocking the HOC requireAuth
jest.mock('../../../HOCs/requireAuth', () => {
  return jest.fn().mockImplementation((Component: any) => {
    return (props: any) => {
      return <Component {...props} />;
    };
  });
});

// Mock document.cookie behavior
const mockCookie = {
  isAuthenticated: true,
};
jest.mock('react-cookie', () => ({
  ...jest.requireActual('react-cookie'),
  useCookies: () => [mockCookie, jest.fn()],
}));

describe('HomePage component', () => {
  it('Clicking sidebar link navigates to the corresponding page', async () => {
    render(
      <MemoryRouter initialEntries={['/dashboard']}>
        <HomePage />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByTestId('links-container')).toBeInTheDocument();
    });
    fireEvent.click(screen.getByRole('button', { name: /Quizzes/i }));
    await waitFor(() => {
      expect(screen.getByRole('heading', { name: /Quizzes/i })).toBeInTheDocument();
    });

    fireEvent.click(screen.getByRole('button', { name: /Announcements/i }));
    await waitFor(() => {
      expect(screen.getByRole('heading', { name: /Announcements/i })).toBeInTheDocument();
    });
  });
});
/**
 * TESTS TO BE ADDED
 * translation button changes language
 * logout button navigates to login page
 */