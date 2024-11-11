import { useEffect, useRef, useState } from "react";

function useMeuHook(callback, delay = 1000) {
	const savedCallback = useRef();

	useEffect(() => {
		savedCallback.current = callback;
	}, [callback]);

	useEffect(() => {
		const interval = setInterval(() => {
			savedCallback.current();
		}, delay);

		return () => clearInterval(interval);
	}, [delay]);
}

export function MeuHookCustomizado() {
	const [counter, setCounter] = useState(0);
	const [delay, setDelay] = useState(1000);
	const [incrementor, setIncrementor] = useState(100);

	useMeuHook(() => setCounter((prevState) => prevState + 1), delay);

	return (
		<div className="App">
			<h1>Meu contador: {counter}</h1>
			<h1>Delay {delay}</h1>
			<button
				type="button"
				onClick={() => setDelay((prevState) => prevState + incrementor)}
			>
				+{incrementor}
			</button>
			<button
				type="button"
				onClick={() => setDelay((prevState) => prevState - incrementor)}
			>
				-{incrementor}
			</button>
			<input
				type="text"
				onChange={(e) => setIncrementor(Number(e.target.value))}
			/>
		</div>
	);
}
