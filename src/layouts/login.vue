<template>
  <v-app>
    <v-content class="background">
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="11" sm="6" md="3">
            <router-view></router-view>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: 'loginLayout'
}
</script>

<style scoped>
.background {
  background-image: url("https://source.unsplash.com/1920x1080/?digital,web");
}
</style>
