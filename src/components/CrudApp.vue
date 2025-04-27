<template>
  <div class="container mx-auto p-4 pt-6 md:p-6 lg:p-12">
    <div class="navbar mb-6 bg-base-100 rounded-box shadow-sm">
      <div class="flex-1">
        <h1 class="text-3xl font-bold">My Items</h1>
      </div>
      <div class="flex-none">
        <button
          @click="handleLogout"
          :disabled="loadingLogout"
          class="btn btn-error btn-sm"
          :class="{ loading: loadingLogout }"
        >
          <span v-if="!loadingLogout">Logout</span>
          <span v-else>Logging out...</span>
        </button>
      </div>
    </div>

    <div v-if="crudError" role="alert" class="alert alert-error mb-4 shadow-md">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="stroke-current shrink-0 h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <span>Error: {{ crudError }}</span>
    </div>

    <div class="card bg-base-100 shadow-xl mb-6">
      <form @submit.prevent="handleSubmit" class="card-body">
        <h2 class="card-title">{{ editingItem ? 'Edit Item' : 'Add New Item' }}</h2>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <div class="form-control w-full mb-4">
              <label class="label" for="itemName">
                <span class="label-text">Item Name</span>
              </label>
              <input
                type="text"
                id="itemName"
                v-model="newItemName"
                required
                placeholder="Enter item name"
                class="input input-bordered w-full"
              />
            </div>

            <div class="form-control w-full mb-4">
              <label class="label" for="itemDescription">
                <span class="label-text">Description (Optional)</span>
              </label>
              <textarea
                id="itemDescription"
                v-model="newItemDescription"
                rows="2"
                placeholder="Enter a short description"
                class="textarea textarea-bordered w-full"
              ></textarea>
            </div>

            <div class="form-control w-full">
              <label class="label">
                <span class="label-text">Location (Click map or use button)</span>
              </label>
              <div class="flex items-center space-x-2">
                <div class="input input-bordered flex-grow h-auto p-2 text-sm bg-base-200/50">
                  <span v-if="newItemLat && newItemLng">
                    Lat: {{ newItemLat.toFixed(6) }}, Lng: {{ newItemLng.toFixed(6) }}
                  </span>
                  <span v-else class="italic text-base-content/50">No location selected</span>
                </div>
                <button
                  type="button"
                  @click="getCurrentLocation"
                  class="btn btn-sm btn-outline btn-square"
                  :class="{ loading: loadingLocation }"
                  :disabled="loadingLocation"
                  aria-label="Get Current Location"
                  title="Get Current Location"
                >
                  <span v-if="!loadingLocation">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="w-5 h-5"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                      />
                    </svg>
                  </span>
                </button>
              </div>
            </div>
          </div>

          <div class="w-full">
            <label class="label">
              <span class="label-text">Map</span>
            </label>
            <div id="mapContainer" class="h-64 w-full rounded-lg border border-base-300"></div>
          </div>
        </div>

        <div class="card-actions justify-start items-center mt-4">
          <button
            type="submit"
            :disabled="loadingSubmit"
            class="btn btn-primary"
            :class="{ loading: loadingSubmit }"
          >
            <span v-if="!loadingSubmit">{{ editingItem ? 'Update Item' : 'Add Item' }}</span>
            <span v-else>Saving...</span>
          </button>
          <button v-if="editingItem" type="button" @click="cancelEdit" class="btn btn-ghost">
            Cancel
          </button>
        </div>
      </form>
    </div>

    <div class="card bg-base-100 shadow-xl">
      <div class="card-body">
        <div v-if="loadingItems" class="text-center p-6">
          <span class="loading loading-lg loading-spinner text-primary"></span>
          <p class="mt-2">Loading items...</p>
        </div>
        <div v-else-if="items.length > 0" class="overflow-x-auto">
          <table class="table w-full">
            <!-- head -->
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Location</th>
                <th>Added</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in items" :key="item.id" class="hover">
                <td>{{ item.name }}</td>
                <td>{{ item.description || '-' }}</td>
                <td class="text-xs">
                  <span v-if="item.latitude && item.longitude">
                    {{ item.latitude.toFixed(4) }}, {{ item.longitude.toFixed(4) }}
                  </span>
                  <span v-else>-</span>
                </td>
                <td>{{ formatDate(item.created_at) }}</td>
                <td>
                  <div class="flex space-x-1">
                    <button
                      @click="startEdit(item)"
                      class="btn btn-ghost btn-xs btn-square"
                      aria-label="Edit item"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-4 w-4"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"
                        />
                        <path
                          fill-rule="evenodd"
                          d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </button>
                    <button
                      @click="deleteItem(item.id)"
                      :disabled="loadingDelete === item.id"
                      class="btn btn-ghost btn-xs btn-square text-error"
                      :class="{ loading: loadingDelete === item.id }"
                      aria-label="Delete item"
                    >
                      <span v-if="!(loadingDelete === item.id)">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="h-4 w-4"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                            clip-rule="evenodd"
                          />
                        </svg>
                      </span>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div v-else class="text-center p-6 text-base-content/70">
          No items found. Add one above!
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, nextTick, watch } from 'vue'
import { supabase, CRUD_TABLE_NAME } from '../supabase' // Import Supabase client and table name
import L from 'leaflet' // Import Leaflet
import 'leaflet/dist/leaflet.css' // Import Leaflet CSS

// Props & Emits (optional, if needed for parent communication)
// const props = defineProps({});
const emit = defineEmits(['loggedOut']) // Emit event when user logs out

// --- State ---
const items = ref([]) // Array to hold fetched items
const newItemName = ref('') // Input field for new/editing item name
const newItemDescription = ref('') // Input field for new/editing item description
const newItemLat = ref(null) // Input field for new/editing item latitude
const newItemLng = ref(null) // Input field for new/editing item longitude
const editingItem = ref(null) // Holds the item being edited, or null if adding
const loadingItems = ref(false) // Loading state for fetching items
const loadingSubmit = ref(false) // Loading state for add/update operations
const loadingDelete = ref(null) // Loading state for delete (stores ID being deleted)
const loadingLogout = ref(false) // Loading state for logout
const loadingLocation = ref(false) // Loading state for geolocation
const crudError = ref('') // To display errors related to CRUD operations
const user = ref(null) // Store user data
const mapInstance = ref(null) // Reference to the Leaflet map instance
const mapMarker = ref(null) // Reference to the Leaflet marker

// --- Computed Properties ---
// Get user ID safely
const userId = computed(() => user.value?.id)

// --- Map Methods ---

// Initialize the Leaflet map
const initMap = async () => {
  // Wait for the DOM element to be ready
  await nextTick()
  const mapElement = document.getElementById('mapContainer')
  if (!mapElement || mapInstance.value) return // Already initialized or element not found

  // Default view (e.g., center of the world or a specific region)
  const defaultLat = newItemLat.value ?? 51.505
  const defaultLng = newItemLng.value ?? -0.09
  const defaultZoom = newItemLat.value ? 13 : 2 // Zoom in if coords exist

  mapInstance.value = L.map(mapElement).setView([defaultLat, defaultLng], defaultZoom)

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(mapInstance.value)

  // Add click listener
  mapInstance.value.on('click', onMapClick)

  // If editing, add initial marker
  if (newItemLat.value && newItemLng.value) {
    updateMapMarker(newItemLat.value, newItemLng.value)
    mapInstance.value.setView([newItemLat.value, newItemLng.value], 13)
  }

  // Fix map rendering issues after container resize/visibility change
  setTimeout(() => mapInstance.value?.invalidateSize(), 100)
}

// Handle map click events
const onMapClick = (e) => {
  const { lat, lng } = e.latlng
  newItemLat.value = lat
  newItemLng.value = lng
  updateMapMarker(lat, lng)
}

// Update or create the marker on the map
const updateMapMarker = (lat, lng) => {
  if (!mapInstance.value) return
  if (mapMarker.value) {
    mapMarker.value.setLatLng([lat, lng])
  } else {
    // You might want to customize the marker icon
    mapMarker.value = L.marker([lat, lng]).addTo(mapInstance.value)
  }
  mapMarker.value.bindPopup(`Selected: ${lat.toFixed(4)}, ${lng.toFixed(4)}`).openPopup()
}

// Remove the marker from the map
const removeMapMarker = () => {
  if (mapMarker.value && mapInstance.value) {
    mapInstance.value.removeLayer(mapMarker.value)
    mapMarker.value = null
  }
}

// Destroy map instance
const destroyMap = () => {
  if (mapInstance.value) {
    mapInstance.value.off() // Remove listeners
    mapInstance.value.remove() // Remove map container content
    mapInstance.value = null
  }
  removeMapMarker()
}

// --- Geolocation Method ---
const getCurrentLocation = () => {
  if (!navigator.geolocation) {
    crudError.value = 'Geolocation is not supported by your browser.'
    return
  }

  loadingLocation.value = true
  crudError.value = '' // Clear previous errors

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const lat = position.coords.latitude
      const lng = position.coords.longitude

      newItemLat.value = lat
      newItemLng.value = lng

      // Update map if initialized
      if (mapInstance.value) {
        updateMapMarker(lat, lng)
        mapInstance.value.setView([lat, lng], 13) // Center map and zoom in
        // Fix potential sizing issues
        setTimeout(() => mapInstance.value?.invalidateSize(), 100)
      } else {
        // If map isn't ready yet, initMap called later will pick up these coords
        console.log('Map not initialized, coordinates set for init.')
      }
      loadingLocation.value = false
    },
    (error) => {
      console.error('Geolocation error:', error)
      switch (error.code) {
        case error.PERMISSION_DENIED:
          crudError.value = 'User denied the request for Geolocation.'
          break
        case error.POSITION_UNAVAILABLE:
          crudError.value = 'Location information is unavailable.'
          break
        case error.TIMEOUT:
          crudError.value = 'The request to get user location timed out.'
          break
        default:
          crudError.value = 'An unknown error occurred while getting location.'
          break
      }
      loadingLocation.value = false
    },
    {
      enableHighAccuracy: true, // Try for more accurate location
      timeout: 10000, // Max time to wait (10 seconds)
      maximumAge: 0, // Don't use a cached position
    },
  )
}

// --- CRUD Methods ---

// Fetch items from Supabase
const fetchItems = async () => {
  if (!userId.value) {
    crudError.value = 'User not identified. Cannot fetch items.'
    items.value = [] // Clear items if no user
    return
  }
  loadingItems.value = true
  crudError.value = '' // Clear previous errors
  try {
    // Select items belonging to the current user, ordered by creation date
    // IMPORTANT: Assumes your table has a 'user_id' column that matches the authenticated user's ID
    // and a 'name' column for the item's name. Adjust column names as needed.
    // Ensure Row Level Security (RLS) is enabled on your table in Supabase
    // to allow authenticated users to select their own rows.
    const { data, error } = await supabase
      .from(CRUD_TABLE_NAME)
      .select('*') // Select all columns, or specify like 'id, name, description, created_at'
      .eq('user_id', userId.value) // Filter by the current user's ID
      .order('created_at', { ascending: false }) // Show newest first

    if (error) throw error
    items.value = data || [] // Update the items array
  } catch (error) {
    console.error('Error fetching items:', error)
    crudError.value = `Failed to fetch items: ${error.message}`
    items.value = [] // Clear items on error
  } finally {
    loadingItems.value = false
  }
}

// Add or Update item
const handleSubmit = async () => {
  if (!userId.value) {
    crudError.value = 'Cannot save item: User not identified.'
    return
  }
  if (!newItemName.value.trim()) {
    crudError.value = 'Item name cannot be empty.'
    return
  }

  loadingSubmit.value = true
  crudError.value = ''

  try {
    let response
    const itemData = {
      user_id: userId.value,
      name: newItemName.value.trim(),
      description: newItemDescription.value.trim() || null,
      latitude: newItemLat.value, // Add latitude
      longitude: newItemLng.value, // Add longitude
    }

    if (editingItem.value) {
      // --- Update ---
      // IMPORTANT: Ensure RLS allows users to update their own rows.
      response = await supabase
        .from(CRUD_TABLE_NAME)
        .update(itemData)
        .eq('id', editingItem.value.id) // Target the specific item
        .eq('user_id', userId.value) // Ensure user owns the item they're updating
    } else {
      // --- Add ---
      // IMPORTANT: Ensure RLS allows authenticated users to insert rows.
      // 'created_at' is often handled automatically by Supabase if configured.
      response = await supabase.from(CRUD_TABLE_NAME).insert([itemData]) // Insert expects an array
    }

    const { error } = response
    if (error) throw error

    // Success: Clear form, reset editing state, remove marker, and refresh list
    clearFormAndMap()
    await fetchItems() // Refresh the list
  } catch (error) {
    console.error('Error saving item:', error)
    crudError.value = `Failed to save item: ${error.message}`
  } finally {
    loadingSubmit.value = false
  }
}

// Set up form for editing an existing item
const startEdit = async (item) => {
  editingItem.value = item
  newItemName.value = item.name
  newItemDescription.value = item.description || ''
  newItemLat.value = item.latitude ?? null // Populate lat if exists
  newItemLng.value = item.longitude ?? null // Populate lng if exists
  crudError.value = '' // Clear any previous errors

  // Ensure map is ready and update marker/view
  if (!mapInstance.value) {
    await initMap() // Initialize map if not already done
  } else {
    if (newItemLat.value && newItemLng.value) {
      updateMapMarker(newItemLat.value, newItemLng.value)
      mapInstance.value.setView([newItemLat.value, newItemLng.value], 13) // Center map on item
      // Fix potential sizing issues if map was hidden/resized
      setTimeout(() => mapInstance.value?.invalidateSize(), 100)
    } else {
      removeMapMarker() // Remove marker if item has no location
      mapInstance.value.setView([51.505, -0.09], 2) // Reset to default view
    }
  }

  // Scroll form into view (optional)
  document.getElementById('itemName')?.focus()
}

// Clear form fields and map state
const clearFormAndMap = () => {
  newItemName.value = ''
  newItemDescription.value = ''
  newItemLat.value = null
  newItemLng.value = null
  editingItem.value = null
  crudError.value = ''
  removeMapMarker()
  if (mapInstance.value) {
    // Reset map view to default
    mapInstance.value.setView([51.505, -0.09], 2)
  }
}

// Cancel editing mode
const cancelEdit = () => {
  clearFormAndMap()
}

// Delete an item
const deleteItem = async (id) => {
  if (!userId.value) {
    crudError.value = 'Cannot delete item: User not identified.'
    return
  }
  if (!confirm('Are you sure you want to delete this item?')) {
    return // User cancelled
  }

  loadingDelete.value = id // Set loading state for this specific item
  crudError.value = ''

  try {
    // IMPORTANT: Ensure RLS allows users to delete their own rows.
    const { error } = await supabase
      .from(CRUD_TABLE_NAME)
      .delete()
      .eq('id', id)
      .eq('user_id', userId.value) // Crucial: Only delete if user_id matches

    if (error) throw error

    // Success: Refresh the list
    await fetchItems()
  } catch (error) {
    console.error('Error deleting item:', error)
    crudError.value = `Failed to delete item: ${error.message}`
  } finally {
    loadingDelete.value = null // Clear loading state
  }
}

// Handle user logout
const handleLogout = async () => {
  loadingLogout.value = true
  crudError.value = ''
  try {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
    destroyMap() // Clean up map instance on logout
    emit('loggedOut') // Notify parent component (App.vue)
    // The onAuthStateChange listener in App.vue will handle the state change
  } catch (error) {
    console.error('Error logging out:', error)
    crudError.value = `Logout failed: ${error.message}`
  } finally {
    loadingLogout.value = false
  }
}

// Format date utility
const formatDate = (dateString) => {
  if (!dateString) return 'N/A'
  try {
    return new Date(dateString).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  } catch (e) {
    return dateString // Fallback to original string if formatting fails
  }
}

// --- Lifecycle Hooks ---
onMounted(async () => {
  // Get the initial user session
  const {
    data: { session },
  } = await supabase.auth.getSession()
  user.value = session?.user ?? null

  if (user.value) {
    fetchItems() // Fetch items only if user is logged in
    initMap() // Initialize the map
  } else {
    console.log('No active session on mount.')
    // The auth listener in App.vue should handle redirection if needed
  }

  // Listen for auth changes (e.g., user logs out in another tab)
  // This might be redundant if App.vue handles the main redirection,
  // but can be useful for reacting within this component if needed.
  const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
    console.log('Auth state changed in CrudApp:', event, session)
    const currentUser = session?.user ?? null
    user.value = currentUser
    if (event === 'SIGNED_IN') {
      fetchItems() // Fetch items when user signs in
      // Destroy existing map if any (e.g., from previous session) and re-init
      destroyMap()
      initMap()
    } else if (event === 'SIGNED_OUT') {
      items.value = [] // Clear items on sign out
      crudError.value = '' // Clear errors
      destroyMap() // Clean up map instance
      // App.vue should handle redirecting away from this component
    }
  })

  // Clean up the map and auth listener when the component is unmounted
  // Use watch on component unmount instead of onUnmounted directly for better cleanup
})

// Watch for component unmount signal (alternative to onUnmounted for complex cleanup)
// We don't have a direct unmount signal here, but Supabase listener cleanup might be needed
// If using onUnmounted:
// import { onUnmounted } from 'vue';
// onUnmounted(() => {
//   destroyMap();
//   authListener?.unsubscribe(); // Assuming authListener holds the subscription object
// });
</script>

<style scoped>
/* Import Leaflet CSS via JS import now */

#mapContainer {
  z-index: 0; /* Ensure map is interactive */
}

/* Add any additional component-specific styles here if needed */
/* Tailwind classes handle most styling */
button:disabled {
  cursor: not-allowed;
}
</style>
