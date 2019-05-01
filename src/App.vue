<template>
  <v-app id="inspire">
    <NavBar />
    <Toolbar />
    <v-content>
      <v-container fluid fill-height>
        <v-layout justify-center align-center>
          <v-flex text-xs-center>
            <router-view :key="$route.fullPath" />
            <NotificationContainer />
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
    <v-footer color="indigo" app>
      <span class="white--text">&copy; 2019</span>
    </v-footer>
  </v-app>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import NotificationContainer from '@/components/NotificationContainer.vue'
import Toolbar from '@/components/Toolbar.vue'

export default {
  components: {
    NavBar,
    NotificationContainer,
    Toolbar
  }
}
</script>
