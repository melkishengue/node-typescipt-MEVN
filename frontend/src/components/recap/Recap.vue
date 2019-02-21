<template>
    <div v-show="!loading && text" class="recap-results-box">
        {{ countMovies }} results found for {{ text }}.
    </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'Recap',
  components: {
    
  },
  data() {
    return { 
    }
  },
  created() { 
  },
  computed: mapState({
    loading: (state) => {
      return state.loading;
    },
    text: (state) => {
      return state.params.text;
    },
    countMovies: function(state) {
        return this.$store.getters.countMovies;
    }
  }),
  methods: {
      
  }
}
</script>