/*
	Renderiza o bloco do autor
*/
import React, { Component } from 'react'
import { StyleSheet, Dimensions, View, WebView } from 'react-native'
// Local imports
import colors from '../helpers/colors'

const { height, width } = Dimensions.get('window')

export default class Disqus extends Component {
	constructor(props) {
		super(props)

		this.state = {
			sitename: 'drupal-murilobastos-com',
			version: '74622dc19b1055d1af48a4f378c4b79b',
			thread: 'node/' + props.id
		}
	}

	render() {
		let version = this.state.version
		let sitename = this.state.sitename
		let thread = this.state.thread
		let uri = 'http://disqus.com/embed/comments/?base=default&version=' + version + '&f=' + sitename + '&t_i=' + thread

		console.log(this.props, thread, uri)
		return (
			<View style={ styles.container }>
				<WebView
					source={{ uri }}
					style={ styles.disqus }
					scalesPageToFit={ true }
				/>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#fff'
	},

	disqus: {
		flex: 1,
		height: height - 80,
		width: width,
		padding: 20
	}
})