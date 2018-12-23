<template>
    <div class="row">
        <div class="col-12">
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