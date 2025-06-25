<template>
  <div class="popup-overlay" @click="closePopup">
    <div class="popup-content" @click.stop>
      <h2 class="popup-title">Seen In</h2>

      <p v-if="matchedImages.length === 0" class="mb-4 text-gray-600">
        找不到與「{{ keyword }}」相符的圖片
      </p>

      <template v-else>
        <!-- 主圖 -->
        <div class="mb-4">
          <img
            :src="currentImage.full"
            :alt="currentImage.description"
            class="main-image cursor-pointer"
            @click="goBackWithImage(currentImage)"
          />
        </div>

        <!-- 縮圖列表 -->
        <div class="thumbnail-container">
          <img
            v-for="(img, i) in otherImages"
            :key="i"
            :src="img.thumbnail"
            :alt="img.description"
            class="thumbnail-image"
            :class="{ 'border-blue': img.full === currentImage.full }"
            @click="goBackWithImage(img)"
          />
        </div>
      </template>

      <button class="btn-close" @click="closePopup">×</button>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { images } from '@/data/images'

const route = useRoute()
const router = useRouter()
const matchedImages = ref([])
const keyword = ref('')
const currentImage = ref(null)

function filterImages(keyword) {
  const kw = keyword.toLowerCase()
  matchedImages.value = images.filter(img =>
    img.description.toLowerCase().includes(kw) ||
    img.full.toLowerCase().includes(kw)
  )
  if (matchedImages.value.length > 0) {
    currentImage.value = matchedImages.value[0]
  } else {
    currentImage.value = null
  }
}

watch(
  () => route.query.keyword,
  (newKeyword) => {
    keyword.value = newKeyword || ''
    if (keyword.value) {
      filterImages(keyword.value)
    } else {
      matchedImages.value = []
      currentImage.value = null
    }
  },
  { immediate: true }
)

const otherImages = computed(() =>
  matchedImages.value.filter(img => img.full !== currentImage.value?.full)
)

function goBackWithImage(img) {
  router.push({
    name: 'MainPage',
    query: { selected: img.thumbnail }
  })
}

function closePopup() {
  router.push({ name: 'MainPage' })
}
</script>

<style scoped>
.popup-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  padding: 1rem;
  overflow: auto;
}

.popup-content {
  background: white;
  padding: 1rem;
  border-radius: 8px;
  text-align: center;
  position: relative;
  max-width: 90vw;
  max-height: 90vh;
  overflow: auto;
  color: #000;
}

.popup-title {
  font-weight: 700;
  font-size: 1.25rem;
  color: black;
  margin-bottom: 1rem;
}

.btn-close {
  position: absolute;
  top: 12px;
  right: 12px;
  background: transparent;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #444;
}

.btn-close:hover {
  color: #000;
}

.main-image {
  max-width: 100%;
  max-height: 70vh; /* 限高，避免太大 */
  object-fit: contain; /* 保持比例，完整顯示圖片 */
  display: block;
  margin: 0 auto;
}

.thumbnail-container {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

.thumbnail-image {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 8px;
  cursor: pointer;
  border: 2px solid transparent;
  transition: border-color 0.3s;
}

.thumbnail-image:hover {
  border-color: #3b82f6;
}

.border-blue {
  border-color: #3b82f6;
}
</style>
