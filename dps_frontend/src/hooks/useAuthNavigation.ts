import {useNavigation, NavigationProp} from '@react-navigation/native';
import useUserStore from '../stores/user';

export type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  Protected: undefined;
  Register: undefined;
};

const useAuthNavigation = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const user = useUserStore(state => state.user);

  const navigate = (screen: keyof RootStackParamList) => {
    if ((screen === 'Login' || screen === 'Register') && user) {
      return;
    }
    navigation.navigate(screen);
  };

  return {navigate};
};

export default useAuthNavigation;
