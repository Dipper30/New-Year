export const getters = {
  getToken: state => {
    return state.token || localStorage.getItem('token')
  },
  getUserName: state => {
    return state.user?.username || null
  },
  getUser: state => {
    return state.user
  },
  // getUser: state => {
  //   return state.user || JSON.parse(localStorage.getItem('user'))
  // },
  getUserID: state => {
    return state.user?.id || 0
  },
  getNews: state => {
    return state.news
  },
}
