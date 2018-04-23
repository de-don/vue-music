<template>
  <div class="container">
    Tracks:
    <ul>
      <li v-for="track in tracks" v-bind:key="track.id">
        {{track.title}}
      </li>
    </ul>
    <button @click="get_tracks">Get</button>
  </div>
</template>

<script>
import config from '@/config'
import axios from 'axios'

export default {
  data () {
    return {
      tracks: []
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.get_tracks()
    })
  },
  methods: {
    get_tracks: function () {
      let url = config.api.url + 'music_store/tracks/'
      axios
        .get(url, {})
        .then(
          response => {
            this.tracks = response.data
          },
          error => {
            alert(error)
          }
        )
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
