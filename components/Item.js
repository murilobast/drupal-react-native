import React, { Component } from 'react'
import { StyleSheet, Dimensions, View, ScrollView, Text, Image } from 'react-native'
import HTMLView from 'react-native-htmlview'

const { height, width } = Dimensions.get('window')

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
				<View style={ styles.textContainer }>
					<HTMLView
						stylesheet={ styles }
						value={ item.body }
						renderNode= { this._renderHtml }
					/>
				</View>
			</ScrollView>
		)
	}

	_renderHtml(node, i) {
		if (node.type === 'tag' && node.name === 'img')
			return (
				<Image
					key={ 'img' + i }
					style={ styles.img }
					source={{ uri: node.attribs.src }}
					getSize={ this._getSize }
				/>
			)
	}

	_getSize(a, b, c) {
		console.log(a, b, c)
	}
}

const styles = StyleSheet.create({
	title: {
		fontSize: 28,
		fontWeight: 'bold',
		marginBottom: 10,
		marginTop: 20,
		marginHorizontal: 12,
		color: '#212121'
	},

	image: {
		flex: 1,
		height: 100
	},

	img: {
		height: height / 3,
		width: width - 20,
		resizeMode: Image.resizeMode.contain
	},

	p: {
		fontSize: 20,
		color: '#757575'
	},

	a: {
		fontSize: 20,
		color: '#3F51B5'
	},

	textContainer: {
		marginHorizontal: 12,
		marginBottom: 40
	}
})