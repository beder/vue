<template>
  <div>
    <h1>Events for {{ user.user.name }}</h1>
    <v-layout row wrap>
      <v-flex xs12 sm6 offset-sm3>
        <EventCard
          v-for="event in event.events"
          :key="event.id"
          :event="event"
        />
      </v-flex>
    </v-layout>
    <template v-if="previousPage">
      <router-link
        :to="{ name: 'event-list', query: { page: previousPage } }"
        rel="prev"
        >Previous</router-link
      >|
    </template>
    <template v-if="nextPage">
      <router-link
        :to="{ name: 'event-list', query: { page: nextPage } }"
        rel="next"
        >Next</router-link
      >
    </template>
  </div>
</template>

<script>
import EventCard from '@/components/EventCard.vue'
import { mapState } from 'vuex'

export default {
  components: {
    EventCard
  },
  computed: {
    currentPage() {
      return parseInt(this.$route.query.page) || 1
    },
    previousPage() {
      return this.currentPage > 1 ? this.currentPage - 1 : null
    },
    nextPage() {
      return this.event.eventCount > this.currentPage * 3
        ? this.currentPage + 1
        : null
    },
    ...mapState(['event', 'user'])
  },
  created() {
    this.$store.dispatch('event/fetchEvents', {
      page: this.currentPage,
      limit: 3
    })
  }
}
</script>
