import Vue from 'vue'
import VueRouter from 'vue-router';

Vue.use(VueRouter)

import MoviesComponent from 'Components/movies/Movies.vue';
import MoviesDetailsComponent from 'Components/movieDetails/MovieDetails.vue';

const routes = [
  { path: '/', component: MoviesComponent },
  { path: '/movies/:id', component: MoviesDetailsComponent },
  { path: '*', component: MoviesComponent }
];

const router = new VueRouter({
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
  routes,
  mode: 'history'
});

export default router;
