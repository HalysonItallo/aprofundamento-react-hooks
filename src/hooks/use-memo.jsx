import { useEffect, useMemo, useState } from "react";
import "../index.css";

function Post({ title, body }) {
	console.log("o filho renderizou");

	return (
		<div className="post">
			<h1>{title}</h1>
			<p>{body}</p>
		</div>
	);
}

export function UseMemoHook() {
	console.log("Pai renderizou");

	const [posts, setPosts] = useState([]);
	const [value, setValue] = useState([]);

	useEffect(() => {
		fetch("https://jsonplaceholder.typicode.com/posts")
			.then((res) => res.json())
			.then((posts) => setPosts(posts));
	}, []);

	return (
		<div className="App">
			<input
				type="search"
				value={value}
				onChange={(e) => setValue(e.target.value)}
			/>
			{useMemo(() => {
				if (posts.length === 0) {
					return <h1>Não foi possível carregar os posts</h1>;
				}

				return posts.map((post) => {
					return <Post key={post.id} title={post.title} body={post.body} />;
				});
			}, [posts])}
		</div>
	);
}
