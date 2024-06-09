import Http from './Http';

interface ILoginUserData {
  email: string;
  password: string;
}

interface IRegisterStudentData extends ILoginUserData {
  role: number;
}

export default {
  login(data: ILoginUserData) {
    return Http.post('login', {...data});
  },
  register(data) {
    return Http.post('register', {...data});
  },
  appointments() {
    return Http.get('appointments/1');
  },
};
