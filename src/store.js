import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    schedule: [{}],
    news: [],
    teachers: [],
    students: [],
    documents: [],
    courses: {},
    auth: false,
    displayName: '',
    courseId: '',
    courseName: '',
    classroomId: ''
  },
  getters: {
    isLogged: state => {
      return !!state.auth
    }
  },
  actions: {
    getTeachers: async ({ commit }) => {
      await axios
        .get('teachers')
        .then(r => r.data)
        .then(teachers => {
          commit('setTeachers', teachers)
        })
    },
    getDocuments: async ({ commit }) => {
      await axios
        .get('documents')
        .then(r => r.data)
        .then(documents => {
          commit('setDocuments', documents)
        })
    },
    getSchedule: async ({ commit }) => {
      await axios
        .get('schedule')
        .then(r => r.data)
        .then(schedule => {
          commit('setSchedule', schedule)
        })
    },
    getStudents: async ({ commit }) => {
      await axios
        .get('students')
        .then(r => r.data)
        .then(students => {
          commit('setStudents', students)
        })
    },
    login: async ({ commit }, { username, password }) => {
      await axios
        .post('login', {
          username: btoa(username),
          password: btoa(password)
        })
        .then(r => r.data)
        .then(course => {
          if (course) {
            commit('setAuth', btoa(username) + '||' + btoa(password) + '||' + btoa(course.course_id) + '||' + btoa(course.classroom_id))
            commit('setSettings', course)
            commit('setDisplayName', course.displayName)
          }
        })
    },
    fetchAuthToken ({ commit }) {
      commit('setAuth', localStorage.getItem('auth'))
      commit('setDisplayName', localStorage.getItem('name'))
    }
  },
  mutations: {
    setDocuments: (state, payload) => {
      state.documents = payload
    },
    setTeachers: (state, payload) => {
      state.teachers = payload
    },
    setSchedule: (state, payload) => {
      state.schedule = payload
    },
    setStudents: (state, payload) => {
      state.students = payload
    },
    setAuth: (state, auth) => {
      if (auth) {
        state.auth = auth
        axios.defaults.headers.common['Authorization'] = auth
        localStorage.setItem('auth', auth)
      }
    },
    setDisplayName: (state, name) => {
      if (name) {
        state.displayName = name
        localStorage.setItem('name', name)
      }
    },
    setSettings: (state, payload) => {
      state.courseId = payload.course_id
      state.classroomId = payload.classroom_id
      state.courseName = payload.name
    }
  }
})
