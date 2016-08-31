/*
	Renderiza a galeria
*/
import React, { Component } from 'react'
import { StyleSheet, Dimensions, View, Text } from 'react-native'
import Gallery from 'react-native-gallery'

const { height, width } = Dimensions.get('window')

export default class GalleryView extends Component {
	constructor(props) {
		super(props)

		this.state = {
			title: 'Galeria',
			images: []
		}

		this._getImages(props.url)
	}

	_getImages(url) {
		fetch(url)
			.then((response) => response.json())
			.then((responseJson) => {
				let title = responseJson[0].title
				let images = responseJson[0].images.split(', ')

				this.setState({ images, title })
			})
			.catch((error) => {
				console.error(error)
			})
	}

	render() {
		return (

			<Gallery
				style={ styles.gallery }
				images={ this.state.images }
			/>
		)
		return (
			<View>
				<Text style={ styles.title }>{ this.state.title }</Text>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	title: {
		fontSize: 24,
		color: '#757575',
		marginBottom: 4
	},

	gallery: {
		flex: 1,
		backgroundColor: 'black',
		height: (width - 40) * .56
	}
})