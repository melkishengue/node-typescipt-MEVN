<template>
  <div>
      <div class="row">
        <MovieComponent v-for="movie in movies" :movie='movie' :key="movie._id" v-if="movies.length" />
      </div>
  </div>
</template>

<script>
import MovieComponent from 'Components/movies/movie/Movie.vue';
import { mapState } from 'vuex';


export default {
  name: 'Movies',
  components: {
    MovieComponent
  },
  data() {
    return { 
    }
  },
  created() { 
    console.log('this.movie', this.movie)
    this.$store.dispatch('fetchMoviesSummaryInfos');
  },
  // with mapState you map store state properties with local properties
  computed: mapState({
    movies: (state) => {
      return state.movies;
    }
  }),
  methods: {
      
  }
}
</script>