<template>
  <div class="p-4 max-w-xl mx-auto">
    <!-- 主圖 -->
    <div class="mb-4">
      <img
        :src="currentImage.full"
        :alt="currentImage.description"
        class="main-image cursor-pointer"
        @click="openPopup(currentImage)"
      />
    </div>

    <!-- 縮圖列表 -->
    <div class="thumbnail-container">
      <img
        v-for="(img, index) in otherImages"
        :key="index"
        :src="img.thumbnail"
        :alt="img.description"
        class="thumbnail-image"
        :class="{ 'border-blue': img.full === currentImage.full }"
        @click="openPopup(img)"
      />
    </div>

    <!-- 彈窗 -->
    <div v-if="selectedImage" class="popup-overlay" @click="selectedImage = null">
      <div class="popup-content" @click.stop>
        <h3 class="popup-title mb-2 font-semibold text-lg">Item Detail</h3>

        <div class="relative w-full">
          <img
            :src="selectedImage.full"
            alt="popup image"
            class="popup-image"
          />
          <button
            class="absolute bottom-2 right-2 bg-green-500 text-white text-sm px-3 py-1 rounded hover:bg-green-600"
            @click.stop="handleSignIn"
          >
            Sign In
          </button>
        </div>

        <p class="mb-4" style="color: red;">{{ selectedImage.description }}</p>

        <button @click="selectedImage = null" class="btn-close">關閉</button>
      </div>
    </div>

    <!-- Sign In 子彈窗 -->
    <div v-if="showSignIn" class="popup-overlay" @click="showSignIn = false">
      <div class="popup-content max-w-md w-full" @click.stop>
        <h3 class="text-lg font-semibold text-black mb-4 block">Sign In Form</h3>
      
        <div class="mb-4 flex items-center">
          <label for="url-input" class="block font-medium mb-1 w-28 text-left">Image url</label><br>
          <input
            id="url-input"
            v-model="form.url"
            class="flex-1 p-2 border rounded"
            placeholder="Enter image url"
            type="text"
          />
        </div>
        <div class="mb-4 flex items-center">
          <label for="desc-input" class="block font-medium mb-1 w-28 text-left">Description</label><br>
          <textarea
            id="desc-input"
            v-model="form.text"
            class="flex-1 p-2 border rounded"
            placeholder="Enter text"
          ></textarea>
        </div>

        <div class="flex justify-end gap-2">
          <button
            class="bg-gray-300 text-black px-3 py-1 rounded hover:bg-gray-400"
            @click="showSignIn = false"
          >
            Cancel
          </button>
          <button
            class="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
            @click="submitForm"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { images } from '@/data/images'

const route = useRoute()
const router = useRouter()

const currentImage = ref(images[0])
const selectedImage = ref(null)
const showSignIn = ref(false)
const form = ref({ url: '', text: '' })

watch(
  () => route.query.selected,
  (newSelected) => {
    if (newSelected) {
      const found = images.find(img => img.thumbnail === newSelected)
      if (found) {
        currentImage.value = found
      }
    }
  },
  { immediate: true }
)

const otherImages = computed(() =>
  images.filter(img => img.full !== currentImage.value.full)
)

function openPopup(img) {
  selectedImage.value = img
}

function handleSignIn() {
  showSignIn.value = true
}

function submitForm() {
  const keywordText = form.value.text.trim().toLowerCase()
  const keywordUrl = form.value.url.trim().toLowerCase()

  if (!keywordText && !keywordUrl) {
    alert('請輸入描述文字或圖片 URL')
    return
  }

  // 合併成一個搜尋關鍵字字串（你可以自由調整格式）
  const combinedKeyword = `${keywordText} ${keywordUrl}`.trim()

  // 跳轉並帶入 query
  router.push({ name: 'MatchedImages', query: { keyword: combinedKeyword } })

  form.value = { url: '', text: '' }
  showSignIn.value = false
}
</script>


<style scoped>
.main-image {
  width: 100%;
  height: 250px;
  object-fit: cover;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  cursor: pointer;
}

.thumbnail-container {
  display: flex;
  gap: 1rem;
}

.thumbnail-image {
  flex: 1;
  min-width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 8px;
  cursor: pointer;
  border: 2px solid transparent;
  transition: border-color 0.3s;
}

.thumbnail-image:hover {
  border-color: #3b82f6; /* Tailwind blue-500 */
}

.border-blue {
  border-color: #3b82f6;
}

.popup-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
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

.popup-image {
  max-width: 100%;
  max-height: 80vh;
  border-radius: 8px;
  display: block;
  margin: 0 auto 1rem;
}

.popup-title {
  color: #000000; /* 黑色 */
  font-weight: 600;
  font-size: 1.125rem;
  margin-bottom: 0.5rem;
}

.btn-close {
  background-color: #3b82f6;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  cursor: pointer;
  border: none;
  transition: background-color 0.3s ease;
}

.btn-close:hover {
  background-color: #2563eb;
}

.sign-in-form {
  display: block;
}
</style>
