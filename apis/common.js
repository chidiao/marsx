import http from './http'

export const getHomeBanner = (...args) => http.post('/v1/banner/home', ...args)
