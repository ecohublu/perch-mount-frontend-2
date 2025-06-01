<template>
  <main>
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 m-6">
      <div>
        <router-link to="/app">
          <div class="relative inline-block">
            <Image
              imageClass="rounded-xl transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg object-cover"
              src="/src/assets/images/black_winged_kite.jpg"
              alt="Image"
            />
            <div class="absolute inset-0 flex items-center justify-center">
              <div class="bg-black/25 text-white text-4xl font-semibold px-4 py-2 rounded">
                開始使用 PerchAI
              </div>
            </div>
          </div>
        </router-link>
      </div>
      <div>
        <router-link to="/admin">
          <div class="relative inline-block">
            <Image
              imageClass="rounded-xl transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg object-cover"
              src="/src/assets/images/grass_owl.jpg"
              alt="Image"
            />
            <div class="absolute inset-0 flex items-center justify-center">
              <div class="bg-black/25 text-white text-4xl font-semibold px-4 py-2 rounded">
                Admin Area
              </div>
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </main>
</template>
<script setup lang="ts"></script>
