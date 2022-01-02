<template>
  <h1>Create Playlist</h1>
  <section>
    <div class="container">
      <form @submit.prevent="handleSubmit" class="form-add-single-document-post">
        <h3>Create a new playlist</h3>
        <label>Title <span class="input-required">(required)</span>:</label>
        <input type="text" placeholder="Playlist title" v-model="title" required>

        <label>Description <span class="input-required">(required)</span>:</label>
        <textarea placeholder="Playlist description..." v-model="description" required></textarea>

        <label>Categories (hit enter to add a tag) <span class="input-required">(required)</span>:</label>
        <input v-model="category" type="text" @keydown.enter.prevent="handleCategories">
        <div class="error">{{categoryError}}</div>

        <div class="categories">
          <div v-for="category in categories" :key="category" class="single-category-pill">
            <span @click="deleteCategory(category)">#{{category}}</span>
          </div>
        </div>

        <label>Upload Playlist cover image <span class="input-required">(required)</span>:</label>
        <input type="file" @change="handleImageChange">
        <div class="error">{{fileError}}</div>

        <div class="submit">
          <button v-if="!isPending" class="btn mt-4">Create</button>
          <button v-if="isPending" class="btn mt-4 disabled">Saving...</button>
        </div>
        <div class="error">{{error}}</div>

      </form>
    </div>
  </section>
</template>

<script>
import useStorage from '@/composables/useStorage'
import useCollection from '../../composables/useCollection'
import getUser from '../../composables/getUser'
import { timestamp } from '../../firebase/config'
import { useRouter } from 'vue-router'
import { ref } from '@vue/reactivity'
import { MAX_CATEGORIES_TO_CHOSE } from '../../config/config'
export default {
  setup() {
    // grab things from useStorage.js
    const { filePath, url, uploadImage } = useStorage()
    const { error, addDoc } = useCollection('playlists')
    const { user } = getUser()
    const router = useRouter()

    // title, description, file, filesize, file error etc.
    const title = ref('')
    const description = ref('')
    const file = ref(null)
    // max fils size
    const fileSizeAllowed = ref(1000000)
    const fileError = ref(null)
    const categoryError = ref(null)
    const isPending = ref(false)

    // categories
    const category = ref('')
    const categories = ref([])

    // allowed file types
    const types = ['image/png', 'image/jpg', 'image/jpeg']

    //
    // handle categories
    const handleCategories = function () {
      if (!categories.value.includes(category.value)) {
        category.value = category.value.replace(/\s/, '') // removes all whitespace
        categories.value.push(category.value)
      }
      if (categories.value.length > MAX_CATEGORIES_TO_CHOSE) {
        error.value =
          'You can only add two categories. Delete one by clicking on it.'
        categoryError.value =
          'You can only add two categories. Delete one by clicking on it.'
      }
      if (categories.value.length === 1) {
        error.value = null
        categoryError.value = null
      }
      category.value = ''
    }
    //
    //
    //
    // delete category
    const deleteCategory = function (category) {
      // remove clicked category from categories list
      categories.value = categories.value.filter((item) => {
        return category !== item
      })
      // remove category error if less or equal than allowed categories
      if (categories.value.length <= MAX_CATEGORIES_TO_CHOSE) {
        categoryError.value = ''
        error.value = null
      }
    }
    //
    // file upload event function
    // every time the value of the file changes below handleImageChange function gets invoked
    const handleImageChange = function (e) {
      const selected = e.target.files[0] ? e.target.files[0] : 'not-allowed'
      // check for allowed file types
      if (selected && types.includes(selected.type)) {
        file.value = selected
        fileError.value = null
        error.value = null
      }
      // error if wrong file type has been selected
      if (!types.includes(selected.type) && e.target.files[0] !== undefined) {
        file.value = null
        error.value = 'Please select an image file (png or jpg).'
        fileError.value = 'Please select an image file (png or jpg).'
        return
      }
      // error if upload image field is empty
      if (e.target.files[0] === undefined) {
        error.value = 'Upload image field can not be empty.'
        fileError.value = 'Upload image field can not be empty.'
        return
      }
      // check for allowed file sizes
      if (selected.size < fileSizeAllowed.value) {
        file.value = selected
        error.value = null
        fileError.value = null
        return
      }
      // throw error if allowed file size is not respected
      if (selected.size > fileSizeAllowed.value) {
        file.value = null
        error.value = 'File is to big. Please choose a file smaller than 1MB.'
        fileError.value =
          'File is to big. Please choose a file smaller than 1MB.'
        return
      }
    }
    //
    // handle submit
    const handleSubmit = async function () {
      // return submit if no categories
      if (
        categories.value.length === 0 ||
        categories.value.length > MAX_CATEGORIES_TO_CHOSE
      ) {
        error.value = error.value || 'Select minimum one category.'
        categoryError.value =
          categoryError.value || 'Select minimum one category.'
        return
      }
      // if no image has been selected
      if (file.value === null || error.value) {
        error.value = error.value || 'Select an image'
        fileError.value = fileError.value || 'Select an image'
        return
      }
      // pending is true
      isPending.value = true
      // upload image with await method
      await uploadImage(file.value)
      // save playlist to firestore
      const response = await addDoc({
        title: title.value,
        description: description.value,
        userId: user.value.uid,
        userName: user.value.displayName,
        coverUrl: url.value,
        filePath: filePath.value,
        songs: [],
        createdAt: timestamp(),
        categories: categories.value,
      })
      // end of is pending
      isPending.value = false
      if (!error.value) {
        router.push({ name: 'PlaylistDetails', params: { id: response.id } })
      }
    }

    // export
    return {
      title,
      description,
      handleSubmit,
      handleImageChange,
      fileError,
      isPending,
      category,
      categories,
      handleCategories,
      error,
      categoryError,
      deleteCategory,
    }
  },
}
</script>

<style>
</style>