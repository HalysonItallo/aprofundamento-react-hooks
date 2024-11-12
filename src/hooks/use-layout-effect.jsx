import { useEffect, useLayoutEffect, useRef, useState } from "react";

export function UseLayoutEffectHook() {
	const [counted, setCounted] = useState([1, 2, 3, 4, 5]);
	const divRef = useRef();

	// Ele segura todas as alterações do dom virtual e só libera as alteraçoes quando ele terminar de executar,
	//já o useEffect não ele libera quando estiver pronto.
	useLayoutEffect(() => {
		const now = Date.now();
		// o while trava o navegador
		while (Date.now() < now + 600);
		divRef.current.scrollTop = divRef.current.scrollHeight;
	});

	function handleClick() {
		setCounted((c) => [...c, +c.slice(-1) + 1]);
	}

	return (
		<div className="App">
			<button onClick={handleClick} type="button">
				{counted.slice(-1)}
			</button>
			<div
				ref={divRef}
				style={{ height: "500px", width: "500px", overflow: "scroll" }}
			>
				{counted.map((c) => (
					<p key={`c-${c}`}>{c}</p>
				))}
			</div>
		</div>
	);
}
