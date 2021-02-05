import { render, screen } from '@testing-library/react';
import App from './App';

test('renders coin flipper', () => {
	render(<App />);
	const h1 = screen.getByText(/Lets Flip a Coin!/i);
	expect(h1).toBeInTheDocument();
});
