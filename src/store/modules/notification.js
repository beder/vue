export const namespaced = true

export const state = {
  notifications: []
}

let nextId = 1

export const mutations = {
  ADD_NOTIFICATION: (state, notification) => {
    state.notifications.push({
      ...notification,
      id: nextId++
    })
  },
  REMOVE_NOTIFICATION: (state, notification) => {
    state.notifications = state.notifications.filter(
      existingNotification => existingNotification.id !== notification.id
    )
  }
}

export const actions = {
  addNotification({ commit }, notification) {
    commit('ADD_NOTIFICATION', notification)
  },
  removeNotification({ commit }, notification) {
    commit('REMOVE_NOTIFICATION', notification)
  }
}
