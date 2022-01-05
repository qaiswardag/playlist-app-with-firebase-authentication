import { createStore } from 'vuex';
import getUser from '../composables/getUser';
//
import useUser from '@/composables/useUser';

export default createStore({
  state: {
    userCurrent: getUser(),
  },
});
