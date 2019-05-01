import EventService from '@/services/EventService.js'

export const namespaced = true

export const state = {
  event: {},
  events: [],
  eventCount: 0
}

export const mutations = {
  ADD_EVENT: (state, event) => state.events.push(event),
  SET_EVENT_COUNT: (state, eventCount) => (state.eventCount = eventCount),
  SET_EVENT: (state, event) => (state.event = event),
  SET_EVENTS: (state, events) => (state.events = events)
}

export const actions = {
  createEvent({ dispatch, commit, rootState }, event) {
    console.log('Creating event for user ' + rootState.user.user.name)

    return EventService.postEvent(event)
      .then(() => {
        commit('ADD_EVENT', event)

        const notification = {
          type: 'success',
          message: 'Event successfully created.'
        }

        dispatch('notification/addNotification', notification, { root: true })
      })
      .catch(error => {
        const notification = {
          type: 'error',
          message: 'Could not create event. ' + error.message
        }

        dispatch('notification/addNotification', notification, { root: true })

        throw error
      })
  },
  fetchEvents({ dispatch, commit }, { page, limit }) {
    EventService.getEvents(page, limit)
      .then(response => {
        commit(
          'SET_EVENT_COUNT',
          parseInt(response.headers['x-total-count']) || 0
        )
        commit('SET_EVENTS', response.data)
      })
      .catch(error => {
        const notification = {
          type: 'error',
          message: 'Could not fetch events. ' + error.message
        }

        dispatch('notification/addNotification', notification, { root: true })
      })
  },
  fetchEvent({ dispatch, getters, commit }, id) {
    var event = getters.getEventById(id)
    if (event) {
      commit('SET_EVENT', event)
    } else {
      EventService.getEvent(id)
        .then(response => {
          commit('SET_EVENT', response.data)
        })
        .catch(error => {
          const notification = {
            type: 'error',
            message: 'Could not fetch event. ' + error.message
          }

          dispatch('notification/addNotification', notification, { root: true })
        })
    }
  }
}

export const getters = {
  getEventById: state => id => state.events.find(event => event.id === id)
}
