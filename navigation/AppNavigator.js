import React, { Component } from 'react'
import { Navigator, BackAndroid } from 'react-native'
import PushNotification from 'react-native-push-notification'
// Local imports
import CardList from '../components/list/CardList'
import Article from '../components/article/Article'
import Disqus from '../components/Disqus'
import NotificationHandler from './NotificationHandler'

let navigator; 

BackAndroid.addEventListener('hardwareBackPress', () => {
	if (navigator && navigator.getCurrentRoutes().length > 1) {
		navigator.pop()

		return true
	}

	return false
})

export default class AppNavigator extends Component {
	constructor(props) {
		super(props)
	
		this.state = { pushed: false }
	}
	componentDidMount() {
		NotificationHandler((data) => {
			// Gambis pra não ir duas vezes pra mesma rota
			if (this.state.pushed)
				return
			
			this.setState({ pushed: true })
			navigator.push({ name: 'article', data: data })
			// Gambis pra poder receber notificação depois de renderizar
			setTimeout(() => {
				this.setState({ pushed: false })
			}, 1000)
		})
	}

	_renderScene(route, navigator) {
		let globalNavigatorProps = { navigator }

		switch (route.name) {
			case 'list':
				return (
					<CardList
						{ ...globalNavigatorProps }
					/>
				)

			case 'article':
				return (
					<Article
						data={ route.data }
						{ ...globalNavigatorProps }
					/>
				)

			case 'disqus':
				return (
					<Disqus
						id={ route.id }
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