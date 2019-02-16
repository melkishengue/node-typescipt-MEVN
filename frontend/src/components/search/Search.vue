<template>
    <div class="row">
        <div class="col-12">
            <h1 class="header-text">
                <!-- Find your movie on <span class="hightlight"> subaru store</span> -->
            </h1>
            <input type="text" v-model="text" v-on:keyup="submit" placeholder="Search" class="full-width-search-box">
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
      text: '',
      timeout: null
    }
  },
  props: {
      
  },
  created() {
    this.text = this.params.text;
  },
  computed: mapState({
    params: (state) => {
      return state.params;
    }
  }),
  methods: {
    submit() {
      if (this.text) {
        clearTimeout(this.timeout);
        // delay search by 900 to allow for batching
        this.timeout = setTimeout( () => {
          let options = {text: this.text};
          let data = JSON.stringify(options);
          console.log('data', data);
          this.$router.push(`/search?data=${data}`);
        }, 900);
      }
    }
  }
}
</script>