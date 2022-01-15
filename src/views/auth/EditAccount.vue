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
          <!-- <div class="error email-verified">{{confirmMessageUsername}}</div> -->

          <label>Email:</label>
          <input type="email" :placeholder="user.email" v-model="displayNewEmail">
          <!-- <div :class="{'email-not-verified': !user.emailVerified, 'email-verified': user.emailVerified}" class="error">{{user.emailVerified? 'Email is verified.' : 'Email is not verified.'}}</div> -->
          <!-- <div class="error email-verified">{{confirmMessageEmail}}</div> -->

          <div class="submit">
            <button class="btn mt-4">Update</button>

            <!-- <button v-if="!updateUserIsPending" class="btn mt-4">Update</button>
            <button v-if="updateUserIsPending" class="btn mt-4">Updating...</button> -->
          </div>
          <!-- <div class="error">{{updateUserError}}</div>
          <div class="error email-verified">{{confirmMessageUsername}}</div>
          <div class="error email-verified">{{confirmMessageEmail}}</div> -->
        </form>
      </div>
    </section>
  </div>
</template>

<script>
import { computed, ref } from '@vue/reactivity'
import { useStore } from 'vuex'
export default {
  setup() {
    const store = useStore()
    //
    // computed
    const user = computed(() => {
      return store.state.user
    })

    //
    const displayNewName = ref('')
    const displayNewEmail = ref('')

    //
    // handle submit update user
    // update user details
    const handleSubmit = async function () {
      await store.dispatch('editUser', {
        displayNewName: displayNewName.value,
        displayNewEmail: displayNewEmail.value,
      })
      //
      //
      //
      displayNewName.value = ''
    }

    return {
      user,
      displayNewName,
      displayNewEmail,
      handleSubmit,
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