<template>
  <v-alert :value="true" :type="notification.type" dismissible>{{
    notification.message
  }}</v-alert>
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
