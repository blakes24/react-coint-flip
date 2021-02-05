function flipCoin() {
	let random = Math.floor(Math.random() * 2);
	return random === 0 ? 'heads' : 'tails';
}

export { flipCoin };
