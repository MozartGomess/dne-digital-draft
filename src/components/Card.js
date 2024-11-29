import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Card = ({ name, cpf }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.label}>Nome: <Text style={styles.content}>{name}</Text></Text>
      <Text style={styles.label}>CPF: <Text style={styles.content}>{cpf}</Text></Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    margin: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  label: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  content: {
    fontSize: 16,
    color: "#333",
  },
});

export default Card;