import router from '@/router/router'
import store from '@/store/store'
import { DASHBOARD_PAGE } from '@/router/routes'
import { LOGIN_MUTATION, LOGOUT_MUTATION } from '@/store/mutations-types'
import { TOKEN_GETTER, AUTHENTICATED_GETTER } from '@/store/getter-types'
import config from '@/config'
import axios from 'axios'

const HTTP = axios.create({
  baseURL: config.api.url,
  headers: {
    Authorization: `Token  ${getToken()}`
  }
})

function login (email, password) {
  HTTP.post('auth/login/', {
    email: email,
    password: password
  }).then((response) => {
    console.log(response)
    console.log(response.data)
    console.log(response.data.key)
    saveToken(response.body.token)
    router.push(DASHBOARD_PAGE)
  })
}

/**
   * Refreshes the auth token.
  refreshToken () {
    return authResource.refreshToken().then((response) => {
      this.saveToken(response.body.token)
      return response.body.token
    })
  },
   */

/**
   * User logout.
  logout () {
    authResource.logout().then(() => {
      router.push(HOME_PAGE)
    })
    this.removeToken()
  },
   */

/**
   * Saves the token to the storage.
   *
   * @param {string} token
   */

function saveToken (token) {
  store.commit(LOGIN_MUTATION, token)
}

function removeToken () {
  store.commit(LOGOUT_MUTATION)
}

/**
   * Returns TRUE if the current user is authenticated.
   *
   * @return {boolean}
   */

function isAuthenticated () {
  return store.getters[AUTHENTICATED_GETTER]
}

/**
   * Returns auth token.
   *
   * @return {*}
   */

function getToken () {
  return store.getters[TOKEN_GETTER]
}

export default {login, saveToken, removeToken, isAuthenticated, getToken}
