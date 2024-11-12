import {
	forwardRef,
	useImperativeHandle,
	useLayoutEffect,
	useRef,
	useState,
} from "react";

export function UseImperativeHandleHook() {
	const [counted, setCounted] = useState([1, 2, 3, 4, 5]);
	const ref = useRef();

	// Ele segura todas as alterações do dom virtual e só libera as alteraçoes quando ele terminar de executar,
	//já o useEffect não ele libera quando estiver pronto.
	// useLayoutEffect(() => {
	// 	divRef.current.divRef.scrollTop = divRef.current.divRef.scrollHeight;
	// });

	function handleClick() {
		setCounted((c) => [...c, +c.slice(-1) + 1]);

		//Eu tou pegando os metodos do componente filho pelo componente pai usando a referencia
		ref.current.handleClick();
	}

	return (
		<div className="App">
			<button onClick={handleClick} type="button">
				{counted.slice(-1)}
			</button>
			<DiplayCounted counted={counted} ref={ref} />
		</div>
	);
}

export const DiplayCounted = forwardRef(function DiplayCounted(
	{ counted },
	ref,
) {
	const [rand, setRand] = useState(0);
	const divRef = useRef();

	function handleClick() {
		setRand(Math.random().toFixed(2));
	}

	// Passando os elementos para a refencia do pai
	useImperativeHandle(ref, () => ({
		handleClick,
		divRef,
	}));

	return (
		<div
			ref={divRef}
			style={{ height: "500px", width: "500px", overflow: "scroll" }}
		>
			{counted.map((c) => (
				<p onClick={handleClick} onKeyUp={() => {}} key={`c-${c}`}>
					{c} ++ {rand}
				</p>
			))}
		</div>
	);
});
