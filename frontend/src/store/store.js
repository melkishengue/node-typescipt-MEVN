// WELCOME TO THE STORE, THE SINGLE SOURCE OF TRUTH

import Vue from 'vue';
import Vuex from 'vuex';
import { UPDATE_MOVIES } from 'Src/store/store.constants';
import movieService from 'Src/services/movies.service';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    movies: []
  },
  mutations: {
    [UPDATE_MOVIES](state, movies) {
      state.movies = movies;
    }
  },
  actions: {
    fetchMoviesSummaryInfos: ({ commit }) => {
      return new Promise((resolve, reject) => {
        movieService.getMoviesSummaryInfos().then((movies) => {
          commit(UPDATE_MOVIES, movies);
          resolve(movies);
        }).catch((error) => {
          reject(error);
        })
      })
    }
  },
  getters: {
    
  }
});