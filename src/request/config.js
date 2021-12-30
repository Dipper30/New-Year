import { http, get, post, uploadFiles } from './http'

export const getGreetings = () => {
  return get('/greetings')
}

export const makeComment = (p) => {
  return post('/postComment', p)
}

export const deleteComment = (p) => {
  return post('/deleteComment', p)
}

export const deleteGreeting = (p) => {
  return post('./deleteGreeting', p)
}

export const login = (p) => {
  return post('/login', p)
}

export const getUserInfo = () => {
  return post('token')
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

// message
export const getMessages = () => {
  return get('/messages')
}

export const checkMessage = (p) => {
  return post('/checkMessage', p)
}

export const postFeedback = (p) => {
  return post('/feedback', p)
}

export const participate = (p) => {
  return post('/participate', p)
}

export const checkParticipation = (p) => {
  return get('/checkParticipation', p)
}