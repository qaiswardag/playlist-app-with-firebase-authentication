<template>
  <h1 class="heading-primary">Signup</h1>
  <section>
    <div class="container">
      <form @submit.prevent="handleSubmit">
        <h3>Sign up</h3>
        <label>Display name:</label>
        <input type="text" placeholder="display name" required v-model="displayName">

        <label>Email:</label>
        <input type="email" placeholder="Email" required v-model="email">

        <label>Password:</label>
        <input type="password" placeholder="password" required v-model="password">

        <div class="terms">
          <input type="checkbox">
          <label>Accept terms and conditions</label>
        </div>
        <div class="submit">
          <button v-if="!isPending" class="btn mt-4">Signup</button>
          <button v-if="isPending" class="btn mt-4">Signing up...</button>
          <p class="mt-2">Already have an account? <router-link :to="{name: 'Login'}">Log in.</router-link>
          </p>
        </div>
        <div class="error">{{error}}</div>
      </form>
    </div>
  </section>
</template>

<script>
import { ref } from '@vue/reactivity'
import useSignup from '@/composables/useSignup'
import { useRouter } from 'vue-router'
export default {
  setup() {
    //   use signup
    const { error, signup, isPending } = useSignup()
    // refs
    const displayName = ref('')
    const email = ref('')
    const password = ref('')
    const router = useRouter()

    // handle submit form
    const handleSubmit = async function () {
      // call signup function
      const res = await signup(email.value, password.value, displayName.value)
      console.log('see', res)
      if (!error.value) {
        router.push({ name: 'Account' })
      }
    }
    //
    return { displayName, email, password, handleSubmit, error, isPending }
  },
}
</script>

<style>
</style>