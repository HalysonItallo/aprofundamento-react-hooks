import { DECREMENT_COUNTER, INCREMENT_COUNTER } from "./types";

export function incrementCounter(dispatch) {
	dispatch({ type: INCREMENT_COUNTER });
}

export function decrementCounter(dispatch) {
	dispatch({ type: DECREMENT_COUNTER });
}
