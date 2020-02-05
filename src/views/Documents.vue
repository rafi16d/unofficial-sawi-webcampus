<template>
  <v-container>
    <v-layout wrap>
      <v-row justify="center">
        <v-col cols="12">
          <v-card>
            <v-card-title>
              Documents
              <v-spacer></v-spacer>
              <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Search"
                single-line
                hide-details
              ></v-text-field>
            </v-card-title>
            <v-data-table
              :headers="headers"
              :items="documents"
              :search="search"
              :items-per-page="10"
              class="elevation-1">
              <template v-slot:item.action="{ item }">
                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-icon small @click="downloadFile(item.link, item.name)" v-on="on">
                      mdi-download
                    </v-icon>
                  </template>
                  <span>Download</span>
                </v-tooltip>
              </template>
            </v-data-table>
          </v-card>
        </v-col>
      </v-row>
    </v-layout>
  </v-container>
</template>
<script>
import { baseUrl } from '@/main'
import { mapActions, mapState } from 'vuex'
import axios from 'axios'

export default {
  name: 'Documents',
  data: () => ({
    search: '',
    headers: [
      { text: 'Teacher', value: 'teacher' },
      { text: 'Date', value: 'date' },
      { text: 'Description', value: 'description' },
      { text: 'Uploaded at', value: 'uploaded' },
      { text: 'Document', value: 'name' },
      { text: 'Actions', value: 'action', sortable: false }
    ],
    current: {},
    dialog: false
  }),
  computed: {
    ...mapState([
      'documents'
    ])
  },
  methods: {
    ...mapActions([
      'getDocuments'
    ]),
    downloadFile (url, name) {
      axios({
        url: `${baseUrl}/document`,
        method: 'POST',
        responseType: 'blob',
        data: {
          url: url,
          name: name
        }
      }).then((response) => {
        // Download URL
        const url = window.URL.createObjectURL(new Blob([response.data]))
        // Create Download Link
        const link = document.createElement('a')
        link.href = url
        // Set the filename
        link.setAttribute('download', name)
        document.body.appendChild(link)
        // Click on the download button
        link.click()

        // Hide loading overlay
        this.loadingDownload = false
      }).catch(() => {
        // Hide loading overlay
        this.loadingDownload = false
      })
    }
  },
  mounted () {
    this.getDocuments()
  }
}
</script>
