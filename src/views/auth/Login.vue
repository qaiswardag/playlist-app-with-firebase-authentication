<template>
  <h1>Login</h1>
  <section>
    <form @submit.prevent="handleSubmit">
      <h3>Log in</h3>
      <label>Email:</label>
      <input type="email" placeholder="Email" required v-model="email">

      <label>Password:</label>
      <input type="password" placeholder="password" required v-model="password">

      <div class="terms">
        <input type="checkbox">
        <label>Accept terms and conditions</label>
      </div>
      <div class="submit">
        <button v-if="!isPending" class="btn mt-4">Log in</button>
        <button v-if="isPending" class="btn mt-4 disabled">Logging in...</button>
      </div>
      <div class="error">{{error}}</div>
    </form>
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