<template>
  <div id="app">
    <Navbar></Navbar>
    <div class="main">
      <Search></Search>
      <transition
      name="ballmove"
      enter-active-class="bouncein"
      leave-active-class="rollout">
        <router-view></router-view>
      </transition>
    </div>
    <Foooter></Foooter>
  </div>
</template>

<script>
import Movies from 'Components/movies/Movies.vue';
import Navbar from 'Components/navbar/Navbar.vue';
import Search from 'Components/search/Search.vue';
import Foooter from 'Components/footer/Footer.vue';

export default {
  name: 'app',
  components: {
    Movies,
    Navbar,
    Search,
    Foooter
  }
}
</script>