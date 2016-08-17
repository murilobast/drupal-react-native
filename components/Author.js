/*
	Renderiza o bloco do autor
*/
import React, { Component } from 'react'
import { StyleSheet, Dimensions, View, Text } from 'react-native'

const { height, width } = Dimensions.get('window')

export default class Author extends Component {
	render() {
		let author = this.props.data

		return (
			<View style={ styles.author }>
				<View style={ styles.stroke }></View>
				<Text style={ [styles.authorText, styles.authorPre] }>
					Por 
				</Text>
				<Text style={ styles.authorText }>
						{ author }
				</Text>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	author: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 20,
		marginBottom: 40,
		position: 'relative'
	},

	authorPre: {
		color: '#808080'
	},
	
	authorText: {
		color: '#f3123c',
		fontWeight: 'bold',
		fontSize: 16,
		backgroundColor: '#fff',
		paddingHorizontal: 3
	},

	stroke: {
		position: 'absolute',
		left: 10,
		right: 10,
		top: 12,
		height: 1,
		width: width - 20,
		backgroundColor: '#ddd'
	}
})