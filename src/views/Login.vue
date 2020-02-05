<template>
  <v-card class="elevation-12">
    <v-toolbar color="primary" dark flat class="px-4">
      <v-toolbar-title>Sign in</v-toolbar-title>
      <v-spacer />
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn icon large target="_blank" v-on="on">
            <v-icon>mdi-help-circle-outline</v-icon>
          </v-btn>
        </template>
        <span>Help</span>
      </v-tooltip>
    </v-toolbar>
    <v-card-text class="pb-0">
      <v-form
        ref="form"
        v-model="valid"
        lazy-validation>
        <v-container fluid>
          <v-row>
            <v-col cols="12" class="py-0">
              <v-text-field
                outlined
                v-model="username"
                :rules="[v => !!v || 'Required.']"
                name="input-10-1"
                label="Username"
              ></v-text-field>
            </v-col>
            <v-col cols="12" class="py-0">
              <v-text-field
                outlined
                v-model="password"
                :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="[v => !!v || 'Required.']"
                :type="show ? 'text' : 'password'"
                name="input-10-1"
                label="Password"
                @click:append="show = !show"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </v-card-text>
    <v-card-actions class="pt-0 px-4">
      <v-container fluid>
        <v-row>
          <v-col cols="12" class="text-right pt-0">
            <v-btn @click="validate" depressed large>
              Sign In
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapMutations, mapActions, mapState } from 'vuex'
import { mapWaitingActions } from 'vue-wait'
import { router } from '@/main'

export default {
  name: 'Login',
  data () {
    return {
      valid: true,
      username: '',
      password: '',
      show: ''
    }
  },
  computed: {
    ...mapState([
      'courseId'
    ])
  },
  watch: {
    courseId: (v) => {
      if (v) {
        router.push('Home')
      }
    }
  },
  methods: {
    ...mapActions([
      'login'
    ]),
    ...mapMutations([
      'setAuth'
    ]),
    validate () {
      if (this.$refs.form.validate()) {
        this.login({ username: this.username, password: this.password })
        // this.setAuth(btoa(this.username + '||' + this.password))
      }
    }
  }
}
</script>
