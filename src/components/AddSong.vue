<template>
  <div class="add-song">
    <form class="form-add-playlist" @submit.prevent="handleSubmit">
      <label>Song title</label>
      <input type="text" v-model="title" placeholder="Song title" required>

      <label>Artist</label>
      <input type="text" v-model="artist" placeholder="Artist" required>

      <div class="submit">
        <button v-if="!isPending" class="btn mt-4">Add new song</button>
        <button v-if="isPending" class="btn mt-4">Adding song...</button>
      </div>

    </form>
  </div>
</template>

<script>
import { ref } from '@vue/reactivity'
import useDocument from '@/composables/useDocument'
export default {
  props: ['document'],

  setup(props) {
    const title = ref('')
    const artist = ref('')
    const { updateDoc, isPending } = useDocument('playlists', props.document.id)

    const handleSubmit = async function () {
      const newSong = {
        title: title.value,
        artist: artist.value,
        id:
          Math.floor(Math.random() * 100000) *
          Math.floor(Math.random() * 100000),
      }

      await updateDoc({
        songs: [...props.document.songs, newSong],
      })

      title.value = ''
      artist.value = ''
    }

    return { title, artist, handleSubmit, isPending }
  },
}
</script>

<style>
</style>