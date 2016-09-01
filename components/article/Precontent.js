import React, { Component } from 'react'
import { StyleSheet, Dimensions, View, Image, Text } from 'react-native'
// Local imports
import colors from '../../helpers/colors'

const { height, width } = Dimensions.get('window')

export default class Precontent extends Component {
	render() {
		let item = this.props.data
		
		return (
			<View>
				<View style={ styles.container }>
					<View style={ styles.item }>
						<Text style={ styles.date }>
							{ item.views || 0 } views
						</Text>
					</View>
					<View style={ styles.center }>
						<Text style={ styles.date }>
							{ item.created }
						</Text>
					</View>
					<View style={ styles.item }>
						<Text style={ styles.date }>
							2 comments
						</Text>
					</View>
				</View>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		height: 46,
		flexDirection: 'row',
		backgroundColor: '#f7f7f7',
		justifyContent: 'center',
		alignItems: 'center'
	},

	item: {
		width: (width - 40) / 3,
		justifyContent: 'center',
		alignItems: 'center',
	},

	center: {
		width: width / 3,
		justifyContent: 'center',
		alignItems: 'center',
		borderColor: '#ccc',
		borderLeftWidth: 1,
		borderRightWidth: 1,
		height: 32
	},

	date: {
		fontSize: 16,
		color: colors.main
	},

	author: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
	}
})