import api from '../request'

export const actions = {
  setToken: ({ commit }, payload) => {
    commit('setToken', payload)
  },
  actUser: async ({ commit }, payload) => {
    const token = localStorage.getItem('token')
    if (!token) return
    const { getUserInfo } = api
    const { data } = await getUserInfo()
    if (!data) return
    commit('setUser', data)
  },
  fetchMessages: async ({ commit }, payload) => {
    const { getMessages } = api
    const { code, data } = await getMessages()
    if (!data) commit('setNews', 0)
    else {
      const { messages, news } = data
      commit('setNews', news)
    }
  },
}
