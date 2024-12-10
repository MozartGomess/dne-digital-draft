import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Modal, Image } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons"; // Usando ícones do Material Icons
import AsyncStorage from "@react-native-async-storage/async-storage";
import DocumentCard from "../components/DocumentCard";

const DocumentDetails = ({ route, navigation }) => {
  const { item } = route.params;
  const [modalVisible, setModalVisible] = useState(false);

  const handleDelete = async () => {
    try {
      const storedDocuments = await AsyncStorage.getItem("documents");
      const documentList = storedDocuments ? JSON.parse(storedDocuments) : [];
      const updatedDocumentList = documentList.filter(doc => doc._id !== item._id);
      await AsyncStorage.setItem("documents", JSON.stringify(updatedDocumentList));
      setModalVisible(false);
      navigation.navigate("Home");
    } catch (error) {
      console.error("Error deleting document", error);
    }
  };

  return (
    <View style={styles.container}>
      {/* Display document details using DocumentCard */}
      <DocumentCard {...item} />

      {/* Button to show delete confirmation */}
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.deleteButtonText}>Excluir</Text>
      </TouchableOpacity>

      {/* Delete Confirmation Modal */}
      <Modal transparent={true} visible={modalVisible}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text>Excluir documento</Text>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text>X</Text>
            </TouchableOpacity>
            <Text>Tem certeza que deseja excluir este documento?</Text>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleDelete}
              style={styles.confirmDeleteButton}
            >
              <Text style={styles.confirmDeleteButtonText}>Excluir</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Footer Image */}
      <Image
        source={require("../../assets/logo2.png")} // Substitua pelo caminho da sua imagem
        style={styles.footerImage}
      />
    </View>
  );
};

// Add styles here
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff", // Fundo branco
    paddingTop: 60, // Aumenta o espaço superior para descer o conteúdo
  },
  deleteButton: {
    position: "absolute",
    top: 20,
    right: 30,
    padding: 10,
    backgroundColor: "red",
    borderRadius: 5,
  },
  deleteButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    alignItems: "center",
  },
  confirmDeleteButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "red",
    borderRadius: 5,
  },
  confirmDeleteButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  footerImage: {
    width: "100%",
    height: 100,
    resizeMode: "contain",
    position: "absolute",
    bottom: 20, // Ajuste a posição da imagem para subir um pouco
  },
});

export default DocumentDetails;
