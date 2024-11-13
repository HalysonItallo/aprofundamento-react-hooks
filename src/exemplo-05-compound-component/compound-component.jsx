import {
	Children,
	cloneElement,
	createContext,
	useContext,
	useState,
} from "react";

const s = {
	style: {
		fontSize: "60px",
	},
};

// Tem que ter cuidado com esse tipo de mudanças de dados

// function Parent({ children }) {
// 	return Children.map(children, (child) => {
// 		const newChild = cloneElement(child, { ...s });
// 		return newChild;
// 	});
// }

//Maneira menos indicada de fazer 

// function TurnOnOff({ children }) {
// 	const [isOn, setIsOn] = useState(false);
// 	const onTurn = () => setIsOn((s) => !s);

// 	return Children.map(children, (child) => {
// 		return cloneElement(child, {
// 			isOn,
// 			onTurn,
// 		});
// 	});
// }

const TurnOnOffContext = createContext();

function TurnOnOff({ children }) {
	const [isOn, setIsOn] = useState(false);
	const onTurn = () => setIsOn((s) => !s);

	return (
		<TurnOnOffContext.Provider value={{ isOn, onTurn }}>
			{children}
		</TurnOnOffContext.Provider>
	);
}

const TurnedOn = ({ children }) => {
	const { isOn } = useContext(TurnOnOffContext);

	return isOn ? children : null;
};

const TurnedOff = ({ children }) => {
	const { isOn } = useContext(TurnOnOffContext);

	return !isOn ? children : null;
};

const TurnButton = () => {
	const { isOn, onTurn } = useContext(TurnOnOffContext);

	return (
		<button type="button" onClick={() => onTurn()}>
			Turn {isOn ? "ON" : "OFF"}
		</button>
	);
};

export function CompoundComponent() {
	return (
		<div className="App">
			<TurnOnOff>
				<TurnedOn>As coisas que vão acontecer quando estiver ON.</TurnedOn>
				<TurnedOff>As coisas que vão acontecer quando estiver OFF.</TurnedOff>
				<TurnButton />
			</TurnOnOff>
		</div>
	);
}
