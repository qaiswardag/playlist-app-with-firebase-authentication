import { createStore } from 'vuex';
import { projectAuth } from '../firebase/config';
import useUser from '@/composables/useUser';

import getUser from '@/composables/getUser';

// get user details
const { user } = getUser();

const { updateUserDetails } = useUser();

const store = createStore({
  state: {
    user: null,
    // authIsReady: look do we know the user who just loaded the page is logged in or logged out
    // until we do that until we get the response - we can't really say if user is logged in or not
    // so until that response the authIsReady is false
    // when we get the response then we gonna change the authIsReady to true
    authIsReady: false,
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
    },
    //
    setAuthIsReady(state, payload) {
      state.authIsReady = payload;
    },
    //
  },
  actions: {
    async editUser(context, payload) {
      const { displayNewName, displayNewEmail } = payload;
      await updateUserDetails(displayNewName, displayNewEmail);
      // get current user
      const responseUser = await user;
      // set user state
      context.commit('setUser', responseUser);
    },
  },
});

// the callback function inside onAuthStateChanged will fire everytime there is a change in authentication state
// and inside the callback function as an argument we get access to a user object
// when the application first loads in the browser and say what is the user status.
// if user is not logged in then the user object will be null
// wait until auth is ready

// const unsub = onAuthStateChanged(auth, (user) => {
//   store.commit('setAuthIsReady', true);
//   store.commit('setUser', user);
//   unsub();
// });
//
//
//
const unsub = projectAuth.onAuthStateChanged((user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.Use
    store.commit('setAuthIsReady', true);
    store.commit('setUser', user);
    // ...
  } else {
    console.log('user is signed out');
  }
  unsub();
});
//
//
//
//
//
// when we load to the page we need to run code telling firebase are we logged in or not?
//  they respond with a response. If we are logged in the response will contain the user
// then we can update user state with current user

// export the store
export default store;
