import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import "../index.css";

function Post({ title, body, onClick }) {
	console.log("o filho renderizou");

	return (
		<div className="post">
			<h1 onClick={() => onClick(title)} onKeyDown={() => onClick(title)}>
				{title}
			</h1>
			<p>{body}</p>
			<button
				type="button"
				onClick={() => {
					console.log("cliquei");
				}}
			>
				cliquei
			</button>
		</div>
	);
}

export function UseRefHook() {
	console.log("Pai renderizou");

	const [posts, setPosts] = useState([]);
	const [value, setValue] = useState([]);

	// crio a referencia do component
	const input = useRef(null);

	useEffect(() => {
		fetch("https://jsonplaceholder.typicode.com/posts")
			.then((res) => res.json())
			.then((posts) => setPosts(posts));
	}, []);

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		input.current.focus();
		console.log(input.current);
	}, [value]);

	// crio um useCallback para poder passar no useMemo
	const handleClick = useCallback((newValue) => {
		setValue(newValue);
	}, []);

	return (
		<div className="App">
			<input
				ref={input} //passo a referencia para o component input
				type="search"
				value={value}
				onChange={(e) => setValue(e.target.value)}
			/>

			{posts.length === 0 && <h1>Não foi possível carregar os posts</h1>}

			{useMemo(() => {
				// Coloca a função de useMemo para colocar na memoria o componente e não ter que re-rederizar tudo novamente
				return (
					posts.length > 0 &&
					posts.map((post) => (
						<Post
							key={post.id}
							title={post.title}
							body={post.body}
							onClick={handleClick}
						/>
					))
				);
				// Dependecias que re-rederizam os componentes internos
			}, [posts, handleClick])}
		</div>
	);
}
