<template>
    <div class="col-3 card-container">
        <div class="card">
            <div class="movie-loading-container" v-show="!imgLoaded">
                <div class="lds-ripple"><div></div><div></div></div>
            </div>
                <figure v-bind:class="{ 'not-found': notFound }" class="movie-poster-container">
                    <transition name="slide-fade">
                        <img class="movie-poster"  v-show="imgLoaded" v-on:error="imageLoadError" v-on:load="loaded" :src="imageUrl" alt="">
                    </transition>
                </figure>
            
            <header>
                <h4 class="movie-title">{{ movie.title }}</h4>
            </header>
            <p></p>
            <footer class="is-right">
                <a  href="#" class="button primary">Submit</a>
                <a  href="#" class="button">Cancel</a>
            </footer>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: 'Movie',
  components: {
  },
  data() {
    return {
      imageUrl: '',
      imgLoaded: false,
      notFound: false
    }
  },
  props: {
      movie: {
          type: Object,
          required: true
      }
  },
  created() {
      if (this.movie.details.length) {
        this.imageUrl = this.movie.details[0].poster;
      }
  },
  // with mapState you map store state properties with local properties
  computed: mapState({
    
  }),
  methods: {
    loaded() {
        let self = this;
        let random = Math.floor(Math.random() * 1) + 2;
        setTimeout(function() {
            self.imgLoaded = true;
        }, random*1000)
    },
    imageLoadError() {
        this.notFound = true;
        this.imageUrl = "https://via.placeholder.com/550x800/FFFFFF/808080?Text=Movie cound not be found";
    }
  }
}
</script>