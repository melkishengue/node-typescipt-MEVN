<template>
    <div class="row">
        <div class="col-12">
            <h1 class="header-text">
                Find your movie on <span class="hightlight animated infinite pulse delay-6s"> subaru store</span>
            </h1>
            <input type="text" placeholder="Search" class="full-width-search-box">
            
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: 'Search',
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
    
  }
}
</script>