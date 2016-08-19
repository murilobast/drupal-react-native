/*
	Renderiza o conteudo da matéria
*/

import React, { Component } from 'react'
import { StyleSheet, Dimensions, View, Text, Image } from 'react-native'
import ParallaxScrollView from 'react-native-parallax-scroll-view'
// Local imports
import Body from './Body'
import Precontent from './Precontent'
import Author from './Author'
import GalleryView from './GalleryView'

const { height, width } = Dimensions.get('window')

export default class Item extends Component {
	render() {
		let item = this.props.data

		return (
			<ParallaxScrollView
				parallaxHeaderHeight={ width * .7 }
				renderBackground={() => (
					<Image
						style={ styles.parallax }
						source={{ uri: item.uri }}
					/>
				)}
			>
				<Text style={ styles.title }>{ item.title }</Text>
				<Precontent data={ item }/>
				<Author data={ item.author }/>
				<View style={ styles.textContainer }>
					<Body data={ item.body }/>
				</View>
				<GalleryView/>
			</ParallaxScrollView>
		)
	}
}

const styles = StyleSheet.create({
	title: {
		textAlign: 'center',
		fontSize: 23,
		lineHeight: 36,
		marginHorizontal: 40,
		marginVertical: 30,
		color: 'grey'
	},

	parallax: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		width: width,
		height: width * .7,
	},

	textContainer: {
		marginHorizontal: 20,
		marginBottom: 40,
		backgroundColor: '#fff'
	}
})