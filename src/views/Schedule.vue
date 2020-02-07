<template>
  <v-container>
    <v-layout wrap>
      <v-row class="fill-height">
        <v-col>
          <v-card class="pa-5">
            <v-card-title>Calendar</v-card-title>
            <v-card-text>
              <v-sheet height="64">
                <v-toolbar flat color="white">
                  <v-btn fab text small @click="prev">
                    <v-icon small>mdi-chevron-left</v-icon>
                  </v-btn>
                  <v-btn fab text small @click="next">
                    <v-icon small>mdi-chevron-right</v-icon>
                  </v-btn>
                  <v-toolbar-title>{{ title }}</v-toolbar-title>
                  <v-spacer></v-spacer>
                  <v-menu bottom right>
                    <template v-slot:activator="{ on }">
                      <v-btn
                        outlined
                        v-on="on"
                      >
                        <span>{{ typeToLabel[type] }}</span>
                        <v-icon right>mdi-menu-down</v-icon>
                      </v-btn>
                    </template>
                    <v-list>
                      <v-list-item @click="type = 'day'">
                        <v-list-item-title>Day</v-list-item-title>
                      </v-list-item>
                      <v-list-item @click="type = 'week'">
                        <v-list-item-title>Week</v-list-item-title>
                      </v-list-item>
                      <v-list-item @click="type = 'month'">
                        <v-list-item-title>Month</v-list-item-title>
                      </v-list-item>
                    </v-list>
                  </v-menu>
                </v-toolbar>
              </v-sheet>
              <v-sheet height="600">
                <v-calendar
                  ref="calendar"
                  v-model="value"
                  :weekdays="[1,2,3,4,5,6,0]"
                  :first-interval="7"
                  :interval-count="17"
                  :type="type"
                  :events="schedule"
                  :event-overlap-mode="mode"
                  :event-overlap-threshold="30"
                  :event-color="getEventColor">
                  <template slot="event" slot-scope="day">
                    <div class="pl-1">
                      <template v-if="type === 'month'">
                        <strong>{{ day.event.start.substr(-5) }}</strong> {{ day.event.name }}
                      </template>
                      <template v-else>
                        {{ day.event.name }}<br>
                        <strong>{{ day.event.start.substr(-5) }}</strong> - <strong>{{ day.event.end.substr(-5) }}</strong><br>
                        {{ day.event.teacher }}
                      </template>
                    </div>
                  </template>
                </v-calendar>
                <!--<v-calendar
                  ref="calendar"
                  color="primary"
                  :events="schedule"
                  :event-color="getEventColor"
                  :type="type"
                  :now="today"
                  :weekdays="[1,2,3,4,5,6,0]"
                  :first-interval="7"
                  :interval-count="17"
                  locale="fr"
                  @click:more="viewDay"
                  @click:date="viewDay"
                  @change="updateRange">
                  <template slot="event" slot-scope="day">
                    <div class="pl-1">
                      <template v-if="type === 'month'">
                        <strong>{{ day.event.start.substr(-5) }}</strong> {{ day.event.name }}
                      </template>
                      <template v-else>
                        {{ day.event.name }}<br>
                        <strong>{{ day.event.start.substr(-5) }}</strong> - <strong>{{ day.event.end.substr(-5) }}</strong><br>
                        {{ day.event.teacher }}
                      </template>
                    </div>
                  </template>
                </v-calendar>-->
              </v-sheet>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <!--<v-row>
        <v-col>
          <v-list subheader three-line>
            <template v-for="(event, i) in events">
            <v-subheader :key="'event_subheader_' + i">{{Month}}</v-subheader>
              <v-list-item :key="'event_' + i">
                <v-list-item-content>
                  <v-list-item-title>{{event.name}}</v-list-item-title>
                  <v-list-item-subtitle class="text--primary">{{event.start}}</v-list-item-subtitle>
                  <v-list-item-subtitle v-html="event.teacher"></v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-divider :key="'event_divider_' + i"></v-divider>
            </template>
          </v-list>
        </v-col>
      </v-row>-->
    </v-layout>
  </v-container>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'Schedule',
  data: () => ({
    type: 'week',
    typeToLabel: {
      month: 'Month',
      week: 'Week',
      day: 'Day'
    },
    today: new Date().toISOString().substr(0, 10),
    start: null,
    end: null,
    value: '',
    selectedEvent: {},
    selectedElement: null,
    selectedOpen: false
  }),
  computed: {
    ...mapState([
      'schedule'
    ])
  },
  methods: {
    ...mapActions([
      'getSchedule'
    ]),
    viewDay ({ date }) {
      this.focus = date
      this.type = 'day'
    },
    getEventColor (event) {
      return event.color
    },
    setToday () {
      this.focus = this.today
    },
    prev () {
      this.$refs.calendar.prev()
    },
    next () {
      this.$refs.calendar.next()
    },
    updateRange ({ start, end }) {
      // You could load events from an outside source (like database) now that we have the start and end dates on the calendar
      this.start = start
      this.end = end
    },
    nth (d) {
      return d > 3 && d < 21
        ? 'th'
        : ['th', 'st', 'nd', 'rd', 'th', 'th', 'th', 'th', 'th', 'th'][d % 10]
    }
  },
  mounted () {
    this.getSchedule()
  }
}
</script>
