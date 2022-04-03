<script setup>
const props = defineProps({
  info: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <div class="col col-12 col-md-4">
    <div class="card">
      <img :src="info.poster" class="card-img-top" alt="" />
      <div class="card-body">
        <h5 class="card-title">{{ info.title }}</h5>
        <div>
          <span v-for="genre in info.genres" :key="genre" class="badge bg-secondary me-2">{{
            genre
          }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style></style>
