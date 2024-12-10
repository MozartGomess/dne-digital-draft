// screens/GetStarted.js
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";



const GetStarted = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Animated Card */}
      <View style={styles.card}>{/* Implement animation here */}</View>
      <Text style={styles.title}>Seu Documento Estudantil todo Digital.</Text>
      <Text style={styles.paragraph}>
        Digitalize seu Documento Nacional do Estudante válido através do QR Code
        e tenha ele sempre disponível no seu dispositivo!
      </Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Home")} 
      >
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>
    </View>
  );
};

// Add styles here
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#90ee90",
  },
  card: {
    width: "100%",
    height: 200,
    backgroundColor: "#f8f8f8",
    borderRadius: 10,
    marginBottom: 20,
    justifyContent: "center",
    alignItems: "center",
    // Add additional styles for the animated card here
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
    textAlign: "center",
  },
  paragraph: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#ffa500",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default GetStarted;
