<template>
  <router-link
    class="event-link"
    :to="{ name: 'event-show', params: { id: event.id } }"
  >
    <v-card class="elevation-4 ma-2">
      <v-card-title primary-title>
        <div>
          <div class="headline">{{ event.title }}</div>
          <span class="eyebrow">@{{ event.time }} on {{ event.date }}</span>
          <br />
          <BaseIcon name="users"
            >{{ event.attendees.length }} attending</BaseIcon
          >
        </div>
      </v-card-title>
    </v-card>
  </router-link>
</template>

<script>
export default {
  props: {
    event: Object
  }
}
</script>
