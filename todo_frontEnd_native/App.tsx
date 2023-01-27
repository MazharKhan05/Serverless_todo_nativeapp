import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import tw from "tailwind-react-native-classnames";
import * as SecureStore from "expo-secure-store";
import Todos from "./screens/Todos";
import showHistory from "./screens/ShowHistory";
import Register from "./screens/Register";
import Login from "./screens/Login";

export default function App() {
  const [userToken, setUserToken] = useState("");
  const Stack = createNativeStackNavigator();
  const isAuthenticated = false;
  const getAuthToken = async () => {
    let token = await SecureStore.getItemAsync("access_token");
    setUserToken(token);
  };
  useEffect(() => {
    getAuthToken();
  }, []);
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Todos} />
        <Stack.Screen
          name="login"
          component={Login}
          options={({ route, navigation }) => ({
            title: "Login",
          })}
        />

        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="TodoHistory" component={showHistory} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
    minHeight: "100%",
    backgroundColor: "#fff",
    flexDirection: "column",
  },
});
