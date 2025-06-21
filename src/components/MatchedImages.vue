<template>
  <div class="p-4 max-w-xl mx-auto">
    <h2 class="text-xl font-bold mb-4">Seen In</h2>
      <p v-if="matchedImages.length === 0"> 找不到與「{{ keyword }}」相符的圖片 </p>
      <div
        v-for="(img, i) in matchedImages"
        :key="i"
        class="border rounded p-2 cursor-pointer"
        @click="goBackWithImage(img)"
      >
        <img :src="img.full" :alt="img.description" class="w-full object-cover rounded mb-2" />
        <p>{{ img.description }}</p>
      </div>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { images } from '@/data/images'

const route = useRoute()
const router = useRouter()
const matchedImages = ref([])
const keyword = ref('')

function filterImages(keyword) {
  matchedImages.value = images.filter(img =>
    img.description.toLowerCase().includes(keyword) ||
    img.full.toLowerCase().includes(keyword)
  )
}

watch(
  () => route.query.keyword,
  (newKeyword) => {
    keyword.value = (newKeyword || '').toLowerCase()
    console.log('搜尋關鍵字:', keyword.value)

    if (keyword.value) {
      filterImages(keyword.value)
    } else {
      matchedImages.value = []
    }
  },
  { immediate: true }
)


function goBackWithImage(img) {
  router.push({ 
    name: 'MainPage', 
    query: { selected: img.thumbnail }
  })
}
</script>

