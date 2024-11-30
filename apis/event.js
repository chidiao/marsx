import http from './http';

export const getEventInfo = (...args) => http.get('/v1/activity/info', ...args);

export const bookEvent = (activity_uid, ...args) =>
  http.post(
    '/v1/activity/booking', {
      activity_uid
    },
    ...args
  );