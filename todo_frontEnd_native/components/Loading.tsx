import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
const Loading = ({ message }) => {
  return (
    <View style={styles.container}>
      <View style={styles.modalView}>
        <Icon name="closecircleo" size={25} color="#fff" />
        <Text style={styles.textStyle}>{message}</Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginBottom: 10,
  },
  modalView: {
    padding: 5,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    height: 50,
    backgroundColor: "#8D9EFF",
    borderRadius: 8,
  },
  textStyle: {
    color: "white",
    textAlign: "center",
    fontSize: 18,
    marginLeft: 10,
  },
});
export default Loading;
