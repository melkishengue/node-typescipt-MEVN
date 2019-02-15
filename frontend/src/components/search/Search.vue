<template>
    <div class="row">
        <div class="col-12">
            <h1 class="header-text">
                <!-- Find your movie on <span class="hightlight"> subaru store</span> -->
            </h1>
            <input type="text" v-model="text" v-on:keyup.enter="submit" placeholder="Search" class="full-width-search-box">
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
      text: ''
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
      let options = {text: this.text};
      let data = JSON.stringify(options);
      this.$router.push(`/search?data=${data}`);
    }
  }
}
</script>