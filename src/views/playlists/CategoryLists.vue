<template>
  <main>
    <h1>{{id}}</h1>
    <section>
      <div v-if="error" class="error">
        <h3>Could not fetch the data.</h3>
      </div>
      <div v-if="documents" class="grid grid--2-cols">
        <article v-for="document in documentsInCategory" :key="document.id" class="single-document-in-documents" :data-id="document.id">
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
  </main>
</template>

<script>
import getCollection from '@/composables/getCollection'
import { computed } from '@vue/reactivity'
export default {
  props: ['id', 'test'],
  setup(props) {
    const { error, documents } = getCollection('playlists')

    const documentsInCategory = computed(() => {
      return documents.value.filter((document) => {
        return document.categories.includes('Event')
      })
    })

    console.log('see', props.id)
    console.log('see', props.test)

    return { error, documents, documentsInCategory }
  },
}
</script>

<style>
</style>