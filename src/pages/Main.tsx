import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { TextInput, Button } from 'react-native-paper';

import Constants from 'expo-constants';

export type IMCData = {
    weight: number;
    height: number;
    imc: number;
    legend: string;
    color: string;
};

const Main: React.FC = () => {
    const [state, setState] = useState<IMCData>({
        weight: 0,
        height: 0,
        imc: 0,
        legend: 'Indeterminado',
        color: '#838383'
    });
    const onChangeWeight = (text: string) => {
        const object = {
            ...state
        };
        object.weight = Number(numberStringFormatter(text));
        setState(object);
    };
    const onChangeHeight = (text: string) => {
        const object = {
            ...state
        };
        object.height = Number(numberStringFormatter(text));
        setState(object);
    };
    function calculateIMC() {
        let imc = Math.ceil(state.weight / state.height ** 2);

        const object = {
            ...state
        };
        object.imc = imc;
        if (isNaN(imc)) {
            (object.imc = 0), (object.legend = 'Indeterminado'), (object.color = '#838383');
        } else if (imc < 18.5) {
            (object.legend = 'Magreza'), (object.color = '#e74c3c');
        } else if (imc >= 18.5 && imc < 25) {
            (object.legend = 'Normal'), (object.color = '#2ecc71');
        } else if (imc > 25 && imc < 30) {
            (object.legend = 'Sobrepeso'), (object.color = '#f1c40f');
        } else if (imc >= 30 && imc < 40) {
            (object.legend = 'Obesidade'), (object.color = '#e67e22');
        } else if (imc >= 40) {
            (object.legend = 'Obesidade grave'), (object.color = '#e74c3c');
        }
        setState(object);
    }

    function numberStringFormatter(text: string): string {
        return text.replace(',', '.');
    }
    return (
        <View style={styles.container}>
            <Text style={styles.legend}>Seu IMC</Text>
            <View style={{ ...styles.painel, backgroundColor: state.color }}>
                <Text style={styles.result}>{state.imc}</Text>
                <Text style={styles.diagnostic}>{state.legend}</Text>
            </View>
            <View>
                <TextInput label="Peso" style={styles.weight} onChangeText={onChangeWeight} />
                <TextInput label="Altura" style={styles.height} onChangeText={onChangeHeight}></TextInput>
                <Button mode="contained" onPress={calculateIMC}>
                    Calcular
                </Button>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: Constants.statusBarHeight
    },
    painel: {
        alignSelf: 'center',
        backgroundColor: '#bdc3c7',
        borderRadius: 5,
        marginVertical: 10,
        padding: 8,
        width: 150
    },
    legend: {
        textAlign: 'center',
        fontWeight: 'bold'
    },
    result: {
        textAlign: 'center',
        fontSize: 22,
        fontWeight: 'bold'
    },
    diagnostic: {
        textAlign: 'center',
        fontSize: 16
    },
    weight: {
        marginVertical: 10
    },
    height: {
        marginVertical: 10
    }
});

export default Main;
