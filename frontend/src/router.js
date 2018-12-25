import Vue from 'vue'
import VueRouter from 'vue-router';
import { store } from 'Src/store/store';

Vue.use(VueRouter)

import MoviesComponent from 'Components/movies/Movies.vue';
import MoviesDetailsComponent from 'Components/movieDetails/MovieDetails.vue';

const beforeEnter = (to, frm, next) => {
  const params = JSON.stringify(JSON.parse(to.query.data));
  store.dispatch('fetchMoviesSummaryInfos', {params});
  next();
}

const routes = [
  { path: '/', component: MoviesComponent, props: { empty: true } },
  { path: '/movies/:id', component: MoviesDetailsComponent },
  { path: '/search/', component: MoviesComponent, beforeEnter },
  { path: '*', component: MoviesComponent }
];

const router = new VueRouter({
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
  routes,
  // mode: 'history'
});

export default router;
