/*
	Transforma o conteudo do corpo da matéria em componentes nativos
*/

import React, { Component } from 'react'
import { StyleSheet, Dimensions, Image } from 'react-native'
import HTMLRender from 'react-native-html-render'
// Local imports
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
		let name = node.name

		if (name === 'drupal-entity') {
			let uid = node.attribs['data-entity-uuid']
			let url = 'http://rest.murilobastos.com/gallery/' + uid

			return (
				<GalleryView url={ url }/>
			)
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
		color: '#008ae5'
	},

	em: {
		fontSize: 18,
		fontStyle: 'italic'
	}
})