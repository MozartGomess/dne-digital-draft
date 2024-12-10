import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ImageBackground,
  Image,
  ActivityIndicator,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons"; // Importando o ícone para o olho (ver/ocultar senha)
import AsyncStorage from "@react-native-async-storage/async-storage";
import { loginUser } from "../services/api"; // Importa a função loginUser do arquivo api.js

import logo from '../../assets/esuda.png'; // Logo da imagem
import backgroundImg from '../../assets/lll.png'; // Imagem de fundo

const Login = ({ navigation }) => {
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // Estado para controlar a visibilidade da senha
  const [loading, setLoading] = useState(false); // Estado para controlar o loading

  const handleLogin = async () => {
    if (email && password) {
      setLoading(true); // Ativa o loading
      const response = await loginUser(email, password);
      setLoading(false); // Desativa o loading
      if (response.success) {
        // Armazenar o token JWT no AsyncStorage
        await AsyncStorage.setItem("token", response.data.token);
        
        // Exibir mensagem de sucesso após login
        Alert.alert("Parabéns!", "Login realizado com sucesso.", [
          {
            text: "OK", 
            onPress: () => navigation.replace("Home") // Redireciona para a tela Home
          }
        ]);
      } else {
        Alert.alert("Falha no Login", response.message);  // Mensagem de erro de login
      }
    } else {
      Alert.alert("Erro", "Por favor, insira o e-mail e a senha.");  // Mensagem se campos estiverem vazios
    }
  };

  const handleSignUp = () => {
    navigation.navigate("cadastro"); // Navega para a tela Cadastro
  };

  return (
    <ImageBackground
      source={backgroundImg}  // Imagem de fundo
      style={styles.background} // Estilo para a imagem de fundo
    >
      <View style={styles.container}>
        <Image
          source={logo} // Imagem da logo
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.title}></Text>
        <View style={styles.box}>
          <TextInput
            style={styles.input}
            placeholder="E-mail"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address" // Ajustado para o tipo de teclado de e-mail
          />
          
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.input}
              placeholder="Senha"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword} // Alterna a visibilidade da senha
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIconContainer}>
              <Icon
                name={showPassword ? "visibility" : "visibility-off"} // Ícone para alternar entre visível e invisível
                size={24}
                color="#777"
                style={styles.eyeIcon}
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
            {loading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Acessar</Text>
            )}
          </TouchableOpacity>

          {/* Link para Cadastrar-se */}
          <TouchableOpacity style={styles.signupButton} onPress={handleSignUp}>
            <Text style={styles.signupButtonText}>Cadastrar-se</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center', // Centraliza o conteúdo da tela
    alignItems: 'center', // Centraliza horizontalmente
  },
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
    padding: 20,
  },
  logo: {
    width: 330,
    height: 250,
    marginBottom: 0,
    marginTop: 40, // Aumenta a margem superior para descer a imagem
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  box: {
    width: "80%",
    minHeight: 350,
    backgroundColor: "rgba(255, 255, 255, 0.6)", // Cor branca com 30% de opacidade
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
    marginBottom: 20,
    alignItems: "center", // Centraliza conteúdo da caixa
    marginTop: -45, // Subir a caixa em relação à posição original
  },
  input: {
    width: "100%",
    height: 50,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
    marginTop: 20,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    position: "relative",  // Necessário para o ícone de olho ficar sobre o campo de senha
  },
  eyeIconContainer: {
    position: "absolute",   // Para o ícone ficar posicionado sobre o campo
    right: 15,              // Alinha à direita do campo de senha
    top: "50%",             // Centraliza verticalmente dentro do campo
    transform: [{ translateY: -12 }]  // Ajuste fino para centralizar corretamente
  },
  eyeIcon: {
    marginLeft: 10, // Adiciona um pequeno espaçamento no ícone
  },
  button: {
    backgroundColor: "#32a852",
    width: "70%", // Defina uma largura menor para o botão
    height: 45, // Defina uma altura menor para o botão
    borderRadius: 20, // Mantenha as bordas arredondadas
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30, // Para ajustar a posição do botão
  },
  buttonText: {
    color: "#fff",
    fontSize: 20, // Ajuste o tamanho da fonte, se necessário
  },
  signupButton: {
    backgroundColor: "#FFA500", // Cor laranja
    width: "70%", // Defina uma largura menor para o botão
    height: 45, // Defina uma altura menor para o botão
    borderRadius: 20, // Mantenha as bordas arredondadas
    justifyContent: "center",
    alignItems: "center",
    marginTop: 17, // Para ajustar a posição do botão
  },
  signupButtonText: {
    color: "#fff",
    fontSize: 18,
  },
});

export default Login;