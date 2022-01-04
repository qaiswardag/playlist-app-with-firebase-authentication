<template>
  <div class="home">
    <section>
      <div class="container">

        <div v-if="!user">
          <h3>Sign up and create Playlists with your favorite songs.</h3>
          <router-link class="btn" :to="{name: 'Signup'}">Sign up</router-link>
        </div>
        <div v-if="user">
          <h3>Browse through the best Playlists from other users.</h3>
          <router-link class="btn" :to="{name: 'CreatePlaylist'}">Create new Playlist</router-link>
        </div>

        <div v-if="error" class="error">
          <h3>Could not fetch the data.</h3>
        </div>

        <div v-if="documents" class="grid grid--2-cols mt-6">
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
      </div>
    </section>
  </div>
</template>

<script>
import getCollection from '../composables/getCollection'
import getUser from '@/composables/getUser'
import { ref } from '@vue/reactivity'
//
//
//
//
//
//

export default {
  name: 'Home',
  setup() {
    //
    const { user } = getUser()
    const { error, documents } = getCollection('playlists')
    //

    // return
    return { error, documents, user }
  },
}
</script>