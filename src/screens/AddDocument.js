// screens/AddDocument.js
import React, { useEffect, useState } from "react";
import { ActivityIndicator, View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { getDocumentData, getToken } from "../services/api";
import DocumentCard from "../components/DocumentCard";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AddDocument = ({ route, navigation }) => {
  const { data } = route.params;

  const [documentInfo, setDocumentInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDocumentData = async () => {
      const parsedData = await parseDocumentData(data);
      setDocumentInfo(parsedData);
      setLoading(false);
    };

    fetchDocumentData();
  }, [data]);

  const parseDocumentData = async (data) => {
    const documentData = await getDocumentData(data);
    console.log("Document data 2:", documentData);
    if (!documentData || documentData.length === 0) {
      Alert.alert("Erro", "Você não tem permissão para adicionar este documento.");
      navigation.navigate("Home");
      return null;
    }

    const token = await getToken();
    const userId = JSON.parse(atob(token.split('.')[1])).id; // Decodifica o token JWT para obter o userId
    console.log("User ID:", userId);

    if (documentData[0].userId !== userId) {
      Alert.alert("Erro", "Você não tem permissão para adicionar este documento.");
      navigation.navigate("Home");
      return null;
    }

    return {
      _id: documentData[0]._id || "Unknown _id",
      name: documentData[0].name || "Unknown name",
      cpf: documentData[0].cpf || "Unknown cpf",
      birthDate: documentData[0].birthDate || "Unknown date",
      institution: documentData[0].institution || "Unknown institution",
      course: documentData[0].course || "Unknown course",
      issuer: documentData[0].issuer || "Unknown issuer",
      validity: documentData[0].validity || "Unknown date",
      userId: userId,
    };
  };

  const handleAdd = async () => {
    try {
      console.log("Salvando documento...");
      const storedDocuments = await AsyncStorage.getItem("documents");
      const documentList = storedDocuments ? JSON.parse(storedDocuments) : [];
      const documentExists = documentList.some(doc => doc._id === documentInfo._id);
      if (!documentExists) {
        documentList.push(documentInfo);
        // Remover duplicatas antes de salvar
        const uniqueDocuments = documentList.reduce((acc, current) => {
          const x = acc.find(item => item._id === current._id);
          if (!x) {
            return acc.concat([current]);
          } else {
            return acc;
          }
        }, []);
        await AsyncStorage.setItem("documents", JSON.stringify(uniqueDocuments));
        console.log("Documento salvo com sucesso!");
      } else {
        console.log("Documento já existe na lista.");
      }
      navigation.navigate("Home");
    } catch (error) {
      console.error("Error saving document", error);
    }
  };

  return loading ? (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  ) : documentInfo ? (
    <View style={styles.container}>
      <Text style={styles.title}>Adicionar</Text>
      <Text style={styles.text}>Verifique as informações do seu documento</Text>
      {documentInfo && <DocumentCard {...documentInfo} />}
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
  ) : (
    <View style={styles.container}>
      <Text style={styles.text}>Erro ao carregar documento.</Text>
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