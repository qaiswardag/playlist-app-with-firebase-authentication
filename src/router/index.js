import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Signup from '../views/auth/Signup.vue';
import Login from '../views/auth/Login.vue';
import Account from '../views/Account.vue';
import EditAccount from '../views/auth/EditAccount.vue';
import CreatePlaylist from '../views/playlists/CreatePlaylist.vue';
import PlaylistDetails from '../views/playlists/PlaylistDetails.vue';
import CategoryLists from '../views/playlists/CategoryLists.vue';

// route guard
import { projectAuth } from '../firebase/config';
const requireAuth = (to, from, next) => {
  let user = projectAuth.currentUser;
  // if we don't have a user
  if (!user) {
    next({ name: 'Login' });
  } else {
    next();
  }
};
const authUsers = (to, from, next) => {
  let user = projectAuth.currentUser;
  // if we have a user
  if (user) {
    next({ name: 'Account' });
  } else {
    next();
  }
};

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup,
    beforeEnter: authUsers,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    beforeEnter: authUsers,
  },
  {
    path: '/account',
    name: 'Account',
    component: Account,
    beforeEnter: requireAuth,
  },
  {
    path: '/edit-account',
    name: 'EditAccount',
    component: EditAccount,
    beforeEnter: requireAuth,
  },
  {
    path: '/playlists/create-playlist',
    name: 'CreatePlaylist',
    component: CreatePlaylist,
    beforeEnter: requireAuth,
  },
  {
    path: '/playlists/playlist/:id',
    name: 'PlaylistDetails',
    component: PlaylistDetails,
    props: true,
  },
  {
    path: '/category/:id',
    name: 'CategoryLists',
    component: CategoryLists,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
