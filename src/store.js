import Vue from 'vue'
import Vuex from 'vuex'
import EventService from '@/services/EventService.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      id: 'bdr',
      name: 'Beder Acosta Borges'
    },
    categories: [
      'sustainability',
      'nature',
      'animal welfare',
      'housing',
      'education',
      'food',
      'community'
    ],
    event: {},
    events: [],
    eventCount: 0
  },
  mutations: {
    ADD_EVENT: (state, event) => state.events.push(event),
    SET_EVENT_COUNT: (state, eventCount) => (state.eventCount = eventCount),
    SET_EVENT: (state, event) => (state.event = event),
    SET_EVENTS: (state, events) => (state.events = events)
  },
  actions: {
    createEvent({ commit }, event) {
      return EventService.postEvent(event).then(() => {
        commit('ADD_EVENT', event)
      })
    },
    fetchEvents({ commit }, { page, limit }) {
      EventService.getEvents(page, limit)
        .then(response => {
          commit(
            'SET_EVENT_COUNT',
            parseInt(response.headers['x-total-count']) || 0
          )
          commit('SET_EVENTS', response.data)
        })
        .catch(error => {
          console.log('There was an error: ' + error.response)
        })
    },
    fetchEvent({ commit, getters }, id) {
      var event = getters.getEventById(id)
      if (event) {
        commit('SET_EVENT', event)
      } else {
        EventService.getEvent(id)
          .then(response => {
            commit('SET_EVENT', response.data)
          })
          .catch(error => {
            console.log('There was an error: ' + error.response)
          })
      }
    }
  },
  getters: {
    getEventById: state => id => state.events.find(event => event.id === id)
  }
})
