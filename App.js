import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './app/index'; // Импортируем главный экран
import CartScreen from './app/cart'; // Импортируем экран корзины

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Главная" component={HomeScreen} />
        <Tab.Screen name="Корзина" component={CartScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};