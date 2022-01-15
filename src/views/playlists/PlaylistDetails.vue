<template>
  <section>
    <div class="container">
      <div class="error">{{error}}</div>
      <div v-if="document" class="document-details">
        <article class="single-document" :data-id="document.id">
          <div class="grid grid--2-cols">
            <div>
              <img :src="document.coverUrl" :alt="document.title" class="single-document-cover-image">
              <div class="entry">
                <div class="entry-header">
                </div>
                <span class="single-document-user-name">{{document.userName}}</span>

                <div class="single-document-cat-links">
                  <div v-for="category in document.categories" :key="category">
                    <router-link @click="updatePlaylistCategory(category)" :to="{name: 'CategoryLists', params: {id: category.toLowerCase().replace(/ /g, '+')}}">
                      <a href="#" class="single-document-cat-link">#{{category}}</a>
                    </router-link>
                  </div>
                </div>

                <h3 class="single-document-title">{{document.title}}</h3>
                <p class="single-document-description">{{document.description}}</p>
              </div>
            </div>

            <div class="grid grid--1-cols">
              <div class="song-list-document">
                <h3>Song list</h3>
                <div v-if="!document.songs.length">
                  <h4>No songs have been added to this playlist yet.</h4>
                  <p>Number of songs: {{document.songs.length}}</p>
                </div>

                <div v-if="document.songs.length">
                  <p>Number of songs: {{document.songs.length}}</p>
                </div>

                <div class="songs grid grid--2-cols">
                  <div v-for="song in document.songs" :key="song.id" class="single-song">
                    <button v-if="ownership" @click="handleDeleteSong(song.id)" class="btn btn--delete">Delete song</button>
                    <div class="song-details">
                      <h4>
                        Song title: {{song.title}}
                      </h4>
                      <p>
                        Artist: {{song.artist}}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div v-if="ownership" class="add-song-document">
                <h3>Add songs</h3>
                <button @click="showAddSongForm = !showAddSongForm" v-if="!showAddSongForm" class="btn">Show form</button>
                <button @click="showAddSongForm = !showAddSongForm" v-if="showAddSongForm" class="btn">Hide form</button>
                <AddSong v-if="ownership && showAddSongForm" :document="document"></AddSong>
              </div>

              <div v-if="ownership" class="edit-document">
                <h3>Delete or edit document</h3>
                <button @click="handleDelete" v-if="ownership && !isPending" class="btn">Delete document</button>
                <button @click="handleDelete" v-if="ownership && isPending" class="btn">Deleting document...</button>
              </div>
            </div>

          </div>

        </article>
      </div>
    </div>
  </section>
</template>

<script>
import useStorage from '@/composables/useStorage'
import useDocument from '@/composables/useDocument'
import getDocument from '@/composables/getDocument'
import getUser from '@/composables/getUser'
import { computed, ref } from '@vue/reactivity'
import { useRouter } from 'vue-router'
import AddSong from '@/components/AddSong.vue'
import { useStore } from 'vuex'

//
export default {
  props: ['id'],
  components: { AddSong },
  setup(props) {
    const store = useStore()
    const { error, document } = getDocument('playlists', props.id)
    const { user } = getUser()
    const { deleteDoc, isPending, updateDoc } = useDocument(
      'playlists',
      props.id
    )
    const router = useRouter()
    const { deleteImage } = useStorage()
    const showAddSongForm = ref(false)

    const ownership = computed(() => {
      return (
        document.value &&
        user.value &&
        user.value?.uid === document.value.userId
      )
    })
    //
    //
    // mutation: update playlist category
    const updatePlaylistCategory = function (category) {
      store.commit('updatePlaylistCategory', category)
    }
    //
    //

    const handleDelete = async function () {
      isPending.value = true
      isPending.value = false
      await deleteImage(document.value.filePath)
      await deleteDoc()
      isPending.value = false
      router.push({ name: 'Home' })
    }

    const handleDeleteSong = async function (id) {
      const songs = document.value.songs.filter((song) => {
        return song.id !== id
      })
      await updateDoc({ songs: songs })
    }

    return {
      updatePlaylistCategory,
      error,
      document,
      ownership,
      handleDelete,
      isPending,
      showAddSongForm,
      handleDeleteSong,
    }
  },
}
</script>

<style scoped>
.single-document .single-document-cover-image {
  height: 30rem !important;
}
.edit-document {
  border: 1px solid var(--fifth);
  padding: 2rem 1rem;
}

.songs {
  gap: 1rem;
}
.song-list-document {
  border: 1px solid var(--fifth);
  padding: 2rem 1rem;
}
.add-song-document {
  border: 1px solid var(--fifth);
  padding: 2rem 1rem;
}

.single-song {
  background: var(--fourth);
  border: 4px solid var(--secondary);
  padding: 1rem 1rem;
}

.btn--delete {
  padding: 0.8rem 0rem;
  font-size: 1.2rem;
  color: var(--first);
  background: transparent;
}
.btn--delete:hover {
  padding: 0.8rem 0rem;
  font-size: 1.2rem;
  color: var(--first);
  background: transparent;
}
</style>