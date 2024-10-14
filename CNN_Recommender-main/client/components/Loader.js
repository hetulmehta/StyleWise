import React from 'react';
import { ActivityIndicator } from 'react-native';
import { View, Colors } from 'react-native-ui-lib';

const Loader = () => {
    return (
        <View center flex>
            <ActivityIndicator color={Colors.primary} />
        </View>
    );
};

export default Loader;
