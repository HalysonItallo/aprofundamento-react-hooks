import { POSTS_LOADING, POSTS_SUCCESS } from "./types";

export function reducer(state, action) {
	switch (action.type) {
		case POSTS_LOADING: {
			return { ...state, loading: true };
		}
		case POSTS_SUCCESS: {
			return { ...state, posts: action.payload, loading: false };
		}
	}

	return { ...state };
}
