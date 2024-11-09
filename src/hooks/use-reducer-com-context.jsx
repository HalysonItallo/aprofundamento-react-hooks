import { createContext, useContext, useReducer, useRef } from "react";
import "../index.css";

const actions = {
	CHANGE_TITLE: "CHANGE_TITLE",
};

const globalState = {
	title: "O título do contexto",
	body: "O corpo do contexto",
	counter: 0,
};

const Context = createContext();

function reducerApp(state, action) {
	switch (action.type) {
		case actions.CHANGE_TITLE: {
			return { ...state, title: action.payload };
		}
	}

	return { ...state };
}

function AppContext({ children }) {
	// criando o useReducer para um logica mais avançada de estados
	const [state, dispatch] = useReducer(reducerApp, globalState);

	// Função mais especifica pra mudança de estado
	const changeTitle = (payload) => {
		dispatch({ type: actions.CHANGE_TITLE, payload });
	};

	return (
		<Context.Provider value={{ state, changeTitle }}>
			{children}
		</Context.Provider>
	);
}

// component que pode acesar o valor do meu contexto
function ChildComponent() {
	const { state, changeTitle } = useContext(Context);
	const inputRef = useRef(null);

	return (
		<div className="App">
			<h1>{state.title}</h1>
			<input
				type="text"
				ref={inputRef}
				placeholder="digite para aparecer o valor"
			/>
			<button type="button" onClick={() => changeTitle(inputRef.current.value)}>
				Mostrar valor
			</button>
		</div>
	);
}

export function UseReducerComContextHook() {
	return (
		<AppContext>
			<ChildComponent />
		</AppContext>
	);
}
