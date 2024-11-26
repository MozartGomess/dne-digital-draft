import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const DocumentCard = (documentInfo) => {
    console.log(documentInfo);
    return (
        <View style={styles.card}>
            <Text style={styles.title}>{documentInfo.name}</Text>
            <Text style={styles.description}>CPF: {documentInfo.cpf}</Text>
            <Text style={styles.description}>Birth Date: {documentInfo.birthDate}</Text>
            <Text style={styles.description}>Institution: {documentInfo.institution}</Text>
            <Text style={styles.description}>Course: {documentInfo.course}</Text>
            <Text style={styles.description}>Issuer: {documentInfo.issuer}</Text>
            <Text style={styles.description}>Validity: {documentInfo.validity}</Text>
            <Text style={styles.description}>ID: {documentInfo._id}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        padding: 20,
        marginVertical: 10,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    description: {
        fontSize: 14,
        color: '#666',
        marginBottom: 5,
    },
});

export default DocumentCard;