import { useContext, useEffect } from "react";

import {
	decrementCounter,
	incrementCounter,
} from "../contexts/CounterProvider/actions";
import { CounterContext } from "../contexts/CounterProvider/context";
import { loadPosts } from "../contexts/PostsProvider/actions";
import { PostsContext } from "../contexts/PostsProvider/context";

export function Posts() {
	const {
		postsState: { loading, posts },
		postsDispatch,
	} = useContext(PostsContext);

	const {
		counterState: { counter },
		counterDispatch,
	} = useContext(CounterContext);

	// ter cuidado com o uso de useRef que pode causar memory leak
	useEffect(() => {
		let isMounted = true;

		const fetchPosts = async () => {
			try {
				const dispatch = await loadPosts(postsDispatch);
				if (isMounted) {
					dispatch();
				}
			} catch (error) {
				console.error("Erro ao carregar os posts:", error);
			}
		};

		fetchPosts();

		return () => {
			isMounted = false;
		};
	}, [postsDispatch]);

	return (
		<div>
			<h1>{counter}</h1>
			<button type="button" onClick={() => incrementCounter(counterDispatch)}>
				+
			</button>

			<button type="button" onClick={() => decrementCounter(counterDispatch)}>
				-
			</button>
			{loading && <p>Carregando ...</p>}
			{posts.map((post) => {
				return <p key={post.id}>{post.title}</p>;
			})}
		</div>
	);
}
