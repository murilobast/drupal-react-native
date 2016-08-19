/*
	Renderiza a galeria
*/
import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import Gallery from 'react-native-gallery'

export default class GalleryView extends Component {
	render() {

		return (
			<Gallery
				style={ styles.gallery }
				images={[
					'http://www.newshourindia.com/wp-content/uploads/2015/07/Cadbury-Ad-girl.jpg',
					'https://pixabay.com/static/uploads/photo/2014/08/05/10/32/girl-410334_960_720.jpg',
					'http://lebar.in/wp-content/uploads/2014/11/Beautiful-Girl-Wallpaper-Image-Picture2.jpg'
				]}
			/>
		)
	}
}

const styles = StyleSheet.create({
	gallery: {
		flex: 1,
		backgroundColor: 'black',
		height: 160
	}
})