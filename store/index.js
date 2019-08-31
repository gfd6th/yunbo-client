export const state = () => ({
  showLoginModal: false,
  showPaidAction: false
})

export const mutations = {
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
  }
}
