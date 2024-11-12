import { useCallback, useEffect, useState } from "react";

function useAsync(asyncFunction, shouldRun) {
	const [state, setState] = useState({
		result: null,
		error: null,
		status: "idle",
	});

	const run = useCallback(async () => {
		setState((prevState) => ({
			...prevState,
			status: "pending",
		}));

		return asyncFunction()
			.then((response) => {
				setState((prevState) => ({
					...prevState,
					result: response,
					status: "success",
				}));
			})
			.catch((err) => {
				setState((prevState) => ({
					...prevState,
					error: err,
				}));
			});
	}, [asyncFunction]);

	useEffect(() => {
		if (shouldRun) {
			run();
		}
	}, [shouldRun, run]);

	return { reFetch: run, ...state };
}

async function fetchData() {
	const data = await fetch("https://jsonplaceholder.typicode.com/posts");

	const json = await data.json();

	return json;
}

export function Home() {
	const { reFetch, result, error, status } = useAsync(fetchData, true);

	function handleClick() {
		reFetch();
	}

	if (status === "idle") {
		return <pre>idle: Nada executando</pre>;
	}

	if (status === "pending") {
		return <pre>pending: Loading...</pre>;
	}

	if (status === "error") {
		return <pre>error: {error.message}</pre>;
	}

	if (status === "success") {
		return (
			<pre onClick={handleClick} onKeyDown={() => {}}>
				success: {JSON.stringify(result, null, 2)}
			</pre>
		);
	}

	return "IXIII";
}
