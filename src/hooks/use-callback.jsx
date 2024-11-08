import { memo, useCallback, useState } from "react";
import reactLogo from "../assets/react.svg";
import "../index.css";

//faz com que um componente filho que
// não precisa mudar apenas renderize uma vez e fique na memória
const Button = memo(({ onClick }) => {
	console.log("Filho renderizou");
	return (
		<button type={"button"} onClick={() => onClick(10)}>
			Increment
		</button>
	);
});

export function UseCallbackHook() {
	const [counter, setCounter] = useState(0);

	//serve para guardar na memoria o valor de um função,
	//geralmente para funções pesadas e outra coisa é bom usar o prevState
	//e não colocar no array de dependencia de uma estado.
	const incrementCounter = useCallback((num) => {
		setCounter((prevState) => prevState + num);
	}, []);

	console.log("Pai renderizou");

	return (
		<div className="App">
			<header className="App-header">
				<img src={reactLogo} className={"App-logo"} alt="logo" />
				<p>c1 {counter}</p>
				<Button onClick={incrementCounter} />
			</header>
		</div>
	);
}
