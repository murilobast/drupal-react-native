import React, { Component } from 'react'
import { StyleSheet, Dimensions, View, Image, Text } from 'react-native'
// Local imports
import colors from '../../helpers/colors'

const { height, width } = Dimensions.get('window')

export default class CardFooter extends Component {
	render() {
		let item = this.props.data
		
		return (
			<View>
				<View style={ styles.container }>
					<View style={ styles.item }>
						<Image
							style={[ styles.image, styles.views ]}
							source={ require('image!ic_visibility_white_18dp') }
							tintColor={ colors.main }
						/>
						<Text style={ styles.text }>{ item.views || 0 }</Text>
					</View>
					<View style={ styles.item }>
						<Text style={ styles.text }> { item.created } </Text>
					</View>
					<View style={ styles.item }>
						<Image
							style={ styles.image }
							source={ require('image!ic_share_white_18dp') }
							tintColor={ colors.main }
						/>
					</View>
					<View style={[ styles.item, styles.last]}>
						<Image
							style={[ styles.image, styles.star ]}
							source={ require('image!ic_star_rate_white_18dp') }
							tintColor={ colors.main }
						/>
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
		backgroundColor: '#fcfcfc',
		justifyContent: 'center',
		alignItems: 'center',
		borderBottomLeftRadius: 3,
		borderBottomRightRadius: 3
	},

	item: {
		width: (width - 20) / 4,
		flexDirection: 'row',
		justifyContent: 'center',
		borderRightWidth: 1,
		borderColor: '#ccc'
	},

	last: {
		borderRightWidth: 0
	},
	
	text: {
		fontSize: 16,
		color: colors.main
	},

	image: {
		height: 24,
		resizeMode: Image.resizeMode.contain
	},

	views: {
		height: 22,
		width: 28,
	},

	star: {
		height: 34,
		width: 34
	}
})