import React, { Component } from 'react'
import { StyleSheet, ScrollView, Text, Image } from 'react-native'

export default class Item extends Component {
	render() {
		let item = this.props.data

		return (
			<ScrollView>
				<Image
					style={ styles.image }
					source={{ uri: item.uri }}
				/>
				<Text style={ styles.title }>{ item.title }</Text>
				<Text style={ styles.itemText }>{ item.body }</Text>
			</ScrollView>
		)
	}
}

const styles = StyleSheet.create({
	title: {
		fontSize: 28,
		fontWeight: 'bold',
		marginBottom: 10,
		marginTop: 20,
		marginHorizontal: 12,
		color: '#333'
	},

	image: {
		flex: 1,
		height: 100
	},

	itemText: {
		fontSize: 20,
		marginHorizontal: 12,
		marginBottom: 40,
		color: '#333'
	}
})