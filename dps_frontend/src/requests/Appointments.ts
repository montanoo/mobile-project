import Http from './Http';

export default {
  create(data) {
    return Http.post('appointments', {...data});
  },
};
