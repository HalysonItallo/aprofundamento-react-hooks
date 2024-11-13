import { Suspense, lazy, useState } from "react";

async function loadImportComponent() {
	const importedComponent = await import("./components/component");

	return importedComponent;
}

export const LazyComponent = lazy(async () => {
	const { LazyComponent } = await loadImportComponent();

	return {
		default: LazyComponent,
	};
});

export function Home() {
	const [show, setShow] = useState(false);

	return (
		<div className="App">
			<button
				onFocus={loadImportComponent}
				type="button"
				onClick={() => setShow((show) => !show)}
			>
				Show
			</button>
			<Suspense fallback={<p>... Loading</p>}>
				{show && <LazyComponent />}
			</Suspense>
		</div>
	);
}
