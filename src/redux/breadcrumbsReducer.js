import { SET_CATEGORY, SET_PAGE } from './actions'

const initialState = {
	category: 'pokemons',
	page: null,
}

export const breadcrumbsReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_CATEGORY:
			return {
				...state,
				category: action.category,
			}

		case SET_PAGE:
			return {
				...state,
				page: action.page,
			}

		default:
			return state
	}
}
