import { useState } from "react";
import reactLogo from "../assets/react.svg";
import "../index.css";

export function UseStateHook() {
	const [reverse, setReverse] = useState(false);

	return (
		<div className="App">
			<header className="App-header">
				<img
					src={reactLogo}
					className={reverse ? "App-logo" : "App-logo-reverse"}
					alt="logo"
				/>
				<p>
					Edit <code>src/App.jsx</code> and save to reload.
				</p>
				<a
					className="App-link"
					href="https://reactjs.org"
					target="_blank"
					rel="noopener noreferrer"
				>
					Learn React
				</a>
				<button type="button" onClick={() => setReverse(!reverse)}>
					Change direction
				</button>
			</header>
		</div>
	);
}
