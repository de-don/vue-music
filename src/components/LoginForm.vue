<template>
  <div>
    <h1 class="h3 mb-3 font-weight-normal">Please sign in</h1>
    <label for="inputEmail" class="sr-only">Email</label>
    <input type="email" id="inputEmail" class="form-control" placeholder="Email address" required autofocus v-model="email">
    <label for="inputPassword" class="sr-only">Password</label>
    <input type="password" id="inputPassword" class="form-control" placeholder="Password" required v-model="password">
    <div class="checkbox mb-3">
      <label>
        <input type="checkbox" value="remember-me"> Remember me
      </label>
    </div>

    <button class="btn btn-lg btn-primary btn-block" @click="login">Sign in</button>
  </div>
</template>

<script>
import axios from 'axios'
import router from '@/router'

export default {

  inject: ['token'],
  data () {
    return {
      email: '',
      password: '',
      data: '',
      response: '',
      key: ''
    }
  },
  beforeCreate: function () {
    if (this.token) {
      router.push('Dashboard')
    }
  },
  methods: {
    login: function () {
      axios
        .post('http://0.0.0.0:8000/api/v1/auth/login/', {
          email: this.email,
          password: this.password
        })
        .then(
          response => {
            this.response = response
            this.data = response.data
            this.token = response.data.key

            // redirect on dashboard
            router.push('Dashboard')
          },
          error => {
            this.response = error
          }
        )
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
