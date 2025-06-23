import { createStore, action, computed } from 'easy-peasy';

const savedUsers = JSON.parse(localStorage.getItem('users')) || [];

const store = createStore({
  users: savedUsers,

  addUser: action((state, payload) => {
    state.users.push(payload);
    localStorage.setItem('users', JSON.stringify(state.users));
  }),

  setUsers: action((state, payload) => {
    state.users = payload;
    localStorage.setItem('users', JSON.stringify(payload));
  }),

  removeUser: action((state, email) => {
    state.users = state.users.filter(user => user.email !== email);
    localStorage.setItem('users', JSON.stringify(state.users));
  }),

  emailExists: computed(state => email =>
    state.users.some(user => user.email.toLowerCase() === email.toLowerCase())
  ),
});

export default store;