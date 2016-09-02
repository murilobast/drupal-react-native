/*
	Renderiza os tabs no topo da listagem
*/
import React, { Component } from 'react'
import { StyleSheet, Dimensions, View, Animated, ScrollView, TouchableNativeFeedback, Text } from 'react-native'
// Local imports
import colors from '../../helpers/colors'

const { height, width } = Dimensions.get('window')
const SPRING_CONFIG = { tension: 5, friction: 5 }
let scroll = 0

export default class Tabs extends Component {
	constructor(props) {
		super(props)

		this.state = {
			scrollView: {},
			pan: new Animated.ValueXY()
		}
	}

	getStyle() {
		return [
			styles.indicator, 
			{ transform: this.state.pan.getTranslateTransform() }
		]
	}

	componentDidUpdate() {
		let key = this.props.activeTab
		let itemWidth = width / 3
		let containerScroll = (key - 1) * itemWidth

		this._scrollView.scrollTo({ x: containerScroll < 0 ? 0 : containerScroll }, true)
		this._moveIndicator(key)
	}

	render() {
		let tabs = this.props.tabs

		return (
			<View style={ styles.container }>
				<ScrollView
					style={ styles.tabs }
					horizontal={ true }
					showsHorizontalScrollIndicator={ false }
					ref={(ref) => this._scrollView = ref }
				>
					{tabs.map((tab, key) => {
						return (
							<TouchableNativeFeedback
								key={ key }
								onPress={(e) => { this._updateList(key) }}
							>
								<View style={ styles.tab }>
									<Text style={ styles.tabTitle }> { tab } </Text>
								</View>
							</TouchableNativeFeedback>
						)
					})}

					<Animated.View style={ this.getStyle() }/>
				</ScrollView>
			</View>
		)
	}

	_moveIndicator(key) {
		let itemWidth = width / 3
		let containerScroll = (key - 1) * itemWidth

		Animated.spring(this.state.pan, {
			...SPRING_CONFIG,
			toValue: { y: 0, x: key * itemWidth }
		}).start()

	}

	_updateList(key) {
		this._moveIndicator(key)
		this.props.goToPage(key)
	}
}

const styles = StyleSheet.create({
	container: {
		position: 'relative',
		height: 42
	},
	
	tabs: {
		backgroundColor: colors.main,
		position: 'relative',
		elevation: 3
	},

	tab: {
		width: width / 3,
		justifyContent: 'center',
		alignItems: 'center'
	},

	tabTitle: {
		color: '#fff',
		fontSize: 16
	},

	indicator: {
		height: 4,
		width: width / 3,
		backgroundColor: '#fff',
		position: 'absolute',
		bottom: 0,
		left: 0
	}
})