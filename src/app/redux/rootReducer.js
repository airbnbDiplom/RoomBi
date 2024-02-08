// // combineReducers - для обєднання всіх Reducers в проєкті
import { combineReducers } from 'redux'
import { searchReducer } from './searchInHeader/SearchReduser'
// import { postsReducer } from "./reducer/postsReducer";
export const rootReducer = combineReducers({
	// postsReducer,
	searchReducer,
})
