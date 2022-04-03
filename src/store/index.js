import { createStore } from "vuex";
import { getDocs } from "firebase/firestore";
import { moviesRef } from "@/firebase";

const state = {
  movies: null,
  user: null,
};

const mutations = {
  setMovies(state, movies) {
    state.movies = movies;
  },
};

const actions = {
  fetchMovies: ({ commit }) => {
    getDocs(moviesRef).then((movies) =>
      commit(
        "setMovies",
        movies.docs.map((movie) => movie.data())
      )
    );
  },
};

const store = createStore({
  strict: true,
  state,
  mutations,
  actions,
});

export default store;
