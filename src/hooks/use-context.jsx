import { createContext, useContext, useState } from "react";
import "../index.css";

//estado inicial
const globalState = {
	title: "O título do contexto",
	body: "O corpo do contexto",
	counter: 0,
};

// criando o contexto
const GlobalState = createContext();

const Div = () => {
	return (
		<>
			<H />
			<P />
		</>
	);
};

// atualizando os estado e lendo o estado do global state
const P = () => {
	const {
		contextState: { body },
		setContextState,
	} = useContext(GlobalState);
	return (
		<p
			onClick={() =>
				setContextState((prevState) => {
					return {
						...prevState,
						counter: prevState.counter + 1,
					};
				})
			}
			onKeyUp={() => {}}
		>
			{body}
		</p>
	);
};

// pegando o valor do global state
const H = () => {
	const {
		contextState: { title, counter },
	} = useContext(GlobalState);
	return (
		<h>
			{title} {counter}
		</h>
	);
};

// se fosse em arquivos separados eu queria um componente que seria um wrapper do meu app
export function UseContextHook() {
	const [contextState, setContextState] = useState(globalState);

	// passando os valores do estado para o provider para serem utilizados nos componentes filhos
	return (
		<GlobalState.Provider value={{ contextState, setContextState }}>
			<div className="App">
				<Div />
			</div>
		</GlobalState.Provider>
	);
}
