<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <div class="desktop-menu relative bg-gray-50">
    <Popover class="relative bg-white shadow">
      <div class="mx-auto px-4 sm:px-6">
        <div class="flex justify-between items-center py-6 md:space-x-10">
          <div class="flex justify-start lg:w-0 lg:flex-1">

            <span class="sr-only">Workflow</span>
            <router-link :to="{name: 'Home'}">
              <router-link :to="{name: 'Home'}" class="logo mr-10">logo</router-link>
            </router-link>

          </div>

          <div class="-mr-2 -my-2 md:hidden">
            <PopoverButton class="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
              <span class="sr-only">Open menu</span>
              <MenuIcon class="h-6 w-6" aria-hidden="true" />
            </PopoverButton>
          </div>
          <PopoverGroup as="nav" class="hidden md:flex space-x-10 items-center">

            <div>
              <router-link :to="{name: 'Home'}" class="text-base font-medium text-gray-500 hover:text-gray-900">Home</router-link>
            </div>

            <div v-if="user">
              <router-link :to="{name: 'CreatePlaylist'}" class="text-base font-medium text-gray-500 hover:text-gray-900">Create Playlist</router-link>
            </div>
            <div v-if="!user">
              <router-link :to="{name: 'Signup'}" class="text-base font-medium text-gray-500 hover:text-gray-900">Sign up</router-link>
            </div>
            <div v-if="!user">
              <router-link :to="{name: 'Login'}" class="text-base font-medium text-gray-500 hover:text-gray-900">Log in</router-link>
            </div>
            <div v-if="user">
              <router-link :to="{name: 'Account'}" class="display-name text-base font-medium text-gray-500 hover:text-gray-900">{{user.displayName}}</router-link>
            </div>

            <div v-if="user">
              <router-link @click="handleClick" to="#" id="sign-out-link" class="text-base font-medium text-gray-500 hover:text-gray-900">Log out</router-link>
            </div>

          </PopoverGroup>
          <div class="hidden items-center justify-end md:flex-1 lg:w-0">

          </div>
        </div>
      </div>

      <transition enter-active-class="duration-200 ease-out" enter-from-class="opacity-0 scale-95" enter-to-class="opacity-100 scale-100" leave-active-class="duration-100 ease-in" leave-from-class="opacity-100 scale-100" leave-to-class="opacity-0 scale-95">
        <PopoverPanel focus class="absolute top-0 inset-x-0 z-10 p-2 transition transform origin-top-right md:hidden">
          <div class="mobile-menu rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50">
            <div class="pt-5 pb-6 px-5">
              <div class="flex items-center justify-between">
                <div>
                  <router-link :to="{name: 'Home'}" class="logo">logo</router-link>
                </div>
                <div class="-mr-2">
                  <PopoverButton class="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                    <span class="sr-only">Close menu</span>
                    <XIcon class="h-6 w-6" aria-hidden="true" />
                  </PopoverButton>
                </div>
              </div>
              <div class="mt-6">

                <nav class="main-nav grid gap-y-8">
                  <router-link :to="{name: 'Home'}">Home</router-link>
                  <div v-if="user">
                    <router-link :to="{name: 'CreatePlaylist'}">Create Playlist</router-link>
                  </div>
                  <div v-if="!user">
                    <router-link :to="{name: 'Signup'}">Sign up</router-link>
                  </div>
                  <div v-if="!user">
                    <router-link :to="{name: 'Login'}">Log in</router-link>
                  </div>
                  <div v-if="user">
                    <router-link :to="{name: 'Account'}" class="display-name">{{user.displayName}}</router-link>
                  </div>
                  <div v-if="user">
                    <button @click="handleClick">Log out</button>
                  </div>
                </nav>

              </div>

              <a href="#" class="sign-up-button w-full flex items-center justify-center px-4 py-6 mt-4 mb-4 border border-transparent rounded-md shadow-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700">
                Sign up
              </a>
              <p class="mt-3 text-center text-gray-500">
                Existing customer?
                {{ ' ' }}
                <a href="#" class="text-indigo-600 hover:text-indigo-500">
                  Sign in
                </a>
              </p>

            </div>
          </div>
        </PopoverPanel>
      </transition>
    </Popover>
  </div>
</template>


<script>
import {
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
} from '@headlessui/vue'
import { MenuIcon, XIcon } from '@heroicons/vue/outline'
import { ChevronDownIcon } from '@heroicons/vue/solid'

import useLogout from '@/composables/useLogout'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
//
import { computed, ref } from '@vue/reactivity'
import { watch } from '@vue/runtime-core'

export default {
  components: {
    Popover,
    PopoverButton,
    PopoverGroup,
    PopoverPanel,
    ChevronDownIcon,
    MenuIcon,
    XIcon,
  },
  //
  setup() {
    // store
    const store = useStore()
    //
    const { error, logout, isPending } = useLogout()
    const router = useRouter()
    //
    //
    //
    // computed
    const user = computed(() => {
      return store.state.user
    })
    //
    // watch
    // const user = ref(store.state.user)
    // watch(user, (currentValue, oldValue) => {
    //   console.log('old:', currentValue)
    //   console.log('new', oldValue)
    //   //
    //   user.value = store.state.user
    // })
    //
    //
    //
    //
    // log out option
    const handleClick = async function () {
      await logout()
      // send user to home after success logout
      router.push({ name: 'Login' })
      if (!error.value) {
        console.log('Logged out successfully')
      }
    }
    //
    //
    return {
      user,
      handleClick,
      isPending,
    }
  },
}
</script>









