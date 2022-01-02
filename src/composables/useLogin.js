import { ref } from 'vue';
import { projectAuth } from '../firebase/config';

const useLogin = function () {
  const error = ref(null);
  // true if request is going on
  const isPending = ref(false);
  const login = async function (email, password) {
    error.value = null;
    isPending.value = true;

    try {
      const response = await projectAuth.signInWithEmailAndPassword(
        email,
        password
      );
      error.value = null;
      isPending.value = false;
      //
      // return response
      return response;
      //
    } catch (err) {
      error.value = 'Incorrect login credentials';
      isPending.value = false;
      console.log(err.message);
    }
  };
  return { error, login, isPending };
};
//

//
export default useLogin;
