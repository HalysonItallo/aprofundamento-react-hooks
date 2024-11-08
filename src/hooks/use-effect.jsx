import { useEffect, useState } from "react";
import reactLogo from "../assets/react.svg";
import "../index.css";

const eventFn = () => {
	console.log("h1 clicado");
};

export function UseEffectHook() {
	const [counter, setCounter] = useState(0);
	const [counter2, setCounter2] = useState(0);

	// Se comporta igual ao componentDidUpdate - executa toda vez que atualizar
	useEffect(() => {
		console.log("componentDidUpdate");
	});

	// Se comporta igual ao componentDidMount - executa 1x
	useEffect(() => {
		console.log("componentDidMount");
		document.querySelector("h1")?.addEventListener("click", eventFn);

		// componentWillAmount - limpeza
		return () => {
			document.querySelector("h1")?.removeEventListener("click", eventFn);
		};
	}, []);

	// Com dependência - excecuta toda vez que a depedência mudar
	useEffect(() => {
		console.log("Contador mudo para mim", counter);
	}, [counter]);

	return (
		<div className="App">
			<header className="App-header">
				<img src={reactLogo} className={"App-logo"} alt="logo" />
				<p>c1 {counter}</p>
				<p>c2 {counter2}</p>
				<button type={"button"} onClick={() => setCounter(counter + 1)}>
					Increment
				</button>
				<button type={"button"} onClick={() => setCounter2(counter2 + 1)}>
					Increment 2
				</button>
			</header>
		</div>
	);
}
