import { StyleSheet,Image } from 'react-native';
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native-ui-lib';
import BackArrowIcon from '../icons/BackArrowIcon.png';

export default class NavBarBack extends React.PureComponent {
	render() {
		return (
			<View row centerV left paddingL-10 style={styles.NavBar}>
				<TouchableOpacity onPress={this.props.Navigation}>
                    <Image
                        style={styles.scan}
                        source={BackArrowIcon}
                    />
				</TouchableOpacity>
				<Text marginL-20 style={{fontSize: 18}} >
					{this.props.Title}
				</Text>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	NavBar: {
		height: 50,
        backgroundColor: '#FFFFFF'
	},
    scan: {
        width: 25,
        height: 25
    }
});
