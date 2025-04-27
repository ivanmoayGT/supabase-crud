<template>
  <div class="p-4 font-sans bg-gray-100 min-h-screen">
    <!-- Header -->
    <div class="flex items-center justify-between mb-4">
      <div class="flex items-center space-x-3">
        <div class="avatar">
          <div class="w-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
            <!-- Placeholder for avatar image -->
            <img
              src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
              alt="Caregiver Avatar"
            />
          </div>
        </div>
        <div>
          <div class="font-bold text-lg">Sarah Johnson</div>
          <div class="text-sm text-gray-500">Caregiver</div>
        </div>
      </div>
      <button class="btn btn-ghost btn-circle">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341A6.002 6.002 0 006 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
          />
        </svg>
      </button>
    </div>

    <!-- Current Visit Card -->
    <div class="card bg-base-100 shadow-md mb-4">
      <div class="card-body p-4">
        <div class="flex justify-between items-center mb-3">
          <h2 class="card-title text-lg">Current Visit</h2>
          <div class="badge badge-info gap-2 text-white bg-blue-400 border-blue-400">
            In Progress
          </div>
        </div>

        <div class="space-y-3 mb-4">
          <div class="flex items-center space-x-2 text-gray-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                clip-rule="evenodd"
              />
            </svg>
            <div>
              <div>Robert Smith</div>
              <div class="text-xs">Client #1234</div>
            </div>
          </div>
          <div class="flex items-center space-x-2 text-gray-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                clip-rule="evenodd"
              />
            </svg>
            <div>
              <div>123 Healthcare Ave</div>
              <div class="text-xs">Portland, OR 97201</div>
            </div>
          </div>
        </div>

        <div class="bg-green-100 text-green-700 p-2 rounded-lg flex items-center space-x-2 mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M17.657 16.657l-1.414-1.414M6.343 7.343l1.414 1.414"
            />
          </svg>
          <span>GPS Signal Strong</span>
        </div>

        <div class="space-y-2">
          <button class="btn btn-primary w-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 transform -rotate-90 mr-1"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm.707-10.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L9.414 11H13a1 1 0 100-2H9.414l1.293-1.293z"
                clip-rule="evenodd"
              />
            </svg>
            Check In
          </button>
          <button class="btn btn-ghost w-full text-gray-400 bg-gray-200">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 transform rotate-90 mr-1"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm.707-10.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L9.414 11H13a1 1 0 100-2H9.414l1.293-1.293z"
                clip-rule="evenodd"
              />
            </svg>
            Check Out
          </button>
        </div>
      </div>
    </div>

    <!-- Visit Details Card -->
    <div class="card bg-base-100 shadow-md mb-4">
      <div class="card-body p-4">
        <h2 class="card-title text-lg mb-3">Visit Details</h2>
        <div class="space-y-2 text-sm">
          <div class="flex justify-between">
            <span class="text-gray-500">Scheduled Time</span>
            <span class="font-semibold">9:00 AM - 11:00 AM</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-500">Service Type</span>
            <span class="font-semibold">Personal Care</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-500">Duration</span>
            <span class="font-semibold">2 hours</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom Navigation -->
    <div class="btm-nav">
      <button class="text-primary active">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
          />
        </svg>
        <span class="btm-nav-label">Home</span>
      </button>
      <button>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
        <span class="btm-nav-label">Schedule</span>
      </button>
      <button>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span class="btm-nav-label">History</span>
      </button>
      <button>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
          />
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
        <span class="btm-nav-label">Settings</span>
      </button>
    </div>
  </div>
</template>

<script setup>
// No script logic needed for this static example yet
</script>

<style scoped>
/* Add any additional custom styles here if needed */
.btm-nav {
  /* Ensure bottom nav is always visible if content overflows */
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: white; /* Match image background */
  border-top: 1px solid #e5e7eb; /* Match image border */
}

/* Add padding to the bottom of the main content area to prevent overlap with fixed nav */
.min-h-screen {
  padding-bottom: 6rem; /* Adjust based on btm-nav height */
}
</style>
