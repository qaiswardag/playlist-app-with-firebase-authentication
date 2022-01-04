import { createStore } from 'vuex';
import getUser from '../composables/getUser';
//
import useUser from '@/composables/useUser';

export default createStore({
  state: {
    userCurrent: getUser(),
  },
  mutations: {
    updateUser() {
      const {
        updateUserDetails,
        error: updateUserError,
        isPending: updateUserIsPending,
        confirmMessageUsername,
        confirmMessageEmail,
      } = useUser();

      await updateUserDetails(displayNewName.value, displayNewEmail.value);
      displayNewEmail.value = '';
      user.email = displayNewEmail.value;
    },
  },
  actions: {},
  modules: {},
});
