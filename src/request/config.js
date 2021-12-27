import { http, get, post, uploadFiles } from './http'

export const getGreetings = () => {
  return get('/greetings')
}

export const makeComment = (p) => {
  return post('/postComment', p)
}

export const login = (p) => {
  return post('/login', p)
}

export const likeGreeting = (p) => {
  return post('/likeGreeting', p)
}

export const reportGreeting = (p) => {
  return post('/reportGreeting', p)
}

export const postGreeting = (p) => {
  return post('/postGreeting', p)
}
