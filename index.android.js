import React, { Component } from 'react'
import { AppRegistry } from 'react-native'
// Local Imports
import ViewContainer from './components/ViewContainer'
import Login from './components/Login'
import AppNavigator from './navigation/AppNavigator'

class reactapp extends Component {
	render() {
		return (
			<ViewContainer>
				<AppNavigator/>
			</ViewContainer>
		)
	}
}

AppRegistry.registerComponent('reactapp', () => reactapp)