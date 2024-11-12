import { useDebugValue, useEffect, useState } from "react";

function useMediaQuery(queryValueInPixels) {
	const [match, setMatch] = useState(false);

	// Serve para formatar o nosso custom hook no debug do react
	useDebugValue(`(min-width: ${queryValueInPixels}px)`, (name) => {
		return `${name} adicionando`;
	});

	useEffect(() => {
		let isMounted = true;
		const matchMedia = window.matchMedia(
			`(min-width: ${queryValueInPixels}px)`,
		);

		const handleChange = () => {
			if (!isMounted) return;
			setMatch(!!matchMedia.matches);
		};

		matchMedia.addEventListener("change", handleChange);
		setMatch(!!matchMedia.matches);

		return () => {
			isMounted = false;
			matchMedia.removeEventListener("change", handleChange);
		};
	}, [queryValueInPixels]);

	return match;
}

export function UseDebugValueHook() {
	const huge = useMediaQuery(980);
	return <h1>{huge ? "tela grande" : "tela pequena"}</h1>;
}
