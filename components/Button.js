import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  button: {
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: "center",
    justifyContent: "center",
    width: "46%",
    marginTop: 20,
  },
  text: {
    color: "#fff",
    fontSize: 22,
    textAlign: "center",
    fontFamily:'textFont-bold'

  },
  buttonContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 20,
    justifyContent: "space-between"
  }
});

export const Button = ({ text, onPress, style = () => { } }) => (
  <TouchableOpacity onPress={onPress} style={[style, styles.button]}>
    <Text style={styles.text}>{text}</Text>
  </TouchableOpacity>
);

export const ButtonContainer = ({ children }) => (
  <View style={styles.buttonContainer}>{children}</View>
);
