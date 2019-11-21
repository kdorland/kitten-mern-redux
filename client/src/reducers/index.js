import { combineReducers } from 'redux';

function kittens(state = [], action) {
    switch (action.type) {
        case 'ADD_KITTEN': {
            // input: action.name
            const kitten = {
                id: action.id,
                name: action.name,
                hobbies: action.hobbies,
            };
            return [...state, kitten];
        }
        case 'ADD_HOBBY': {
            const newKittenState = [...state];
            const index = newKittenState.findIndex(kitten => kitten.id === action.kittenId);
            newKittenState[index].hobbies.push(action.hobby);
            return newKittenState;
        }
        default: return state;
    }
}

export default combineReducers({
    kittens
})
