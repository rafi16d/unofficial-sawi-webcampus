<template>
  <v-container>
    <v-layout wrap>
      <v-row class="fill-height">
        <v-col>
          <v-sheet height="64">
            <v-toolbar flat color="white">
              <v-btn outlined class="mr-4" @click="setToday">
                Today
              </v-btn>
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
                  <v-list-item @click="type = '4day'">
                    <v-list-item-title>4 days</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </v-toolbar>
          </v-sheet>
          <v-sheet height="600">
            <v-calendar
              ref="calendar"
              color="primary"
              :events="schedule"
              :event-color="getEventColor"
              :type="type"
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
            </v-calendar>
          </v-sheet>
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
    type: 'month',
    typeToLabel: {
      month: 'Month',
      week: 'Week',
      day: 'Day',
      '4day': '4 Days'
    },
    start: null,
    end: null,
    selectedEvent: {},
    selectedElement: null,
    selectedOpen: false
  }),
  computed: {
    ...mapState([
      'schedule'
    ]),
    title () {
      const { start, end } = this
      if (!start || !end) {
        return ''
      }

      const startMonth = this.monthFormatter(start)
      const endMonth = this.monthFormatter(end)
      const suffixMonth = startMonth === endMonth ? '' : endMonth

      const startYear = start.year
      const endYear = end.year
      const suffixYear = startYear === endYear ? '' : endYear

      const startDay = start.day + this.nth(start.day)
      const endDay = end.day + this.nth(end.day)

      switch (this.type) {
        case 'month':
          return `${startMonth.charAt(0).toUpperCase() + startMonth.slice(1)} ${startYear}`
        case 'week':
        case '4day':
          return `${startMonth.charAt(0).toUpperCase() + startMonth.slice(1)} ${startDay} ${startYear} - ${suffixMonth} ${endDay} ${suffixYear}`
        case 'day':
          return `${startMonth.charAt(0).toUpperCase() + startMonth.slice(1)}${startDay} ${startYear}`
      }
      return ''
    },
    monthFormatter () {
      return this.$refs.calendar.getFormatter({
        timeZone: 'UTC', month: 'long'
      })
    }
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
