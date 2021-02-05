import { render, fireEvent } from '@testing-library/react';
import CoinFlipper from './CoinFlipper';

beforeEach(function() {
	jest.spyOn(Math, 'random').mockReturnValueOnce(0.25).mockReturnValueOnce(0.75);
});

afterEach(function() {
	Math.random.mockRestore();
});

it('renders without crashing', function() {
	render(<CoinFlipper />);
});

it('matches snapshot', function() {
	const { asFragment } = render(<CoinFlipper />);
	expect(asFragment()).toMatchSnapshot();
});

it('does not show coin on page load', function() {
	const { queryByAltText } = render(<CoinFlipper />);

	// expect the coin not to show heads or tails
	expect(queryByAltText('heads')).not.toBeInTheDocument();
	expect(queryByAltText('tails')).not.toBeInTheDocument();
});

it('does show coin after flip button is clicked', function() {
	const { queryByAltText, getByText } = render(<CoinFlipper />);

	// expect the coin not to show heads or tails on load
	expect(queryByAltText('heads')).not.toBeInTheDocument();
	expect(queryByAltText('tails')).not.toBeInTheDocument();

	// flip the coin
	const btn = getByText('Flip Me');
	fireEvent.click(btn);

	// expect the coin to show heads
	expect(queryByAltText('heads')).toBeInTheDocument();
	expect(queryByAltText('tails')).not.toBeInTheDocument();
});

it('updates the total count accurately', function() {
	const { getByText } = render(<CoinFlipper />);

	// expect the total to start at 0
	expect(getByText('of 0 flips', { exact: false })).toBeInTheDocument();

	// flip the coin
	const btn = getByText('Flip Me');
	fireEvent.click(btn);

	// expect the to be one
	expect(getByText('of 1 flips', { exact: false })).toBeInTheDocument();
});

it('updates heads and tails count accurately', function() {
	const { getByText } = render(<CoinFlipper />);

	// expect the count to be zero for heads and tails
	expect(getByText('0 heads', { exact: false })).toBeInTheDocument();
	expect(getByText('0 tails', { exact: false })).toBeInTheDocument();

	// flip the coin
	const btn = getByText('Flip Me');
	fireEvent.click(btn);

	// expect the count to be one for heads and zero for tails
	expect(getByText('1 heads', { exact: false })).toBeInTheDocument();
	expect(getByText('0 tails', { exact: false })).toBeInTheDocument();

	// flip the coin again
	fireEvent.click(btn);

	// expect the count to be one for heads and one for tails
	expect(getByText('1 heads', { exact: false })).toBeInTheDocument();
	expect(getByText('1 tails', { exact: false })).toBeInTheDocument();
});
