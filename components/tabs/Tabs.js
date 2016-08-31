/*
	Renderiza os tabs no topo da listagem
*/
import React, { Component } from 'react'
import { StyleSheet, Dimensions, View, Animated, ScrollView, TouchableNativeFeedback, Text } from 'react-native'
// Local imports
import colors from '../../helpers/colors'

const { height, width } = Dimensions.get('window')
const SPRING_CONFIG = { tension: 5, friction: 3 }

export default class Tabs extends Component {
	constructor(props) {
		super(props)

		this.state = {
			selectedTab: 'news',
			pan: new Animated.ValueXY(),
			indicatorPos: 0
		}
	}

	getStyle() {
		return [
			styles.indicator, 
			{ transform: this.state.pan.getTranslateTransform() }
		]
	}

	render() {
		let tabs = this.props.data

		return (
			<View style={ styles.container }>
				<ScrollView
					style={ styles.tabs }
					horizontal={ true }
					showsHorizontalScrollIndicator={ false }
				>
					{tabs.map((tab, i) => {
						return (
							<TouchableNativeFeedback
								key={ i }
								onPress={(e) => { this._updateList(tab.key) }}
							>
								<View style={ styles.tab }>
									<Text style={ styles.tabTitle }> { tab.name } </Text>
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
		let tabs = this.props.data

		for (let i = 0; i < tabs.length; i++) {
			if (tabs[i].key === key) {
				Animated.spring(this.state.pan, {
			          ...SPRING_CONFIG,
			          toValue: { y: 0, x: i * itemWidth }
			    }).start()

				break
			}
		}
	}

	_updateList(key) {
		this.setState({ selectedTab: key })
		this._moveIndicator(key)
		this.props.getData(0, key)
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