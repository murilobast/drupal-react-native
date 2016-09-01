/*
	Listagem de cards separada por tabs
*/
import React, { Component } from 'react'
import { StyleSheet, Dimensions, View, Text, Image, TouchableNativeFeedback } from 'react-native'
import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view'
// Local imports
import colors from '../../helpers/colors'
import CardList from './CardList'
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
				<CardList tabLabel="RECENTES"/>
				<CardList tabLabel="DESTAQUES"/>
				<CardList tabLabel="GALERIAS"/>
				<CardList tabLabel="VIDEOS"/>
			</ScrollableTabView>
		)
	}

	// Navega para a rota do item clicado
	_navigateToItem(item) {
		this.props.navigator.push({ name: 'article', data: item })
	}
}

const styles = StyleSheet.create({
	tabs: {
		// width: 600,
		elevation: 3,
		// flexDirection: 'row'
	},

	tabTitle: {
		color: '#fff',
		fontSize: 16
	}
})