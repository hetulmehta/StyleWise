/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react';
import { Dimensions, StyleSheet, Animated, Image } from 'react-native';
import { View, Text } from 'react-native-ui-lib';
import NavBarBack from './NavBarBack';
import ProductComponent from './ProductComponent';
import { ScrollView } from 'react-native-gesture-handler';
import Loader from './Loader';

const screenHeight = Dimensions.get('window').height;

const RecommendationPage = ({ route, navigation }) => {

    const [ProductData, setProductData] = useState([]);
    const [Loading, setLoading] = useState(true);

    useEffect(() => {
        const { Products } = route.params;
        // eslint-disable-next-line no-eval
        const arr = eval(Products);
        setProductData(arr);
        setLoading(false);
    }, [route.params]);

    return (
        <View style={{ flex: 1, height: screenHeight, backgroundColor: '#FFFFFF' }}>
            <NavBarBack
                Navigation={() => navigation.navigate('UploadProduct')} Title={'Recommended Products'} />
            <Text style={styles.title}> Recommendations For You</Text>
            {
                Loading ?
                    <Loader />
                    :
                    <Animated.FlatList
                        data={ProductData}
                        numColumns={2}
                        ListHeaderComponent={<View marginV-15 />}
                        renderItem={({ item }) =>
                            <ProductComponent
                                ProductImage={item[item.length - 1]}
                                // ProductImage="images/10003.jpg"
                                ShortDescription={item[4] + ', ' + item[5] + ', ' + item[6]}
                                Name={item[3]}
                            />
                        }
                        keyExtractor={(item) => 'Product' + item[0]}
                        showsVerticalScrollIndicator={false}
                        ListEmptyComponent={
                            <View flex centerV centerH paddingH-40 style={{ height: 605 }}>
                                <Text center b1 grey50>No items found!</Text>
                            </View>
                        }
                    />
            }
        </View>

    );
};

const styles = StyleSheet.create({
    title: {
        fontSize: 16,
        fontFamily: 'Mulish-ExtraBold',
        color: '#909090',
        marginLeft: 10,
        fontWeight: 'bold',
    },
});

export default RecommendationPage;
