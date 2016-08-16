import React, { Component } from 'react'
import { StatusBar, StyleSheet, View, Text, ToolbarAndroid } from 'react-native'

export default class ViewContainer extends Component {
	render() {
		return (
			<View
				style={ styles.container }
			>
				<StatusBar
					backgroundColor='#303F9F'
					barStyle='light-content'
				/>
				<ToolbarAndroid
					title={ 'Tec Imundo' }
					style={ styles.toolbar }
					titleColor='white'
				/>
				<View style={ styles.content }>
					{ this.props.children }
					<Text style={ styles.bottom }>Drupal 8 JSON View + React Native</Text>
				</View>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
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
		backgroundColor: '#3F51B5',
		height: 56,
		elevation: 5
	},

	bottom: {
		backgroundColor: 'dimgray',
		color: 'white',
		textAlign: 'center',
		lineHeight: 40,
		textAlignVertical: 'center'
	}
})