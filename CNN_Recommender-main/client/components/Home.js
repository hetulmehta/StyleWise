/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { StyleSheet, Image } from 'react-native';
import Logo from '../assets/images/Logo.png';
import { View, Text, TouchableOpacity } from 'react-native-ui-lib';
import ProductUploadIcon from '../icons/ProductUploadIcon.png';


export default class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <>
                <View row centerV style={styles.NavBar}>
                    <View marginH-20 row>
                        <Image
                            style={styles.stretch}
                            source={Logo}
                        />
                    </View>
                    <View flex row centerV right>
                        <TouchableOpacity
                            marginR-12 br100
                            onPress={() => { this.props.navigation.navigate('UploadProduct') }}
                        >
                            <Image
                                style={styles.scan}
                                source={ProductUploadIcon}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                <Text center style={{
                    height: 100,
                    marginTop: 320,
                    letterSpacing: 2,
                    fontSize: 16,
                }}>
                    Scan or Upload your photo to show recommended products
                </Text>
            </>
        );
    }
}

const styles = StyleSheet.create({
    NavBar: {
        backgroundColor: '#FFFFFF',
        height: 50,
        zIndex: 100,
    },

    stretch: {
        width: 130,
        height: 30,
        resizeMode: 'stretch',
    },
    scan: {
        width: 30,
        height: 30,
        resizeMode: 'stretch',
    },
});
