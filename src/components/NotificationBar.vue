<template>
  <div class="notification-bar" :class="notificationTypeClass">
    <p>{{ notification.message }}</p>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { setTimeout, clearTimeout } from 'timers'

export default {
  data() {
    return {
      timeout: null
    }
  },
  props: {
    notification: {
      type: Object,
      required: true
    }
  },
  computed: {
    notificationTypeClass() {
      return `-text-${this.notification.type}`
    }
  },
  methods: mapActions('notification', ['removeNotification']),
  beforeDestroy() {
    clearTimeout(this.timeout)
  },
  mounted() {
    this.timeout = setTimeout(
      () => this.removeNotification(this.notification),
      5000
    )
  }
}
</script>

<style lang="scss" scoped>
.notification-bar {
  margin: 1em 0 1em;
}
</style>
