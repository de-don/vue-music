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
import axios from 'axios'

export default {

  inject: ['token'],
  data () {
    return {
      tracks: []
    }
  },
  watch:{
    $route (to, from){
        alert(to + '___' + from)
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.get_tracks()
    })
  },

  methods: {
    get_tracks: function () {
      axios
        .get('http://0.0.0.0:8000/api/v1/music_store/tracks/', {
          headers: {
            Authorization: 'Token: ' + this.token
          }
        })
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
