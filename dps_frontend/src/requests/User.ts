import Http from './Http';

interface ILoginUserData {
  email: string;
  password: string;
}

interface IRegisterStudentData extends ILoginUserData {
  roleId: number;
}

export default {
  login(data: ILoginUserData) {
    return Http.post('login', {...data});
  },
  register(data: IRegisterStudentData) {
    return Http.post('/user/register', {...data});
  },
};
