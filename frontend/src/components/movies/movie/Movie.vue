<template>
    <div class="card-container" v-on:click="clicked">
        <div v-bind:class="{ 'not-found': notFound }" class="card" v-bind:style="{ backgroundImage: 'url(' + imageUrl + ')' }">

            <div class="movie-loading-container" v-show="!imgLoaded">
                <div class="lds-ripple"><div></div><div></div></div>
            </div>

            <div class="footer-overlay">
                <a href="#" class="movie-title">{{ movie.title }}</a>
                
                <div class="movie-hint-text" v-if="movie.details">
                    <span class="imdb-box">IMDB: {{ movie.details.imdb.rating }}</span>
                </div>

                <!-- <div class="movie-hint-text">
                    From {{ movie.year }}
                </div> -->
            </div>
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
      notFound: false,
    //   defaultImgUrl: "https://via.placeholder.com/550x800/FFFFFF/808080?Text=Movie"
      defaultImgUrl: "https://image.freepik.com/free-photo/man-searching-with-magnifying-glass_1048-2931.jpg"
    }
  },
  props: {
      movie: {
          type: Object,
          required: true
      }
  },
  created() {
      if (this.movie.details) {
        let imageUrl = this.movie.details.poster;

        let img = document.createElement("img");
        let self = this;
        img.onload = function() {

            let random = Math.floor(Math.random() * 1);
            setTimeout(function() {
                self.imgLoaded = true;
                self.imageUrl = imageUrl;
            }, random*1000)
        }
        img.onerror = function(data) {
            if (!self.imgLoaded) {
                self.notFound = true;
                self.imageUrl = self.defaultImgUrl;
                self.imgLoaded = true;
            }
        }
        img.src = imageUrl; 
      } else {
          this.imgLoaded = true;
          this.imageUrl = this.defaultImgUrl;
      }
  },
  // with mapState you map store state properties with local properties
  computed: mapState({
    
  }),
  methods: {
    clicked() {
        this.$router.push(`/movies/${this.movie.id}`)
    }
  }
}
</script>