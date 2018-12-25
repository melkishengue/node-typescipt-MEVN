<template>
  <div>
      <div class="row">
        <div class="col-12 flex">
          <RecapComponent></RecapComponent>
        </div>
      </div>
      <div class="row">
        <div class="col-12 flex">
          <MovieComponent  v-show="!loading" v-for="movie in movies" :movie='movie' :key="movie.id" v-if="movies.length" />
          <div v-show="!loading && movies.length === 0  && text" class="no-results-box">
            No results found for {{ text }}
          </div>
          <div v-show="loading" class="loading-box hightlight animated infinite pulse delay-6s">
            Loading...
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import MovieComponent from 'Components/movies/movie/Movie.vue';
import RecapComponent from 'Components/recap/Recap.vue';
import { mapState } from 'vuex';


export default {
  name: 'Movies',
  components: {
    MovieComponent,
    RecapComponent
  },
  data() {
    return { 
    }
  },
  created() { 
    if (this.empty) {
      this.$store.dispatch('updateSearchText', '');
    }
  },
  // with mapState you map store state properties with local properties
  computed: mapState({
    movies: (state) => {
      return state.movies;
    },
    loading: (state) => {
      return state.loading;
    },
    text: (state) => {
      return state.params.text;
    }
  }),
  props: {
    empty: {
      type: Boolean,
      required: false
    }
  },
  methods: {
      
  }
}
</script>