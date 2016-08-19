import React, { Component } from 'react'
import { Navigator, BackAndroid } from 'react-native'
// import PushNotification from 'react-native-push-notification'
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

// Push notifications tests
// PushNotification.configure({
// 	onNotification: function(notification) {
// 		let nid = notification.nid
// 		let url = 'http://rest.murilobastos.com/news/all/' + nid

// 		fetch(url)
// 			.then((response) => response.json())
// 			.then((responseJson) => {
// 				navigator.push({ name: 'item', data: responseJson[0] })
// 				return;
// 			})
// 			.catch((error) => {
// 				console.error(error)
// 			})
// 	},

// 	popInitialNotification: true,

// 	requestPermissions: true
// })

// PushNotification.localNotificationSchedule({
// 	message: "Veja como é montada uma placa-mãe da Asus dentro de uma fábrica da Foxconn no Brasil",
// 	date: new Date(Date.now() + (1 * 1000)),
// 	nid: 13
// })