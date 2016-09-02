/*
	Listagem de cards separada por tabs
*/
import React, { Component } from 'react'
import { StyleSheet, Dimensions, View, Text, Image, TouchableNativeFeedback } from 'react-native'
import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view'
// Local imports
import colors from '../../helpers/colors'
import Feed from './Feed'
import Tabs from '../tabs/Tabs'

const { height, width } = Dimensions.get('window')

export default class ListTabs extends Component {
	render() {
		return (
			<ScrollableTabView
				tabBarBackgroundColor={ colors.main }
				tabBarUnderlineColor={ '#fff' }
				tabBarActiveTextColor={ '#fff' }
				tabBarInactiveTextColor={ '#fff' }
				tabBarTextStyle={ styles.tabTitle }
				style={ styles.tabs }
				renderTabBar={() => <Tabs />}
			>
				<Feed tabLabel="RECENTES" rest="last" navigator={ this.props.navigator }/>
				<Feed tabLabel="DESTAQUES" rest="popular" navigator={ this.props.navigator }/>
				
			</ScrollableTabView>
		)
	}
}

const styles = StyleSheet.create({
	tabs: {
		elevation: 3
	},

	tabTitle: {
		color: '#fff',
		fontSize: 16
	}
})