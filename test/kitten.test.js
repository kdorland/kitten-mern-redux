const esmRequire = require('esm')(module);
const { kittens } = esmRequire('../client/src/reducers/kittens');
const { addKitten, addHobby } = esmRequire('../client/src/actions');

it('can add kitten', () => {
    const action = addKitten(1, "Garfield", ['sleeping', 'eating']);
    const state = kittens([], action);
    expect(state.length).toBe(1);
});

it('adds kitten name correctly', () => {
    const action = addKitten(1, "Garfield", ['sleeping', 'eating']);
    const state = kittens([], action);
    expect(state[0].name).toBe("Garfield");
});

it('adds hobby to kitten', () => {
    const action = addHobby(1, "Sleeping");
    const state = kittens([{id: 1, name: "Garfield", hobbies: []}], action);
    expect(state[0].hobbies.length).toBe(1);
});

it('adds hobby names correctly to kitten', () => {
    const action = addHobby(1, "Sleeping");
    const state = kittens([{id: 1, name: "Garfield", hobbies: []}], action);
    expect(state[0].hobbies[0]).toBe("Sleeping");
});

it('adds several hobbies correctly', () => {
    const action = addHobby(1, "Sleeping");
    let state = kittens([{id: 1, name: "Garfield", hobbies: []}], action);
    state = kittens(state, action);
    state = kittens(state, action);
    expect(state[0].hobbies.length).toBe(4); // Breaking the test!!
});

