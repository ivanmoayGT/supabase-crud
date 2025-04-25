<template>
  <div class="flex justify-center items-center min-h-screen bg-gray-100 font-sans">
    <div class="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
      <h2 class="text-2xl font-bold text-center text-gray-800">
        {{ isLogin ? 'Login' : 'Sign Up' }}
      </h2>
      <p v-if="authError" class="text-red-500 text-sm text-center">{{ authError }}</p>
      <p v-if="authMessage" class="text-green-500 text-sm text-center">{{ authMessage }}</p>

      <form @submit.prevent="handleAuth" class="space-y-4">
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            v-model="email"
            required
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="you@example.com"
          />
        </div>
        <div>
          <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            id="password"
            v-model="password"
            required
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="••••••••"
          />
        </div>
        <div>
          <button
            type="submit"
            :disabled="loading"
            class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
          >
            <span v-if="loading">Processing...</span>
            <span v-else>{{ isLogin ? 'Login' : 'Sign Up' }}</span>
          </button>
        </div>
      </form>
      <div class="text-center">
        <button @click="toggleAuthMode" class="text-sm text-indigo-600 hover:text-indigo-500">
          {{ isLogin ? 'Need an account? Sign Up' : 'Have an account? Login' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { supabase } from '../supabase' // Import the Supabase client

// Refs for form inputs, loading state, errors, messages, and auth mode
const email = ref('')
const password = ref('')
const loading = ref(false)
const authError = ref('')
const authMessage = ref('')
const isLogin = ref(true) // Start in login mode

// Function to toggle between Login and Sign Up modes
const toggleAuthMode = () => {
  isLogin.value = !isLogin.value
  authError.value = '' // Clear errors on mode switch
  authMessage.value = '' // Clear messages on mode switch
  email.value = '' // Clear fields
  password.value = '' // Clear fields
}

// Function to handle authentication (Login or Sign Up)
const handleAuth = async () => {
  loading.value = true
  authError.value = ''
  authMessage.value = ''

  try {
    let response
    if (isLogin.value) {
      // --- Login ---
      response = await supabase.auth.signInWithPassword({
        email: email.value,
        password: password.value,
      })
      console.log('Login response:', response) // Keep track of user session state
      // No message needed on successful login, App.vue will handle redirect
    } else {
      // --- Sign Up ---
      response = await supabase.auth.signUp({
        email: email.value,
        password: password.value,
        // You can add options here, like redirect URLs or metadata
        // options: {
        //   emailRedirectTo: 'http://localhost:5173/' // Or your production URL
        // }
      })
      console.log('Sign up response:', response)
      // Check if user needs confirmation
      if (
        response.data.user &&
        response.data.user.identities &&
        response.data.user.identities.length === 0
      ) {
        authMessage.value = 'Signup successful, but requires email confirmation.'
        // Or handle cases where confirmation is not required
      } else if (response.data.user) {
        authMessage.value = 'Signup successful! Check your email to confirm your account.'
      } else if (response.error) {
        throw response.error // Rethrow Supabase specific errors
      } else {
        // Handle unexpected signup scenarios if necessary
        authMessage.value = 'Signup process initiated. Please check your email.'
      }
    }

    // Check for errors in the response
    if (response.error) {
      throw response.error
    }

    // Note: Successful login/signup state change is handled by the onAuthStateChange listener in App.vue
  } catch (error) {
    console.error('Authentication error:', error)
    authError.value = error.message || 'An unexpected error occurred.'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
/* Add any additional component-specific styles here if needed */
/* Tailwind classes handle most styling */
</style>
