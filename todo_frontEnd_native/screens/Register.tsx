import React, { useEffect, useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/AntDesign";
import tw from "tailwind-react-native-classnames";
import { cognitoPool } from "../utils/cognito-pool";

const Register = ({ navigation, route }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const registerUser = () => {
    cognitoPool.signUp(email, password, [], null, (err, data) => {
      console.log(err, "error", data, "data...");
      if (err) {
        switch (err.name) {
          case "InvalidParameterException":
            return Alert.alert(
              "Invalid Email provided",
              "Try again with valid email-id"
            );
          case "InvalidPasswordException":
            return Alert.alert(
              "Invalid Password provided",
              "Please provide password with atleast 1 Uppercase letter"
            );
          case "UsernameExistsException":
            return Alert.alert(
              "Email id already exists.",
              "Please register with different Email."
            );
          default:
            return Alert.alert(
              "Something went wrong!",
              "Please try to register again."
            );
        }
      }

      Alert.alert("Registration successful", "redirecting to login page...", [
        { text: "OK", onPress: () => navigation.navigate("login") },
      ]);
    });
  };
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
              style={tw`h-8 rounded-md border border-transparent py-1 px-2 font-bold text-white bg-blue-400 text-center flex items-center flex-row justify-center`}
              onPress={() => registerUser()}
            >
              <Text style={[tw`text-center text-md`, { color: "white" }]}>
                Register
              </Text>
            </TouchableOpacity>
            <View style={[tw`mt-3`, { color: "white" }]}>
              <TouchableOpacity
                style={tw`h-8 rounded-md border border-transparent py-1 px-2 font-bold text-white bg-purple-500 text-center flex items-center flex-row justify-center`}
                onPress={() => {
                  navigation.navigate("login");
                }}
              >
                <Text style={[tw`text-center text-md`, { color: "white" }]}>
                  Already registered, Login Now!
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Register;

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
