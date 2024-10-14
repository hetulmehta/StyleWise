/* eslint-disable react-native/no-inline-styles */
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Reanimated 2']);

import React from 'react';
import {
    ImageBackground,
    SafeAreaView,
    Dimensions,
    StyleSheet,
} from 'react-native';
import {
    Colors,
    View,
    Button
} from 'react-native-ui-lib';
import { ScrollView } from 'react-native';
import { TouchableOpacity, Text } from 'react-native-ui-lib';
import ImagePicker from 'react-native-image-crop-picker';
import ImagePickerModal from './Modal/ImagePickerModal';
import Loader from './Loader';
import CstmShadowView from './CstmShadowView';
import NavBarBack from './NavBarBack';

import axios from 'axios';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default class UploadProduct extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            Image: '',
            modalVisible: false,
            Loading: false,
        };
    }

    HandleImagePicker = (ImageData) => {
        this.setState({
            Image: `data:${ImageData.mime};base64,${ImageData.data}`,
            ImageSize: {
                width: ImageData.width,
                height: ImageData.height,
            },
            modalVisible: !this.state.modalVisible,
            ImageBase64: ImageData.data,
        });
    };

    ShowGallery = () => {
        ImagePicker.openPicker({
            width: 300,
            height: 300,
            // cropping: true,
            includeBase64: true,
        })
            .then(this.HandleImagePicker)
            .catch(() => { });
    };

    ShowCamera = () => {
        ImagePicker.openCamera({
            width: 300,
            height: 300,
            cropping: true,
            includeBase64: true,
        })
            .then(this.HandleImagePicker)
            .catch(() => { });
    };

    RemoveImage = () => {
        this.setState({ Image: '' });
    };

    setModalVisible = () => {
        this.setState({ modalVisible: !this.state.modalVisible });
    };

    sendToModel = async () => {
        try {
            this.setState({ Loading: true });
            const res = await axios.post('http://10.0.2.2:4000/', {
                ImageUri: this.state.Image,
            });
            const RecommendedObjs = res.data;
            this.props.navigation.navigate('RecommendationProduct', {
                Products: RecommendedObjs,
            });
            this.setState({ Loading: false });
        } catch (error) {
            console.error(error);
        }
    }

    render() {
        return (
            <>
                <NavBarBack
                    Title={'Upload Product'}
                    Navigation={() => this.props.navigation.navigate('Home')}
                />
                <SafeAreaView style={{ flex: 1, height: screenHeight, backgroundColor: '#FFFFFF' }}>
                    {this.state.Loading ? (
                        <Loader />
                    ) : (
                        <ScrollView
                            contentContainerStyle={{
                                backgroundColor: '#FFFFFF',
                                paddingHorizontal: 20,
                            }}>
                            <View marginT-70>
                                <ImagePickerModal
                                    modalVisible={this.state.modalVisible}
                                    setModalVisible={this.setModalVisible}
                                    ShowGallery={this.ShowGallery}
                                    ShowCamera={this.ShowCamera}
                                />
                                {this.state.Image ? (
                                    <ImageBackground
                                        source={{ uri: this.state.Image }}
                                        style={styles.ImageBG}>
                                        <TouchableOpacity
                                            onPress={this.RemoveImage}
                                            style={styles.iconCircle}>
                                            <Text b1 primary>
                                                x
                                            </Text>
                                        </TouchableOpacity>
                                    </ImageBackground>
                                ) : (
                                    <TouchableOpacity
                                        onPress={this.setModalVisible}
                                        flex
                                        center
                                        style={{
                                            height: screenWidth * 0.5,
                                            borderWidth: 0.8,
                                            borderColor: '#E7EAF0',
                                        }}>
                                        <Text style={{ color: '#ff0f87' }}>
                                            Upload an Image of product
                                        </Text>
                                    </TouchableOpacity>
                                )}
                                <CstmShadowView
                                    style={{ marginBottom: 20, marginTop: 50 }}>
                                    <TouchableOpacity
                                        onPress={this.sendToModel}
                                    >
                                        <Text centerV style={{ color: '#ff0f87', textAlign: 'center', fontSize: 15, padding: 15 }}>
                                            Upload Product
                                        </Text>
                                    </TouchableOpacity>
                                </CstmShadowView>
                            </View>
                        </ScrollView>
                    )}
                </SafeAreaView>
            </>
        );
    }
}

const styles = StyleSheet.create({
    ImageBG: {
        alignItems: 'flex-end',
        width: '100%',
        alignSelf: 'center',
        height: screenWidth - 40,
    },
    iconCircle: {
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        height: 30,
        width: 30,
        margin: 5,
        backgroundColor: '#FFFFFF',
        borderColor: '#FFFFFF',
    },
    button: {
        alignItems: 'center',
    },
});
