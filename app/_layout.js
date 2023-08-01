import { createStackNavigator } from "@react-navigation/stack";
import CameraScreen from "./camera";
import GalleryScreen from "./gallery";
import { store } from "../store";
import { Provider } from "react-redux";

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Provider store={store}>
      <Stack.Navigator>
        <Stack.Screen
          name="camera"
          component={CameraScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="gallery"
          component={GalleryScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </Provider>
  );
};

export default AppNavigator;
