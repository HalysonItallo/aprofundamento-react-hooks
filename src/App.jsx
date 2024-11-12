import { Posts } from "./exemplo-01/components/Posts";
import { CounterProvider } from "./exemplo-01/contexts/CounterProvider";
import { PostsProvider } from "./exemplo-01/contexts/PostsProvider";

export default function App() {
	return (
		<PostsProvider>
			<CounterProvider>
				<Posts />
			</CounterProvider>
		</PostsProvider>
	);
}
