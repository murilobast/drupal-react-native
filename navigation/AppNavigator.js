import React, { Component } from 'react'
import { Navigator } from 'react-native'
// Local imports
import Login from '../components/Login'
import List from '../components/List'
import Item from '../components/Item'

export default class AppNavigator extends Component {
	_renderScene(route, navigator) {
		let globalNavigatorProps = { navigator }

		switch (route.name) {
			case 'login':
				return (
					<Login
						{ ...globalNavigatorProps }
					/>
				)

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
				initialRoute={ { name: 'list' } }
				ref='appNavigator'
				renderScene={ this._renderScene }
				configureScene={(route) => ({
					...route.sceneConfig || Navigator.SceneConfigs.HorizontalSwipeJump 
				})}
			/>
		)
	}
}
