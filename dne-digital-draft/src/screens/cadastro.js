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
} from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { registerUser } from "../services/api"; // Supondo que esta seja a função de cadastro

const Cadastro = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const [errorEmail, setErrorEmail] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);
  const [errorName, setErrorName] = useState(false);

  const handleCadastro = async () => {
    let valid = true;

    // Validação do e-mail
    const emailRegex = /^[0-9]{8}@esuda\.edu\.br$/;
    if (!emailRegex.test(email)) {
      setErrorEmail(true);
      valid = false;
    } else {
      setErrorEmail(false);
    }

    // Validação do nome
    const nameRegex = /^[A-Za-z\s]+$/;
    if (!name || !nameRegex.test(name)) {
      setErrorName(true);
      valid = false;
    } else {
      setErrorName(false);
    }

    // Validação da senha
    if (!password) {
      setErrorPassword(true);
      valid = false;
    } else {
      setErrorPassword(false);
    }

    // Se algum campo estiver incorreto, mostramos um alerta
    if (!valid) {
      Alert.alert("Erro", "Por favor, preencha todos os campos corretamente.");
      return;
    }

    // Log dos dados antes de enviar
    console.log("Dados enviados:", { name, email, password });

    try {
      // Enviar os dados para a API
      const response = await registerUser(name, email, password);

      // Verificar a resposta da API
      console.log("Resposta da API:", response);

      if (response.success) {
        Alert.alert("Parabéns!", "Cadastro realizado com sucesso.");
        navigation.replace("Login");
      } else {
        Alert.alert("Erro", response.message || "Erro ao cadastrar.");
      }
    } catch (error) {
      console.error("Erro ao cadastrar:", error);
      Alert.alert("Erro", "Não foi possível realizar o cadastro.");
    }
  };

  return (
    <ImageBackground
      source={require('../../assets/fundo2.jpeg')}
      style={styles.background}
    >
      <View style={styles.container}>
        <View style={styles.box}>
          <Text style={styles.title}>Primeiro Acesso</Text>

          {/* Campo para o Nome */}
          <View style={styles.inputContainer}>
            <Icon name="person" size={20} color="#555" style={styles.icon} />
            <TextInput
              style={[styles.input, errorName && styles.inputError]}
              placeholder="Nome Completo"
              value={name}
              onChangeText={setName}
            />
            {errorName && <Text style={styles.errorText}> "ERRO: Apenas Letras"</Text>}
          </View>

          {/* Campo para o E-mail Institucional */}
          <View style={styles.inputContainer}>
            <Icon name="email" size={20} color="#555" style={styles.icon} />
            <TextInput
              style={[styles.input, errorEmail && styles.inputError]}
              placeholder="E-mail Institucional"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />
            {errorEmail && <Text style={styles.errorText}>"ERRO: E-mail Institucional"</Text>}
          </View>

          {/* Campo para Senha */}
          <View style={styles.inputContainer}>
            <Icon name="lock" size={20} color="#555" style={styles.icon} />
            <TextInput
              style={[styles.input, errorPassword && styles.inputError]}
              placeholder="Senha"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!isPasswordVisible}
            />
            <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)} style={styles.eyeIcon}>
              <Icon name={isPasswordVisible ? "visibility-off" : "visibility"} size={20} color="#555" />
            </TouchableOpacity>
            {errorPassword && <Text style={styles.errorText}>"ERRO: Campo Obrigatório"</Text>}
          </View>

          {/* Botão de Cadastrar */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={handleCadastro}>
              <Text style={styles.buttonText}>Cadastrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Logo no rodapé */}
      <View style={styles.footer}>
        <Image
          source={require('../../assets/logo-branco.png')}
          style={styles.logo}
        />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    alignSelf: "center",
    color: "#000000",
  },
  box: {
    width: "80%",
    minHeight: 400,
    backgroundColor: "rgba(255, 255, 255, 10)",
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
    marginBottom: 20,
    alignItems: "center",
    marginTop: -45,
  },
  inputContainer: {
    width: "100%",
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    width: "100%",
    height: 50,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
  },
  icon: {
    position: 'absolute',
    left: 15,
  },
  eyeIcon: {
    position: 'absolute',
    right: 15,
  },
  inputError: {
    borderColor: "red",
    borderWidth: 2,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
    marginTop: 20,
  },
  button: {
    backgroundColor: "#ffa500",
    width: "60%",
    height: 45,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 20,
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 70,
    marginLeft: -255,
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },
  logo: {
    width: 200,
    height: 130,
    right: 0,
    resizeMode: 'contain',
  },
});

export default Cadastro;
