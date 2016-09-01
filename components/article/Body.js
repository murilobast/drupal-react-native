/*
	Transforma o conteudo do corpo da matéria em componentes nativos
	** Video do youtube nativo no android ainda não é suportado pelo React Native **
*/

import React, { Component } from 'react'
import { StyleSheet, Dimensions, WebView, View, Image, Text } from 'react-native'
import HTMLRender from 'react-native-html-render'
// Local imports
import colors from '../../helpers/colors'
import GalleryView from '../GalleryView'

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
	
	// Fazer um helper para parsear o conteudo ao invez de fazer tudo nesse metodo
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

			if (typeof node.children !== 'undefined') {
				let children = node.children[0]

				if (children.name === 'mediawrapper') {
					let source = {}

					for (let i = 0; i < children.children.length; i++) {
						let item = children.children[i]

						if (item.name === 'video') {
							
							source = item.children[0]
							break
						}
					}

					let rgxp = /v=([a-zA-Z0-9]+)$/
					let match = source.attribs.src.match(rgxp)

					if (match.length) {
						let id = match[1]
						let uri = 'http://www.youtube.com/embed/' + id
						let videoWidth = (width - 60) * .562
						let html = 
							`<iframe 
								src="${uri}"
								width="${width - 60}"
								height="${videoWidth}"
								frameborder="0"
								allowfullscreen
								webkitAllowFullScreen
								mozallowfullscreen
							>
							</iframe>`

						return (
							<View>
								<WebView
									key={ index }
									source={{ html }}
									style={{ height: videoWidth }}
								/>								
							</View>
						)
					}
				}
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