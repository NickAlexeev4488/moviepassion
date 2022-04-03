<script setup>
import { useStore } from "vuex";
import { ref, computed, onMounted } from "vue";
import { db, nowstime, app, moviesRef } from "@/firebase.js"
import { collection, doc, setDoc } from "firebase/firestore"; 
import { getStorage, child } from "firebase/storage"

let typeNewReview = ref(1) // type of the review
const genres = ['action', 'adventure', 'animated', 'comedy', 'crime', 'detective', 'documentary',
'drama', 'fantasy', 'historical', 'horror', 'melodrama', 'musical', 'science fiction', 'thriller', 'war', 'western']

// methods for the form
function changeTypeText() {
  typeNewReview.value = 1
}
function changeTypeVideo() {
  typeNewReview.value = 2
}
function changeTypeTextVideo() {
  typeNewReview.value = 3
}

// creating storage
const storageMy = ref(getStorage(app))

// Creating reactive variables for the form
let titleRef = ref('')
let genreCount = ref(1)
let textareaRef = ref('')
let genreMain = ref('')
let genreExtraMain = ref('')
let genreExtra = ref('')
let actors = ref([])
let channelTitle = ref('sas')
let logoFile = ref()
let posterFile = ref()
let logoUrl = ref('')
let posterUrl = ref('')
let hasSpoilers = ref(false)
// collecting all the information and adding it to the firestore
const newReview = {
  actors: actors.value,
  channel: channelTitle.value,
  date: nowstime,
  description: textareaRef.value,
  genres: [genreMain.value, genreExtraMain.value, genreExtra.value],
  likes: 0,
  logo: logoUrl.value,
  posters: posterUrl.value,
  spoilers: hasSpoilers.value,
  title: titleRef.value,
  views: 0
}
function addToDb(newReview) {
  let formNewReview = event.target
  let fileImg = document.getElementById("fileAddVideo")
  const fileImgRef = storageMy.child(fileImg.name)
  fileImgRef.put(fileImg).then(() => {
    console.log('Yeah');
  })
  const newMovieReview = doc(collection(db, "movies"));
  setDoc(newMovieReview, newReview);
}
function increment(){
  genreCount.value++
}
function decrement(){
  genreCount.value--
}
</script>

<template>
  <form id="newReviewForm">
    <div class="mb-3">
      <label for="reviewTitle" class="form-label">Title</label>
      <input name="sas2" v-model="titleRef" type="text" class="form-control" id="reviewTitle">
    </div>
    <div class="mb-3">
      <button @click="changeTypeText" type="button" class="btn btn-primary">Text</button>
      <button @click="changeTypeVideo" type="button" class="btn btn-primary">Video</button>
      <button @click="changeTypeTextVideo" type="button" class="btn btn-primary">Text/Video</button>
    </div>
    <div v-show="typeNewReview === 1" class="mb-3">
      <textarea v-model="textareaRef" id="textReviewta" cols="30" rows="10" class="textarea-textreview"></textarea>
      </div>
    <div v-show="typeNewReview === 2" class="mb-3">
      <input id="fileAddVideo" accept=".mp4" type="file" class="addvideo">
    </div>
    <div v-show="typeNewReview === 3" class="mb-3">
      <textarea v-model="textareaRef" name="textReviewta" id="textReviewta" cols="30" rows="10" class="textarea-textreview"></textarea>
      <input accept=".mp4" type="file" class="addvideo">
    </div>
    <div class="mb-3 form-check">
      <label class="form-check-label" for="exampleCheck1">Contains spoilers</label>
      <input v-model="hasSpoilers" type="checkbox" class="form-check-input" id="exampleCheck1">
    </div>
    <div class="mb-3">
      <select name="formSelect" id="formSelectGenre" class="formNewReviewSelect">
        <option value="{{genre}}" v-for="genre in genres" v-bind:key="genre">{{genre}}</option>
      </select>
      <button v-show="genreCount === 1" @click="increment(genreCount)" type="button" class="btn btn-primary">Add genre</button>
    </div>
    <div class="mb-3" v-show="genreCount != 1">
      <select name="formSelect" id="formSelectGenre" class="formNewReviewSelect">
        <option value="{{genre}}" v-for="genre in genres" v-bind:key="genre">{{genre}}</option>
      </select>
      <button v-show="genreCount === 2" @click="increment(genreCount)" type="button" class="btn btn-primary">Add genre</button>
      <button v-show="genreCount === 2" @click="decrement(genreCount)" type="button" class="btn btn-primary">Remove genre</button>
    </div>
    <div class="mb-3" v-show="genreCount === 3">
      <select name="formSelect" id="formSelectGenre" class="formNewReviewSelect">
        <option value="{{genre}}" v-for="genre in genres" v-bind:key="genre">{{genre}}</option>
      </select>
      <button v-show="genreCount === 3" @click="decrement(genreCount)" type="button" class="btn btn-primary">Remove genre</button>
    </div>
    
    <button @click="addToDb(newReview)" type="submit" class="btn btn-primary">Create</button>
  </form>
</template>