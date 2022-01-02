import { ref } from 'vue';
import { projectAuth } from '../firebase/config';

const useLogout = function () {
  // refs
  const error = ref(null);
  // true if request is going on
  const isPending = ref(false);
  //
  const logout = async function () {
    error.value = null;
    // true if request is going on
    isPending.value = true;

    try {
      await projectAuth.signOut();
      isPending.value = false;
    } catch (err) {
      console.log('not able to logout');
      error.value = err.message;
      isPending.value = false;
    }
  };
  //
  // use logout function
  return { error, logout, isPending };
};
//
export default useLogout;
