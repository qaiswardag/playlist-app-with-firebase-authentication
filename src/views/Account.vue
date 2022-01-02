<template>
  <h1>My account</h1>
  <h2>Hi, {{user.displayName}}</h2>
  <h2>Email:{{user.email}}</h2>
  <section>
    <form @submit.prevent="handleSubmit" class="edit-account">
      <h2>Edit your account</h2>
      <label>Display name:</label>
      <input type="text" :placeholder="user.displayName" required v-model="displayNewName">

      <label>Email:</label>
      <input type="email" :placeholder="user.email" v-model="displayNewEmail">

      <div class="submit">
        <button v-if="!isPending" class="btn mt-4">Update</button>
        <button v-if="isPending" class="btn mt-4">Updating...</button>
      </div>
      <div class="error">{{error}}</div>
    </form>
  </section>
  <!--  -->
  <!--  -->
  <!--  -->
  <!--  -->
  <h3>My Playlists</h3>
  <section>

    <div v-if="documents" class="grid grid--2-cols">
      <article v-for="document in documents" :key="document.id" class="single-document-in-documents" :data-id="document.id">
        <!-- <router-link :to="{name: 'PlaylistDetails', params: {id: `${document.title.toLowerCase().replace(/ /g, '+')}+${document.id}`}}" class="document-thumbnail"> -->
        <router-link :to="{name: 'PlaylistDetails', params: {id: `${document.id}`}}" class="document-thumbnail">
          <img :src="document.coverUrl" :alt="document.title" class="single-document-cover-image">
        </router-link>
        <div class="entry">
          <div class="entry-header">
          </div>
          <span class="single-document-user-name">{{document.userName}}</span>
          <div class="single-document-cat-links">
            <div v-for="category in document.categories" :key="category">
              <router-link :to="{name: 'CategoryLists', params: {id: category.toLowerCase().replace(/ /g, '+')}}">
                <a href="#" class="single-document-cat-link">{{category}}</a>
              </router-link>
            </div>
          </div>
          <router-link :to="{name: 'PlaylistDetails', params: {id: `${document.id}`}}">
            <h3 class="single-document-title">{{document.title}}</h3>
          </router-link>

          <p class="single-document-description">{{document.description}}</p>
          <p class="single-document-cat-link">Songs: {{document.songs.length}}</p>
        </div>
      </article>

    </div>
  </section>

</template>

<script>
import getUser from '@/composables/getUser'
import useUser from '@/composables/useUser'
import getCollection from '@/composables/getCollection'
import { ref } from '@vue/reactivity'
export default {
  setup() {
    // get user details
    const { user, isPending, error } = getUser()
    // update user details
    const { updateUserDetails } = useUser()
    //
    //
    const displayNewName = ref('')
    const displayNewEmail = ref('')

    //
    //
    //  handle submit update user
    const handleSubmit = async function () {
      await updateUserDetails(displayNewName.value, displayNewEmail.value)
      displayNewName.value = ''
      user.displayName = displayNewName.value
    }

    // get documents
    const { documents } = getCollection('playlists', [
      'userId',
      '==',
      user.value.uid,
    ])

    return {
      documents,
      user,
      isPending,
      error,
      displayNewName,
      displayNewEmail,
      handleSubmit,
    }
  },
}
</script>

<style scoped>
.edit-account {
  max-width: 90rem;
}
</style>