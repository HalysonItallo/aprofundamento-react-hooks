import { useEffect, useRef, useState } from "react";

const isObjectEqual = (objA, objB) => {
	return JSON.stringify(objA) === JSON.stringify(objB);
};

function useFetch(url, options) {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(false);
	const urlRef = useRef(url);
	const optionsRef = useRef(options);
	const [shouldLoad, setShouldLoad] = useState(false);

	useEffect(() => {
		let changed = false;

		if (!isObjectEqual(url, urlRef.current)) {
			urlRef.current = url;
			changed = true;
		}

		if (!isObjectEqual(options, optionsRef.current)) {
			optionsRef.current = options;
			changed = true;
		}

		if (changed) {
			setShouldLoad((prevState) => !prevState);
		}
	}, [url, options]);

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		setLoading(true);
		let wait = false;
		const controller = AbortController();
		const signal = controller.signal;

		const fetchData = async () => {
			try {
				const response = await fetch(urlRef.current, {
					signal,
					...optionsRef.current,
				});

				if (!wait) {
					const jsonResult = await response.json();
					setData(jsonResult);
				}
			} catch (e) {
				console.log(e);
				throw new Error(e);
			} finally {
				if (!wait) {
					setLoading(false);
				}
			}

			return () => {
				wait = true;
				controller.abort();
			};
		};

		fetchData();
	}, [shouldLoad]);

	return [data, loading];
}

export function Home() {
	const [postId, setPostId] = useState("");

	const [data, loading] = useFetch(
		`https://jsonplaceholder.typicode.com/posts/${postId}`,
	);

	return (
		<div className="App">
			<h1>Oi</h1>
			{loading && <p>Loading ...</p>}
			{data.length > 1 ? (
				data.map((post) => {
					return (
						<p
							key={post.id}
							onClick={() => {
								console.log(post.id);
								setPostId(post.id);
							}}
							onKeyUp={() => {}}
						>
							{post.title}
						</p>
					);
				})
			) : (
				<p onClick={() => setPostId("")} onKeyUp={() => {}}>
					{data.title}
				</p>
			)}
		</div>
	);
}
