import React, { Component } from 'react'
import { Navigator, BackAndroid } from 'react-native'
// Local imports
import List from '../components/List'
import Item from '../components/Item'

let navigator; 

BackAndroid.addEventListener('hardwareBackPress', () => {
	if (navigator && navigator.getCurrentRoutes().length > 1) {
		navigator.pop()

		return true
	}

	return false
})

export default class AppNavigator extends Component {
	_renderScene(route, navigator) {
		let globalNavigatorProps = { navigator }

		switch (route.name) {
			case 'list':
				return (
					<List
						{ ...globalNavigatorProps }
					/>
				)

			case 'item':
				return (
					<Item
						data={ route.data }
						{ ...globalNavigatorProps }
					/>
				)

			default:
				return (
					<Login
						{ ...globalNavigatorProps }
					/>
				)
		}
	}

	render() {
		return (
			<Navigator
				initialRoute={{ name: 'list' }}
				ref={(nav) => { navigator = nav }}
				renderScene={ this._renderScene }
				configureScene={(route) => ({
					...route.sceneConfig || Navigator.SceneConfigs.FloatFromBottomAndroid 
				})}
			/>
		)
	}
}
