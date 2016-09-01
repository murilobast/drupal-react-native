/*
	Componente de botão
*/

import React, { Component } from 'react'
import { StyleSheet, TouchableNativeFeedback, View, Text } from 'react-native'
// Local imports
import colors from '../helpers/colors'

export default class Button extends Component {
	render() {

		return (
			<TouchableNativeFeedback
				onPress={ this.props.action }
			>
				<View style={ styles.button }>
					<Text style={ styles.buttonText }>
						{ this.props.text }
					</Text>
				</View>
			</TouchableNativeFeedback>
		)
	}
}

const styles = StyleSheet.create({
	button: {
		height: 40,
		borderRadius: 2,
		backgroundColor: colors.main,
		marginHorizontal: 60,
		marginBottom: 30,
		elevation: 3,
		alignItems: 'center',
		justifyContent: 'center',
		padding: 10
	},

	buttonText: {
		color: '#fff'
	}
})