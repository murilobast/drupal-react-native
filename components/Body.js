/*
	Transforma o conteudo do corpo da matéria em componentes nativos
*/

import React, { Component } from 'react'
import { StyleSheet, Dimensions, Image } from 'react-native'
import HTMLRender from 'react-native-html-render'
// Local imports
import colors from '../helpers/colors'
import GalleryView from './GalleryView'

const { height, width } = Dimensions.get('window')

export default class Body extends Component {
	render() {
		let html = this.props.data

		return (
			<HTMLRender
				stylesheet={ htmlStylesheet }
				value={ html }
				onLinkPress={() => { }}
				renderNode={ this._renderNode }
			/>
		)
	}
	
	_renderNode(node, index, parent, type) {
		if (node.type === 'block') {
			let attrs = node.attribs
			let galleryRgxp =/node-ct-gallery/

			if (galleryRgxp.test(attrs.class)) {
				let nidRgxp = /node-([0-9]*)/
				let nid = attrs.id.match(nidRgxp)[1]
				let url = 'http://drupal.murilobastos.com/gallery/' + nid

				return (
					<GalleryView key={ index } url={ url }/>
				)
			}
		}
	}
}

const htmlStylesheet = StyleSheet.create({
	img: {
		height: height / 4,
		resizeMode: Image.resizeMode.contain
	},

	p: {
		fontSize: 18,
		lineHeight: 88,
		color: '#757575'
	},

	a: {
		fontSize: 18,
		color: colors.main
	},

	em: {
		fontSize: 18,
		fontStyle: 'italic'
	}
})