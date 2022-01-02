<template>
  <h1>My account</h1>
  <div v-if="user">
    <section class="account">
      <div class="container">
        <h3>Hi, {{user.displayName}}</h3>
        <h3>Email: {{user.email}}</h3>
        <router-link :to="{name: 'EditAccount'}" class="btn mb-4">Edit account</router-link>
        <hr>
        <h3>Your Playlists</h3>
        <h4>Edit, delete or add new songs to existing playlists:</h4>
        <router-link :to="{name: 'CreatePlaylist'}" class="btn mb-4">Create a new Playlist</router-link>
        <div v-if="documents" class="grid grid--2-cols">
          <div v-if="!documents.length">
            <h4>You do not have any playlists yet.</h4>
            <router-link :to="{name: 'CreatePlaylist'}" class="btn">Create playlist</router-link>
          </div>
          <article v-for="document in documents" :key="document.id" class="single-document-in-documents" :data-id="document.id">
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
      </div>
    </section>
  </div>
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
    //
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
      updateUserError,
      updateUserIsPending,
      confirmMessageUsername,
      confirmMessageEmail,
    }
  },
}
</script>

<style scoped>
.edit-account {
  max-width: 90rem;
}

.email-not-verified {
  color: red !important;
}
.email-verified {
  color: green !important;
}
</style>