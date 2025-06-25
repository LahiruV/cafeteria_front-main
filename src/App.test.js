import { render, screen } from '@testing-library/react';
import App from './App';

test('renders brand text Caravan Fresh', () => {
  render(<App />);
  const brandText = screen.getByText(/Caravan Fresh/i);
  expect(brandText).toBeInTheDocument();
});
