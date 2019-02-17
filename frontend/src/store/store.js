// WELCOME TO THE STORE, THE SINGLE SOURCE OF TRUTH

import Vue from 'vue';
import Vuex from 'vuex';
import { UPDATE_MOVIES, UPDATE_LOADING, UPDATE_PARAMS, UPDATE_PARAMS_TEXT } from 'Src/store/store.constants';
import movieService from 'Src/services/movies.service';

const DELAY = 500;

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    movies: [],
    loading: false,
    params: {text: "john seema"},
    hasSearched: false
  },
  mutations: {
    [UPDATE_MOVIES](state, movies) {
      state.movies = movies;
    },
    [UPDATE_LOADING](state, loading) {
      state.loading = loading;
    },
    [UPDATE_PARAMS](state, params) {
      state.params = params;
    },
    [UPDATE_PARAMS_TEXT](state, text) {
      state.params.text = text;
      state.movies = [];
    }
  },
  actions: {
    fetchMoviesSummaryInfos: ({ commit }, payload) => {
      return new Promise((resolve, reject) => {
        let params = JSON.parse(payload.params);
        commit(UPDATE_LOADING, true);
        commit(UPDATE_PARAMS, params);
        movieService.getMoviesSummaryInfos(params).then((movies) => {
          setTimeout(() => {
            commit(UPDATE_LOADING, false);
            commit(UPDATE_MOVIES, movies);
            resolve(movies);
          }, DELAY);
        }).catch((error) => {
          reject(error);
        })
      });
    },
    updateSearchText: ({ commit }, text) => {
      return new Promise((resolve, reject) => {
        commit(UPDATE_PARAMS_TEXT, '');
      });
    }
  },
  getters: {
    countMovies(state) {
      return state.movies.length;
    }
  }
});