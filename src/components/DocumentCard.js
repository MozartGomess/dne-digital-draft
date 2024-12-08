import React from "react";
import { View, Text, StyleSheet } from "react-native";
import QRCode from "react-native-qrcode-svg";

const DocumentCard = ({
  name,
  cpf,
  birthDate,
  institution,
  course,
  issuer,
  _id,
  validity,
}) => {
  const formatDate = (date) => {
    const d = new Date(date);
    const day = `0${d.getDate()}`.slice(-2);
    const month = `0${d.getMonth() + 1}`.slice(-2);
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const renderBoldText = (label, value) => (
    <Text style={styles.text}>
      <Text style={styles.bold}>{label}:</Text> {value}
    </Text>
  );

  return (
    <View style={styles.card}>
      {renderBoldText("Nome", name)}
      {renderBoldText("CPF", cpf)}
      {renderBoldText("Data de Nascimento", formatDate(birthDate))}
      {renderBoldText("Instituição", institution)}
      {renderBoldText("Curso", course)}
      {renderBoldText("Emissor", issuer)}
      {renderBoldText("ID", _id)}
      {renderBoldText("Válido até", formatDate(validity))}
      <View style={styles.qrCodeContainer}>
        <QRCode value={_id} size={100} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 20,
    margin: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
    alignItems: "flex-start", // Alinha o conteúdo à esquerda
  },
  text: {
    fontSize: 16,
    marginBottom: 15,  // Aumenta o espaçamento entre as linhas
    textAlign: "left", // Alinha o texto à esquerda
  },
  bold: {
    fontWeight: "bold",
  },
  qrCodeContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%", // Garante que o contêiner ocupe a largura total
    marginTop: 30, // Ajustei o espaçamento antes do QR Code
  },
});

export default DocumentCard;