import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    notes: () => [],
    shuffledNotes: () => [],
  },
  getters: {
    getNotes: (state) => {
      return state.notes;
    },
    getShuffledNotes: (state) => {
      return state.shuffledNotes;
    },
  },
  mutations: {
    setNotes: (state, notes) => {
      state.notes = notes;
    },
    setShuffledNotes: (state, notes) => {
      state.shuffledNotes = notes;
    },
  },
});

export const EventBus = new Vue();
