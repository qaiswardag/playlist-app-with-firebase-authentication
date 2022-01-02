import { ref } from 'vue';
import { projectAuth } from '@/firebase/config';

// refs check if user is logged in or null
const user = ref(projectAuth.currentUser);
//
// true if request is going on
const isPending = ref(false);

// auth changes
projectAuth.onAuthStateChanged((_user) => {
  // if user logs in, out or sign up this callback function will fire
  // and then we get access to the _user
  // if user is not logged in or if user logs out then _user will be null

  // true if request is going on
  isPending.value = ref(true);

  user.value = _user || undefined;

  // true if request is going on
  isPending.value = false;
});

const getUser = () => {
  return { user, isPending };
};

export default getUser;
