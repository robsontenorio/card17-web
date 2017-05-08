import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

function load(name) {
  return (resolve) => require([`../components/${name}.vue`], resolve)
}

export default new Router({
  mode: 'history',
  // linkActiveClass: 'is-active',
  routes: [
    {
      path: '/',
      component: load('pages/Hello')
    },
    {
      path: '/hello2',
      component: load('pages/Hello2'),
      meta: {auth: true}
    },
    {
      path: '/home',
      component: load('pages/Home'),
      meta: {auth: true}
    },
    {
      path: '/login',
      component: load('pages/Login')
    },
    {
      path: '/register',
      component: load('pages/Register')
    },
    {
      path: '/decks/pandora',
      component: load('pages/DecksPandora')
    },
    {
      path: '/decks/battle',
      component: load('pages/DecksBattle')
    },
    {
      path: '/decks/:id',
      component: load('pages/Deck')
    },
    {
      path: '*',
      component: load('pages/404')
    }
  ]
})
