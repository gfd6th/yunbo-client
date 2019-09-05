export const state = () => ({
  showLoginModal: false,
  showPaidAction: false,
  settings: {
    plans: {
      yearly: 0,
      lifetime: 0
    }
  },
  showSubscribeModal: false
})

export const getters = {
  yearly(state) {
    return state.settings.plans.yearly / 100
  },
  lifetime(state) {
    return state.settings.plans.lifetime / 100
  }
}

export const mutations = {
  closeSubscribeModal(state) {
    state.showSubscribeModal = false
  },
  openSubscribeModal(state) {
    state.showSubscribeModal = true
  },
  showLoginModal(state) {
    state.showLoginModal = true
  },

  closeLoginModal(state) {
    state.showLoginModal = false
  },

  closePaidAction(state) {
    state.showPaidAction = false
  },

  showPaidAction(state) {
    state.showPaidAction = true
  },

  updateSettings(state, settings) {
    state.settings = settings
  }
}
