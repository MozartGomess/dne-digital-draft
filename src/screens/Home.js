import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Alert,
  Image,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons"; // Usando ícones do Material Icons

const Home = ({ navigation }) => {
  const [documents, setDocuments] = useState([]);

  // Função para exibir o alerta de confirmação ao sair
  const handleLogout = () => {
    Alert.alert(
      "Deseja sair?",
      "Você tem certeza que deseja sair da sua conta?",
      [
        {
          text: "Cancelar", // Se o usuário escolher cancelar
          onPress: () => console.log("Cancelado"),
          style: "cancel",
        },
        {
          text: "Sair", // Se o usuário escolher sair
          onPress: () => {
            // Lógica de logout - redirecionar para a tela de login
            navigation.navigate("Login");
          },
        },
      ],
      { cancelable: false } // Não permitir fechar o alerta tocando fora dele
    );
  };

  return (
    <View style={styles.container}>
      {/* Cabeçalho com logo à esquerda e ícone de sair à direita */}
      <View style={styles.header}>
        <Image
          source={require("../../assets/logo-branco.png")} // Substitua pelo caminho da sua logo
          style={styles.logo}
        />
        <TouchableOpacity onPress={handleLogout}>
          <Icon name="exit-to-app" size={30} color="#fff" />
        </TouchableOpacity>
      </View>

      {documents.length === 0 ? (
        <View style={styles.placeholder}>
          <Text>Você ainda não adicionou nenhum documento.</Text>
        </View>
      ) : (
        <FlatList
          data={documents}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => navigation.navigate("DocumentDetails", { item })}
            >
              {/* Card de documento, se necessário */}
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id}
        />
      )}

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate("Scan")}
      >
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

// Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between", // Logo à esquerda e ícone de sair à direita
    alignItems: "center",
    backgroundColor: "#4CAF50", // Cor verde do cabeçalho
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginBottom: 20,
    width: "100%", // Diminuindo a largura do cabeçalho
    marginTop: 30, // Ajuste da margem superior
  },
  logo: {
    width: 150, // Ajuste o tamanho da logo conforme necessário
    height: 50,
    right: 15,
    resizeMode: "contain", // Garante que a logo não será distorcida
  },
  placeholder: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  addButton: {
    position: "absolute",
    bottom: 30,
    right: 30,
    backgroundColor: "#4CAF50",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  addButtonText: {
    color: "#fff",
    fontSize: 35,
    lineHeight: 35,
  },
});

export default Home;
