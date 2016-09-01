import React, { Component } from 'react'
import { StatusBar, StyleSheet, DrawerLayoutAndroid, View, Text, ToolbarAndroid } from 'react-native'
// Local imports
import colors from '../helpers/colors'

export default class ViewContainer extends Component {
	render() {
		return (
			<DrawerLayoutAndroid
				ref={(ref) => this._drawer = ref }
				drawerWidth={ 300 }
				drawerPosition={ DrawerLayoutAndroid.positions.Left }
				renderNavigationView={ this._renderNavigationView }
			>
				<View
					style={ styles.container }
				>
					<StatusBar
						backgroundColor={ colors.mainDarker }
						barStyle='light-content'
					/>
					<ToolbarAndroid 
						style={ styles.toolbar }
						navIcon={ require('image!ic_menu_white_24dp') }
						onIconClicked={() => { this._drawer.openDrawer() }}
					>
						<Text style={ styles.titleFirst }>DRUPAL</Text>
						<Text style={ styles.titleSecond }>NATIVE</Text>
					</ToolbarAndroid>
					<View style={ styles.content }>
						{ this.props.children }
					</View>
				</View>
			</DrawerLayoutAndroid>
		)
	}

	_renderNavigationView() {
		// Temporario. Renderiza o conteudo do drawer (tem que mudar)
		return (
			<View style={{flex: 1, backgroundColor: '#fff'}}>
				<Text style={{margin: 10, fontSize: 15, textAlign: 'left'}}>I'm in the Drawer!</Text>
				<Text style={{margin: 10, fontSize: 15, textAlign: 'left'}}>Que coisa, não?</Text>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignSelf: 'stretch',
		backgroundColor: '#eee',
		width: null,
		height: null
	},

	content: {
		flex: 1
	},

	titleFirst: {
		color: 'rgba(255, 255, 255, .7)',
		fontSize: 20
	},

	titleSecond: {
		color: 'rgba(255, 255, 255, 1)',
		fontSize: 20,
		fontWeight: 'bold'
	},

	toolbar: {
		backgroundColor: colors.main,
		height: 56
	}
})