import { useReducer } from "react";
import "../index.css";

//estado inicial
const globalState = {
	title: "O título do contexto",
	body: "O corpo do contexto",
	counter: 0,
};

// função que vai manipular o meu estado de forma mais avançada
function reducer(state, action) {
	switch (action.type) {
		case "mudar": {
			return { ...state, title: action.payload };
		}
		case "inverter": {
			return { ...state, title: state.title.split("").reverse().join("") };
		}
	}
	return { ...state };
}

// esse hook deve ser utilizado quando temos que ter estados mais complexos
export function UseReducerHook() {
	// state: estado em si, dispatch: função que vai disparar a mudança do estado
	// dentro do reducer eu tenho uma função que vai ser responsável por modificar o meu estado e o estado inicial
	const [state, dispatch] = useReducer(reducer, globalState);

	// dentro do dispatch eu consigo passar um obj que vai ser pegado na action da função
	return (
		<div className="App">
			<h1>
				{state.title}
				{state.counter}
			</h1>

			<button
				type="button"
				onClick={() =>
					dispatch({
						type: "mudar",
						payload: new Date().toLocaleString("pt-BR"),
					})
				}
			>
				Clicar
			</button>

			<button
				type="button"
				onClick={() =>
					dispatch({
						type: "inverter",
					})
				}
			>
				Inverter
			</button>
		</div>
	);
}
