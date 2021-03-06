/*
	To do
*/
import React, { Component } from 'react'
import { StyleSheet, Dimensions, View, Text, Image, TouchableNativeFeedback } from 'react-native'
// Local imports
import Tabs from '../tabs/Tabs'
import CardFooter from './CardFooter'

const { height, width } = Dimensions.get('window')

export default class Card extends Component {
	render() {
		let item = this.props.item

		if (/<img/.test(item.image)) {
			let rgxp = /src="(http:\/\/[a-zA-Z-0-9].*\.jpg\?itok=[a-zA-Z-0-9]*)/
			let match = item.image.match(rgxp)
			if (match.length)
				item.image = match[1]

		}

		return (
			<TouchableNativeFeedback
				onPress={(e) => { this._navigateToItem(item) }}
			>
				<View style={ styles.item }>
					<Image
						style={ styles.image }
						source={{ uri: item.image }}
					/>
					<View style={ styles.itemTextContainer }>
						<Text style={ styles.itemText }>{ item.title }</Text>
					</View>
					<CardFooter data={ item }/>
				</View>
			</TouchableNativeFeedback>
		)
	}

	// Navega para a rota do item clicado
	_navigateToItem(item) {
		this.props.navigator.push({ name: 'article', data: item })
	}
}

const styles = StyleSheet.create({
	image: {
		flex: 1,
		height: width * .58
	},

	item: {
		marginVertical: 10,
		backgroundColor: '#fff',
		elevation: 2,
		overflow: 'hidden',
		borderRadius: 3,
		marginHorizontal: 10
	},

	itemTextContainer: {
		marginVertical: 20,
		paddingHorizontal: 20
	},

	itemText: {
		textAlign: 'center',
		fontSize: 17,
		lineHeight: 26,
		color: 'grey'
	}
})