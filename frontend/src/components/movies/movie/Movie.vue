<template>
    <div class="card-container" v-on:click="clicked">
        <div :class="{ 'not-found': notFound }" class="card" :style="{ backgroundImage: 'url(' + imageUrl + ')' }">
                <img :src="imdb" v-if="notFound" class="img-overlay" alt="">

            <div class="movie-loading-container" v-show="!imgLoaded">
                <div class="lds-ripple"></div>
            </div>

            <div class="footer-overlay">
                <a href="#" class="movie-title">{{ movie.title }}</a>
                
                <div class="movie-hint-text" v-if="movie.details">
                    <span class="imdb-box">{{ movie.year }}</span>
                    <star-rating
                        :increment="0.1"
                        :max-rating="10"
                        inactive-color="#d8d8d8"
                        active-color="#FD0"
                        :star-size="12"
                        :read-only="true"
                        :show-rating="false"
                        :rating="movie.details.imdb.rating"
                        glow-color="#FD0"
                        border-color="#FD0"
                        >
                    </star-rating>
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
import imdb from "../../../../assets/images/imdb.png";
import StarRating from 'vue-star-rating'
export default {
  name: 'Movie',
  components: {
  },
  data() {
    return {
      imageUrl: '',
      imgLoaded: false,
      notFound: false,
      defaultImgUrl: "../../../../assets/images/imdb.png",
      imdb
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
  components: {
      StarRating
  },
  methods: {
    clicked() {
        this.$router.push(`/movies/${this.movie.id}`)
    }
  }
}
</script>