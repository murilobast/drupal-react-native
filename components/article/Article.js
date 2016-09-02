/*
	Renderiza o conteudo da matéria
*/

import React, { Component } from 'react'
import { StyleSheet, Dimensions, ActivityIndicator, InteractionManager, View, Text, Image } from 'react-native'
import ParallaxScrollView from 'react-native-parallax-scroll-view'
// Local imports
import Body from './Body'
import Precontent from './Precontent'
import Author from './Author'
import Disqus from '../Disqus'
import Button from '../Button'

const { height, width } = Dimensions.get('window')

export default class Item extends Component {
	constructor(props) {
		super(props)

		this.state = {
			renderPlaceholder: true
		}
	}
	componentDidMount() {
		InteractionManager.runAfterInteractions(() => {
			setTimeout(() => {
				this.setState({ renderPlaceholder: false })
			}, 1000)
		})
	}
	render() {
		let item = this.props.data

		return (
			<ParallaxScrollView
				parallaxHeaderHeight={ width * .7 }
				renderBackground={ () => this._renderBackground(item) }
			>
				<Text style={ styles.title }>{ item.title }</Text>
				<Precontent data={ item }/>
				<Author data={ item.author }/>
				<View style={ styles.textContainer }>
					{ this._renderWhenAnimationCompletes(item) }
				</View>
				<Button
					text={ 'COMENTÁRIOS' }
					action={ (e) => this._navigateToItem(item) }
				/>
			</ParallaxScrollView>
		)
	}

	_renderBackground(item) {
		return (
			<Image
				style={ styles.parallax }
				source={{ uri: item.image }}
			/>
		)
	}

	// Deve ser movido para o component Body após separar o body em uma rota diferente
	_renderWhenAnimationCompletes(item) {
		if (this.state.renderPlaceholder)
			return (
				<ActivityIndicator
					color={ '#0099ff' }
					animating={ this.state.loading }
					size={ 'small' }
					style={ styles.centering }
				/>
			)
		return (
			<Body data={ item.body }/>
		)
	}

	_navigateToItem(item) {
		this.props.navigator.push({ name: 'disqus', id: item.nid })
	}
}

const styles = StyleSheet.create({
	centering: {
		position: 'absolute',
		top: 0,
		left: 0,
		bottom: 0,
		right: 0
	},

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
		minHeight: 100,
		marginHorizontal: 20,
		marginBottom: 40,
		backgroundColor: '#fff'
	}
})