import Http from './Http';

export default {
  get() {
    return Http.get('doctors');
  },
};
