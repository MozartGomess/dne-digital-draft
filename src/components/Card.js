import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const Card = ({ title, content }) => {
    return (
        <View style={styles.card}>
            <Text style={styles.cardTitle}>{title}</Text>
            <Text style={styles.cardContent}>{content}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 16,
        margin: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 2,
        transition: 'box-shadow 0.3s ease',
    },
    cardTitle: {
        fontSize: 24,
        marginBottom: 8,
    },
    cardContent: {
        fontSize: 16,
        color: '#333',
    },
});

export default Card;