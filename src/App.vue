<template>
  <div id="app">
    <!-- Router View will render the component based on the current route -->
    <router-view />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { supabase } from './supabase' // Import Supabase client

// Ref to hold the current session state - still useful for global state if needed
const session = ref(null)
// Ref for the auth state change listener
let authListener = null

// --- Lifecycle Hooks ---
onMounted(() => {
  // 1. Check for existing session on component mount
  supabase.auth
    .getSession()
    .then(({ data }) => {
      session.value = data.session
      console.log('Initial session check in App.vue:', session.value)
      // Now that the session is known, the router's navigation guards can use it.
      // If you have guards, they might re-trigger navigation based on this.
    })
    .catch((error) => {
      console.error('Error getting initial session:', error)
    })

  // 2. Listen for changes in authentication state (login, logout)
  const { data } = supabase.auth.onAuthStateChange((event, currentSession) => {
    console.log('Auth state changed in App.vue:', event, currentSession)
    session.value = currentSession // Update the session ref
    // If the user logs out, we might need to force a redirect to the login page.
    // This is typically handled by navigation guards in the router.
    if (event === 'SIGNED_OUT' && currentSession === null) {
      console.log('User signed out, router should handle redirect.')
    }
  })

  // Store the listener to unsubscribe later
  authListener = data.subscription
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
