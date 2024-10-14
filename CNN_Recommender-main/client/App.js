/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Reanimated 2']);
import React from 'react';
import { Provider } from 'react-redux';
import {
	SafeAreaView,
	StatusBar,
	StyleSheet,
	NativeModules,
	Dimensions,
	Text
} from 'react-native';
import { View } from 'react-native-ui-lib';
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './components/Home';
import UploadProduct from './components/UploadProduct';
import RecommendationPage from './components/RecommendationPage';

const { StatusBarManager } = NativeModules;
const screenHeight = Dimensions.get('window').height;

class MyStatusBar extends React.PureComponent {

	constructor(props) {
		super(props);
		this.state = {
			height: 20,
		};
	}

	componentDidMount() {
		if (StatusBarManager.getHeight) {
			StatusBarManager.getHeight(({ height }) => {
				this.setState({ height: height - 10 });
			})
		} else {
			this.setState({ height: StatusBarManager.HEIGHT });
		}
	}

	render() {
		return (
			<View style={{ backgroundColor: this.props.backgroundColor, height: this.state.height }}>
				<StatusBar translucent {...this.props} />
			</View>
		);
	}
}

const Stack = createStackNavigator();

export default class App extends React.Component {
	render() {
		return (
			<NavigationContainer>
				<MyStatusBar backgroundColor={'#FFFFFF'} barStyle="dark-content" />

				<Stack.Navigator>
					<Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
					<Stack.Screen name="UploadProduct" component={UploadProduct} options={{ headerShown: false }} />
					<Stack.Screen name="RecommendationProduct" component={RecommendationPage} options={{ headerShown: false }} />
				</Stack.Navigator>
			</NavigationContainer>
		);
	}
};

const styles = StyleSheet.create({

});
