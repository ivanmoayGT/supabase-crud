<template>
  <div id="app">
    <div v-if="loadingSession" class="flex justify-center items-center min-h-screen">
      <p class="text-gray-500 text-lg">Loading...</p>
    </div>
    <Auth v-else-if="!session" />
    <CrudApp v-else :key="session.user.id" @loggedOut="handleLogout" />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { supabase } from './supabase' // Import Supabase client
import Auth from './components/Auth.vue' // Import Auth component
import CrudApp from './components/CrudApp.vue' // Import CrudApp component

// Ref to hold the current session state
const session = ref(null)
// Ref to track if we are still checking the initial session
const loadingSession = ref(true)
// Ref for the auth state change listener
let authListener = null

// Function to handle logout event from CrudApp (optional, as listener also handles it)
const handleLogout = () => {
  // The onAuthStateChange listener below will automatically update the session ref
  console.log('Logout event received in App.vue')
}

// --- Lifecycle Hooks ---
onMounted(() => {
  // 1. Check for existing session on component mount
  supabase.auth
    .getSession()
    .then(({ data }) => {
      session.value = data.session
      loadingSession.value = false // Finished initial check
      console.log('Initial session check:', session.value)
    })
    .catch((error) => {
      console.error('Error getting initial session:', error)
      loadingSession.value = false // Still finish loading even on error
    })

  // 2. Listen for changes in authentication state (login, logout)
  const { data } = supabase.auth.onAuthStateChange((event, currentSession) => {
    console.log('Auth state changed in App.vue:', event, currentSession)
    session.value = currentSession // Update the session ref
    // No need to set loadingSession here, it's only for the initial load
    if (event === 'SIGNED_IN') {
      console.log('User signed in.')
      // Potentially navigate or refresh data if needed at the App level
    }
    if (event === 'SIGNED_OUT') {
      console.log('User signed out.')
      // Session is now null, Auth component will be displayed
    }
  })

  // Store the listener to unsubscribe later
  authListener = data.subscription // Correct way to get the subscription object
})

onUnmounted(() => {
  // Clean up the listener when the component is unmounted
  if (authListener) {
    authListener.unsubscribe()
    console.log('Auth listener unsubscribed.')
  }
})
</script>

<style>
/* Global styles - ensure Tailwind base styles are imported in your main CSS file (e.g., src/index.css) */
/* @import 'tailwindcss/base'; */
/* @import 'tailwindcss/components'; */
/* @import 'tailwindcss/utilities'; */

/* Example: Apply a default background or font */
body {
  margin: 0; /* Remove default body margin */
  font-family: 'Inter', sans-serif; /* Example font */
  background-color: #f7fafc; /* Light gray background */
}

#app {
  /* Ensures the app takes full height if needed */
  /* min-height: 100vh; */
}
</style>
