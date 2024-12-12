import { createStore } from 'vuex';

const store = createStore({
  state() {
    return {
      settings: {
        rotation: 0,
        zoom: 5,
        panX: 0,
        panY: 0,
      },
    };
  },
  mutations: {
    updateSettings(state, newSettings) {
      state.settings = newSettings;
    },
  },
  actions: {
    fetchSettings({ commit }, userId) {
      // Simulate fetching settings from backend based on userId
      // This should be replaced with an actual API call
      const fetchedSettings = {
        rotation: 10,
        zoom: 3,
        panX: 1,
        panY: 1,
      };
      commit('updateSettings', fetchedSettings);
    },
  },
});

export default store;