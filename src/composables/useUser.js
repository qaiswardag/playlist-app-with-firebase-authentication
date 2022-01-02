import getUser from '@/composables/getUser';
import { ref } from 'vue';
//
//
const useUser = function () {
  const { user } = getUser();
  const isPending = ref(false);
  const error = ref(null);
  const confirmMessageUsername = ref(null);
  const confirmMessageEmail = ref(null);
  //
  const updateUserDetails = async function (displayNewName, displayNewEmail) {
    if (!displayNewName && !displayNewEmail) {
      error.value = 'Nothing to change. Enter new display name or email.';
      return;
    }
    error.value = '';
    // try
    try {
      // set isPending to true
      isPending.value = true;
      //
      if (displayNewName) {
        await user.value.updateProfile({ displayName: displayNewName });
        confirmMessageUsername.value = `Display name changed to: ${displayNewName}`;
        isPending.value = false;
      }
      if (displayNewEmail) {
        await user.value.updateEmail(displayNewEmail);
        confirmMessageEmail.value = `Email have been changed to: ${displayNewEmail}`;
        isPending.value = false;
      }
      //
      //
    } catch (err) {
      isPending.value = false;
      error.value = err.message;
    }
    //
  };

  return {
    updateUserDetails,
    error,
    isPending,
    confirmMessageUsername,
    confirmMessageEmail,
  };
};

export default useUser;
