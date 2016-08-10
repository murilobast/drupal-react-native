import React, { Component } from 'react'
import { StatusBar, StyleSheet, View, Image, ToolbarAndroid } from 'react-native'

export default class ViewContainer extends Component {
	render() {
		return (
			<View
				style={ styles.backgroundImage }
			>
				<StatusBar
					backgroundColor='gray'
					barStyle='light-content'
				/>
				<ToolbarAndroid
					title={ 'Drupal Native' }
					style={ styles.toolbar }
					titleColor='white'
				/>
				<View style={ styles.content }>
					{ this.props.children }
				</View>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	backgroundImage: {
		flex: 1,
		alignSelf: 'stretch',
		backgroundColor: '#eee',
		width: null,
		height: null
	},

	content: {
		flex: 1
	},

	toolbar: {
		backgroundColor: '#333',
		height: 56
	}
})