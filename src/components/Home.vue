<script setup>
import { useStore } from "vuex";
import { computed, onMounted } from "vue";
import MovieCard from "@/components/MovieCard.vue";

const store = useStore();

onMounted(() => {
  store.dispatch("fetchMovies");
});

const movies = computed(() => {
  return store.state.movies;
});
</script>

<template>
  <div class="container my-5">
    <div v-if="movies === null" class="text-center">
      <span
        class="spinner-border text-primary"
        role="status"
        aria-hidden="true"
      ></span>
    </div>
    <div v-else class="row">
      <template v-for="movie in movies" v-bind:key="movie">
        <movie-card :info="movie" />
      </template>
    </div>
  </div>
</template>
