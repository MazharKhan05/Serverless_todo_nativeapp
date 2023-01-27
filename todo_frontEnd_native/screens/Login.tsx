import React, { useEffect, useState } from "react";
import {
  AccessibilityInfo,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "tailwind-react-native-classnames";
import * as SecureStore from "expo-secure-store";
import { cognitoPool } from "../utils/cognito-pool";
import { AuthenticationDetails, CognitoUser } from "amazon-cognito-identity-js";
import checkSession from "../utils/checkUserSession";

const Login = ({ navigation, route }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    console.log("in here...");
    const sessionStat = checkSession();
    sessionStat
      .then((userSession) => {
        console.log("userSeesion", userSession);
        if (userSession.isLoggedIn) {
          setIsAuthenticated(true);
          console.log("already loggedIn...", userSession);
          navigation.navigate("Home");
        } else {
          console.log("in here, after logout"); //user not loggedIn
        }
      })
      .catch((err) => {
        console.log("getSession err...", err);
      });
  }, []);
  const loginUser = async () => {
    let loginSuccess = false;
    let id_token;
    const user = new CognitoUser({
      Username: email,
      Pool: cognitoPool,
    });
    const authDetails = new AuthenticationDetails({
      Username: email,
      Password: password,
    });
    user.authenticateUser(authDetails, {
      onSuccess: async (res) => {
        let authTokens = {
          id_token: "",
          access_token: "",
        };
        loginSuccess = true;
        const id_token = res?.getIdToken().getJwtToken();
        const access_token = String(res?.getAccessToken());
        authTokens.id_token = String(id_token);
        authTokens.access_token = String(access_token);
        const userTokens = JSON.stringify(authTokens);
        await SecureStore.setItemAsync("authToken", id_token);
        console.log(
          "keychain result...",
          await SecureStore.getItemAsync("authToken")
        );
        console.log("login response from idp...", res);
        navigation.navigate("Home");
        // Alert.alert("Login successful", "redirecting to home page...", [
        //   { text: "OK", onPress: () => navigation.navigate("Home") },
        // ]);
      },
      onFailure: (err) => {
        console.log("err login...", err);
        switch (err.name) {
          case `UserNotConfirmedException`:
            return Alert.alert(
              "User not confirmed",
              "cannot login user, as user is not confirmed."
            );
          case `NotAuthorizedException`:
            return Alert.alert(
              "Incorrect Credentials!",
              "Please provide correct email and password."
            );
          default:
            return Alert.alert(
              "Something went wrong.",
              "Please try again after some time."
            );
        }
      },
    });
    // if (loginSuccess) {
    //   await SecureStore.setItemAsync("authToken", id_token);
    //   navigation.navigate("Home");
    // }
  };
  // const handleLogin = () => {
  //   loginUser()
  //     .then((res) => {
  //       console.log("login done, now redirecting", res);
  //       setTimeout(() => {
  //         navigation.navigate("Home");
  //       }, 3000);
  //     })
  //     .catch((err) => {
  //       console.log("error while logging in...", err);
  //     });
  // };
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "white",
        width: "100%",
      }}
    >
      <ScrollView>
        <View style={styles.container}>
          <View style={tw`w-3/4 border border-blue-400 rounded-lg p-3`}>
            <TextInput
              onChangeText={(text) => setEmail(text)}
              value={email}
              textContentType="emailAddress"
              autoFocus={true}
              autoCapitalize="none"
              style={[
                tw`text-lg border-b-2 border-gray-200 p-1 mb-3`,
                { height: 40 },
              ]}
              placeholder="Enter email"
            />
            <TextInput
              onChangeText={(text) => setPassword(text)}
              value={password}
              textContentType="password"
              secureTextEntry={true}
              style={[
                tw`text-lg border-b-2 border-gray-200 mb-3`,
                { height: 40 },
              ]}
              placeholder="Enter password"
            />
            <TouchableOpacity
              style={tw`flex items-center flex-row justify-center h-8 rounded-md border border-transparent py-1 px-2 font-bold text-white bg-blue-400 text-center`}
              onPress={() => loginUser()}
            >
              <Text style={[tw`text-center text-md`, { color: "white" }]}>
                Login
              </Text>
            </TouchableOpacity>
            <View style={[tw`mt-3`, { color: "white" }]}>
              <TouchableOpacity
                style={tw`h-8 rounded-md border border-transparent py-1 px-2 font-bold text-white bg-purple-500 text-center flex items-center flex-row justify-center`}
                onPress={() => {
                  navigation.navigate("Register");
                }}
              >
                <Text style={[tw`text-center text-md`, { color: "white" }]}>
                  Sign-up Now!
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#fff",
    width: "100%",
    height: "100%",
  },
});
