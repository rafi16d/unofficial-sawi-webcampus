<template>
  <v-container>
    <v-layout wrap>
      <v-row>
        <v-col v-for="student in students" :key="student.name" cols="12" sm="3" xs="12">
          <v-card class="mx-auto" outlined>
            <v-list-item three-line @click="openDialog(student)">
              <v-list-item-avatar size="80">
                <v-img :src="student.avatar"></v-img>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title class="headline mb-1" v-text="student.name"></v-list-item-title>
                <v-list-item-subtitle>{{student.email}}</v-list-item-subtitle>
                <v-list-item-subtitle>{{student.phone}}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-card>
        </v-col>
      </v-row>
      <v-dialog v-model="dialog" transition="dialog-bottom-transition" max-width="500">
        <v-card>
          <v-card-title>
            {{current.name}}
            <v-spacer></v-spacer>
            <v-btn icon @click="dialog = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-card-title>

          <div class="text-center">
            <v-avatar size="125" class="ma-5">
              <v-img :src="current.avatar" :alt="current.name" aspect-ratio="1"></v-img>
            </v-avatar>
          </div>

          <v-list two-line>
            <v-list-item>
              <v-list-item-icon>
                <v-icon color="indigo">mdi-phone</v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title>{{current.phone}}</v-list-item-title>
                <v-list-item-subtitle>Mobile</v-list-item-subtitle>
              </v-list-item-content>

            </v-list-item>

            <v-divider inset></v-divider>

            <v-list-item>
              <v-list-item-icon>
                <v-icon color="indigo">mdi-email</v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title>{{current.email}}</v-list-item-title>
                <v-list-item-subtitle>Personal</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

            <v-divider inset></v-divider>

            <v-list-item>
              <v-list-item-icon>
                <v-icon color="indigo">mdi-map-marker</v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title>{{current.address_private}}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card>
      </v-dialog>
    </v-layout>
  </v-container>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'Classroom',
  data: () => ({
    current: {},
    dialog: false
  }),
  computed: {
    ...mapState([
      'students'
    ])
  },
  methods: {
    ...mapActions([
      'getStudents'
    ]),
    openDialog (student) {
      this.dialog = true
      this.current = student
    }

  },
  mounted () {
    this.getStudents()
  }
}
</script>
