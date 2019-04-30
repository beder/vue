<template>
  <div>
    <h1>Events</h1>
    <EventCard v-for="event in events" :key="event.id" :event="event" />
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
      return this.eventCount > this.currentPage * 3
        ? this.currentPage + 1
        : null
    },
    ...mapState(['eventCount', 'events'])
  },
  created() {
    this.$store.dispatch('fetchEvents', { page: this.currentPage, limit: 3 })
  }
}
</script>
