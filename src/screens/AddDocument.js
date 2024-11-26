// screens/AddDocument.js
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { getDocumentData } from "../services/api";
import DocumentCard from "../components/DocumentCard";

const AddDocument = ({ route, navigation }) => {
  const { documentId } = route.params;
  console.log(`documentId: ${documentId}`);
  // Realiza a analise (parse) de data para extrair a informação do documento
  const documentInfo = getDocumentData(documentId);
  console.log(`documentInfo: ${documentInfo}`);
  const handleAdd = () => {
    // Add document to state/storage
    getDocumentData(documentId);
    navigation.navigate("Home");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Adicionar</Text>
      <Text style={styles.text}>Verifique as informações do seu documento</Text>
      <DocumentCard documentInfo={documentInfo} />
      <TouchableOpacity style={styles.addButton} onPress={handleAdd}>
        <Text style={styles.addButtonText}>Adicionar</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.cancelButton}
        onPress={() => navigation.navigate("Home")}
      >
        <Text>Cancelar</Text>
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
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
  },
  addButton: {
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  cancelButton: {
    backgroundColor: "#f44336",
    padding: 10,
    borderRadius: 5,
  },
});
export default AddDocument;
