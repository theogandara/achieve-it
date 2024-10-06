import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../pages/Home/Home';
import Login from '../pages/Login/Login';
import MyList from '../pages/MyList/MyList';
import MyProjects from '../pages/MyProjects/MyProjects';
import QuitHabits from '../pages/QuitHabits/QuitHabits';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createNativeStackNavigator();
export type RootStackParamList = {
  Login: undefined;
  MyList: undefined;
  MyProjects: undefined;
  QuitHabits: undefined;
  Details: undefined;
  Home: undefined;
};

export default function Main() {
  const theme = {
    dark: true,
    colors: {
      primary: '#ffffff',
      background: '#1c1c1e',
      card: '#1c1c1e',
      text: '#ffffff',
      border: '#3c3c3e',
      notification: '#ff453a',
    },
  };

  return (
    <NavigationContainer theme={theme}>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            gestureEnabled: false,
          }}
        />
        <Stack.Screen
          name="MyProjects"
          component={MyProjects}
          options={{
            animation: 'slide_from_left',
            gestureDirection: 'horizontal',
            customAnimationOnGesture: true,
          }}
        />
        <Stack.Screen name="QuitHabits" component={QuitHabits} />

        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="MyList" component={MyList} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
