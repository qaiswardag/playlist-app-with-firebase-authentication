import { ref } from 'vue';
import { projectAuth } from '../firebase/config';

const useSignup = () => {
  const error = ref(null);
  // true if request is going on
  const isPending = ref(false);

  const signup = async (email, password, displayName) => {
    error.value = null;
    // true if request is going on
    isPending.value = true;

    try {
      const response = await projectAuth.createUserWithEmailAndPassword(
        email,
        password
      );
      isPending.value = false;

      if (!response) {
        throw new Error('could not complete signup');
      }

      // method: update user profile
      await response.user.updateProfile({ displayName: displayName });
      error.value = null;

      // console log response.user

      return response;
    } catch (err) {
      error.value = err.message;
      isPending.value = false;
    }
  };

  return { error, signup, isPending };
};

export default useSignup;
