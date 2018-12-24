<template>
    <div class="card-container" v-on:click="clicked">
        Movies details page
    </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: 'MovieDetails',
  components: {
  },
  data() {
    return {
      
    }
  },
  props: {
    
  },
  created() {
      
  },
  // with mapState you map store state properties with local properties
  computed: mapState({
    
  }),
  methods: {
    clicked() {
        this.$router.push(`/movies/${this.movie._id}`)
    }
  }
}
</script>