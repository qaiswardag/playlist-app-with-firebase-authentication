<template>
  <h1 class="heading-primary">Edit account</h1>
  <div v-if="user">
    <section class="account">
      <div class="container">
        <h3>Hi, {{user.displayName}}</h3>
        <h3>Email: {{user.email}}</h3>
        <router-link :to="{name: 'Account'}" class="btn mb-4">Back to dashboard</router-link>
        <hr>
        <h3>Edit your account</h3>
        <form @submit.prevent="handleSubmit" class="edit-account">
          <label>Display name:</label>
          <input type="text" :placeholder="user.displayName" v-model="displayNewName">
          <div class="error email-verified">{{confirmMessageUsername}}</div>

          <label>Email:</label>
          <input type="email" :placeholder="user.email" v-model="displayNewEmail">
          <div :class="{'email-not-verified': !user.emailVerified, 'email-verified': user.emailVerified}" class="error">{{user.emailVerified? 'Email is verified.' : 'Email is not verified.'}}</div>
          <div class="error email-verified">{{confirmMessageEmail}}</div>

          <div class="submit">
            <button v-if="!updateUserIsPending" class="btn mt-4">Update</button>
            <button v-if="updateUserIsPending" class="btn mt-4">Updating...</button>
          </div>
          <div class="error">{{updateUserError}}</div>
          <div class="error email-verified">{{confirmMessageUsername}}</div>
          <div class="error email-verified">{{confirmMessageEmail}}</div>
        </form>
      </div>
    </section>
  </div>
</template>

<script>
import getUser from '@/composables/getUser'
import useUser from '@/composables/useUser'
import { ref } from '@vue/reactivity'
export default {
  setup() {
    // get user details
    const { user, isPending, error } = getUser()
    //
    const displayNewName = ref('')
    const displayNewEmail = ref('')
    const {
      updateUserDetails,
      error: updateUserError,
      isPending: updateUserIsPending,
      confirmMessageUsername,
      confirmMessageEmail,
    } = useUser()

    //
    //  handle submit update user
    // update user details
    const handleSubmit = async function () {
      await updateUserDetails(displayNewName.value, displayNewEmail.value)
      displayNewEmail.value = ''
      user.email = displayNewEmail.value

      //
      displayNewName.value = ''
      user.displayName = displayNewName.value
    }

    return {
      user,
      isPending,
      error,
      displayNewName,
      displayNewEmail,
      handleSubmit,
      updateUserError,
      updateUserIsPending,
      confirmMessageUsername,
      confirmMessageEmail,
    }
  },
}
</script>

<style scoped>
.email-not-verified {
  color: red !important;
}
.email-verified {
  color: green !important;
}
</style>