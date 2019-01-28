import { Reducer } from 'redux'
//import { HeroesState, HeroesActionTypes } from './types'

export interface TestState {
    data: string[],
    errors: any,
    loading: boolean
}

// Type-safe initialState!
const initialState: TestState = {
    data: [],
    errors: undefined,
    loading: false
}

// Thanks to Redux 4's much simpler typings, we can take away a lot of typings on the reducer side,
// everything will remain type-safe.
const testReducer: Reducer<any> = (state = initialState, action) => {
    switch (action.type) {
        case 'INCREMENT': {
            console.log('INCREMENT')
            return { ...state, loading: true }
        }
        case 'INCREMENT_ASYNC': {
            console.log('INCREMENT_ASYNC')
            return { ...state, loading: false }
        }
        default: {
            return state
        }
    }
}

// Instead of using default export, we use named exports. That way we can group these exports
// inside the `index.js` folder.
export { testReducer }