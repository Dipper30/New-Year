import api from '../request'

export const actions = {
  setToken: ({ commit }, payload) => {
    commit('setToken', payload)
  },
  actUser: async ({ commit }, payload) => {
    const token = localStorage.getItem('token')
    if (!token) return
    const { getUserInfo } =api
    const { data } = await getUserInfo()
    if (!data) return
    commit('setUser', data)
  },
}
