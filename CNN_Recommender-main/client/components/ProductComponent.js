/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { StyleSheet, Dimensions, ActivityIndicator, Image } from 'react-native';
import { View, Text, AnimatedImage, TouchableOpacity } from 'react-native-ui-lib';
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;
import CstmShadowView from './CstmShadowView';
import axios from 'axios';

export default class ProductComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            base64uri: '',
        };
    }

    componentDidMount() {
        this.fn();
    }

    fn = async () => {
        try {
            const res = await axios.post('http://10.0.2.2:4000/img', {
                ImgName: this.props.ProductImage,
            });
            this.setState({ base64uri: res.data });
        } catch (error) {
            console.error(error);
        }
    };


    render() {
        return (
            <CstmShadowView style={styles.shadow}>
                <TouchableOpacity
                    activeOpacity={0.7} style={{ borderRadius: 10 }}
                >
                    <AnimatedImage
                        source={{ uri: this.state.base64uri }}
                        style={styles.drawerCover}
                        loader={<ActivityIndicator />}
                        containerStyle={{ backgroundColor: '#E7EAF0', borderRadius: 10 }}
                    />
                    {/* <View style={styles.drawerCover}
                        containerStyle={{ backgroundColor: '#FFFFFF', borderRadius: 10 }}>
                        <Text center style={{
                            display: 'flex', justifyContent: 'center', alignItems: 'center', paddingVertical: 120, fontSize: 20,
                        }}>
                            {imageName}
                        </Text>
                    </View> */}

                    <View marginH-5 marginT-5>
                        <Text style={styles.name} numberOfLines={1} marginT-1 ellipsizeMode='tail'>{this.props.Name}</Text>
                        <Text style={styles.description} numberOfLines={1} marginT-5 ellipsizeMode='tail'> {this.props.ShortDescription} </Text>
                        {/* <Text marginT-2 hb2 marginL-5 style={{ color: '#ff0f87' }}>₹ 2500</Text> */}
                    </View>

                    <View row style={{ display: 'flex', justifyContent: 'space-between', alignItems: "center" }}>
                        <Text marginL-5 style={{ color: '#ff0f87' }} >₹ 2500</Text>
                        <TouchableOpacity marginR-10 style={styles.cart}>
                            <Text style={{ color: '#FFFFFF', fontSize: 9 }}>Add to cart</Text>
                        </TouchableOpacity>
                    </View>

                </TouchableOpacity>

            </CstmShadowView>

        );
    }
}
const styles = StyleSheet.create({
    shadow: {
        height: 'auto',
        width: deviceWidth * 0.45,
        marginHorizontal: 8,
        marginTop: -10,
        padding: 5,
        borderRadius: 10,
        marginBottom: 20,
    },
    drawerCover: {
        //image
        alignSelf: "stretch",
        borderRadius: 10,
        height: deviceHeight * 0.35,
        width: deviceWidth * 0.45,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        backgroundColor: '#EBECF0',
    },
    name: {
        fontSize: 14,
        fontFamily: 'Mulish-ExtraBold',
        textAlign: "center",
        fontWeight: "bold",
    },
    description: {
        fontSize: 12,
        fontFamily: 'Mulish-Regular',
        color: '#909090',
        fontWeight: 'bold'
    },

    cart: {
        backgroundColor: '#ff0f87',
        padding: 5,
        margin: 5,
    }

    // h1: { fontSize: 16, fontFamily: 'Mulish-Regular' },
    // hb1: { fontSize: 16, fontFamily: 'Mulish-ExtraBold' },
    // h2: { fontSize: 14, fontFamily: 'Mulish-Regular' },
    // hb2: { fontSize: 14, fontFamily: 'Mulish-ExtraBold' },
    // h3: { fontSize: 12, fontFamily: 'Mulish-Regular' },
    // hb3: { fontSize: 12, fontFamily: 'Mulish-ExtraBold' },
    // h4: { fontSize: 10, fontFamily: 'Mulish-Regular' },
    // hb4: { fontSize: 10, fontFamily: 'Mulish-ExtraBold' },
    // b1: { fontSize: 20, fontFamily: 'Mulish-ExtraBold' },
    // b2: { fontSize: 20, fontFamily: 'Mulish-Regular' },
    // f1: { fontSize: 22, fontFamily: 'Mulish-ExtraBold' },
})