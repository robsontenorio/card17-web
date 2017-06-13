import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

function load(name) {
  return (resolve) => require([`../components/${name}.vue`], resolve)
}

export default new Router({
  mode: 'history',
  // linkActiveClass: 'is-active',
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 }
  },
  routes: [
    { path: '/', component: load('pages/Hello') },
    { path: '/version', component: load('pages/Version') },
    { path: '/home', component: load('pages/Home'), meta: { auth: true } },
    { path: '/login', component: load('pages/Login') },
    { path: '/register', component: load('pages/Register') },
    { path: '/decks/pandora', component: load('pages/DecksPandora'), meta: { auth: true } },
    { path: '/decks/battle', component: load('pages/DecksBattle'), meta: { auth: true } },
    { path: '/decks/:id', component: load('decks/Deck') },
    { path: '/decks/:id/edit', component: load('decks/DeckEdit'), meta: { auth: true } },
    { path: '*', component: load('pages/404') }
  ]
})
