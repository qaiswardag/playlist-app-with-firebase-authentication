<template>
  <header class="header">
    <div class="logo">
      <router-link :to="{name: 'Home'}" class="logo">logo</router-link>
    </div>
    <nav class="main-nav">
      <ul class="main-nav-list">
        <router-link :to="{name: 'Home'}">home</router-link>
        <div v-if="user">
          <router-link :to="{name: 'CreatePlaylist'}">create playlist</router-link>
        </div>
        <div v-if="!user">
          <router-link :to="{name: 'Signup'}">sign up</router-link>
        </div>
        <div v-if="!user">
          <router-link :to="{name: 'Login'}">log in</router-link>
        </div>
        <div v-if="user">
          <router-link :to="{name: 'Account'}" class="display-name">{{user.displayName}}</router-link>
        </div>
        <div v-if="user">
          <button @click="handleClick">log out</button>
        </div>
      </ul>
    </nav>
  </header>
</template>

<script>
import useLogout from '@/composables/useLogout'
import getUser from '@/composables/getUser'
import { useRouter } from 'vue-router'

export default {
  setup() {
    const { error, logout, isPending } = useLogout()
    const router = useRouter()
    // log out option
    const handleClick = async function () {
      await logout()
      // send user to home after success logout
      router.push({ name: 'Login' })
      if (!error.value) {
        console.log('you logged out successfully')
      }
    }
    // s
    // check user status
    const { user } = getUser()

    // export
    return { handleClick, user, isPending }
  },
}
</script>
