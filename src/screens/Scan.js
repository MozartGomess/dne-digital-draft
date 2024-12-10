import React, { useEffect, useState } from "react";
import {
  Button,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Alert,
} from "react-native";
import { CameraView, Camera } from "expo-camera";

// Obtendo o tamanho da tela
const { width } = Dimensions.get("window");
const CAMERA_SIZE = width * 0.7;

const Scan = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    const getCameraPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getCameraPermissions();
  }, []);

  // Função para lidar com o QR Code escaneado
  const handleBarcodeScanned = async ({ type, data: documentId }) => {
    setScanned(true);

    // Verificar se o QR Code contém uma URL válida
    if (documentId) {
      // Se for uma URL válida, navegar para a próxima tela
      console.log(`_id: ${documentId}`);
      navigation.navigate("AddDocument", { data: documentId });
    } else {
      // Se não for uma URL válida, mostrar um alerta
      Alert.alert("Erro", "QR Code não contém dados válidos.");
    }
  };

  if (hasPermission === null) {
    return <Text>Solicitando permissão da câmera...</Text>;
  }
  if (hasPermission === false) {
    return <Text>Sem acesso à câmera.</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Scan</Text>
      <Text style={styles.text}>
        Escaneie o QR Code presente no seu documento estudantil.
      </Text>
      <View style={styles.cameraContainer}>
        <CameraView
          onBarcodeScanned={scanned ? undefined : handleBarcodeScanned}
          barcodeScannerSettings={{
            barcodeTypes: ["qr", "pdf417"], // Tipos de códigos de barras suportados
          }}
          style={styles.camera}
          ratio="1:1"
        />
      </View>
      {scanned && (
        <Button
          title={"Toque para escanear novamente"}
          onPress={() => setScanned(false)} // Permite escanear novamente
        />
      )}
      <TouchableOpacity
        style={styles.cancelButton}
        onPress={() => navigation.goBack()} // Voltar para a tela anterior
      >
        <Text style={styles.cancelButtonText}>Cancelar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
    paddingLeft: 10,
  },
  scanner: {
    width: "100%",
    height: "70%",
  },
  cancelButton: {
    position: "absolute",
    bottom: 40,
    right: 20,
    backgroundColor: "red",
    borderRadius: 10,
    padding: 10,
  },
  cameraContainer: {
    width: CAMERA_SIZE,
    height: CAMERA_SIZE,
    overflow: "hidden",
    borderRadius: 10,
  },
  camera: {
    flex: 1,
  },
  cancelButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default Scan;
