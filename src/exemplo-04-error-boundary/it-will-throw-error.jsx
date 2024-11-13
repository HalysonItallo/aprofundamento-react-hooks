import { Component, useEffect, useState } from "react";

class ErrorBoundary extends Component {
	constructor(props) {
		super(props);
		this.state = { hasError: false };
	}
	static getDerivedStateFromError(error) {
		return { hasError: true };
	}
	componentDidCatch(error, info) {
		console.log(error, info.componentStack);
	}
	render() {
		if (this.state.hasError) {
			return <h1>Algo deu errado</h1>;
		}
		return this.props.children;
	}
}

function ThrowableComponent() {
	const [counter, setCounter] = useState(0);

	useEffect(() => {
		if (counter > 3) {
			throw new Error("Que chato !!!");
		}
	}, [counter]);

	return (
		<div>
			<button
				type="button"
				onClick={() => setCounter((counter) => counter + 1)}
			>
				Click increase {counter}
			</button>
		</div>
	);
}

export function ItWillThrowError() {
	return (
		<ErrorBoundary>
			<div className="App">
				<ThrowableComponent />
			</div>
		</ErrorBoundary>
	);
}
