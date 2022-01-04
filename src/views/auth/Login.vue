<template>
  <h1 class="heading-primary">Login</h1>
  <section>
    <div class="container">
      <form @submit.prevent="handleSubmit">
        <h3>Log in</h3>
        <label>Email:</label>
        <input type="email" placeholder="Email" required v-model="email">

        <label>Password:</label>
        <input type="password" placeholder="password" required v-model="password">

        <div class="submit">
          <button v-if="!isPending" class="btn mt-4">Log in</button>
          <button v-if="isPending" class="btn mt-4 disabled">Logging in...</button>
          <p class="mt-2">Don't have account yet? <router-link :to="{name: 'Signup'}">Sign up.</router-link>
          </p>
        </div>
        <div class="error">{{error}}</div>
      </form>
    </div>
  </section>
</template>

<script>
import { ref } from '@vue/reactivity'
import useLogin from '@/composables/useLogin'
import { useRouter } from 'vue-router'
export default {
  setup() {
    // refs
    const email = ref('')
    const password = ref('')
    const router = useRouter()

    // call useLogin function
    const { error, login, isPending } = useLogin()

    // handle submit form
    const handleSubmit = async function () {
      await login(email.value, password.value)
      if (!error.value) {
        router.push({ name: 'Account' })
      }
      //
    }
    //
    return { email, password, handleSubmit, error, isPending }
  },
}
</script>

<style>
</style>