/*
	Recupera a lista de materias servidas pelo drupal e renderiza uma lista com imagem e titulo
*/
import React, { Component } from 'react'
import { StyleSheet, Dimensions, View, ListView, Text, Image, TouchableOpacity, RefreshControl } from 'react-native'
// Local imports
import Tabs from './Tabs'
import Precontent from './Precontent'

const { height, width } = Dimensions.get('window')

export default class List extends Component {
	constructor(props) {
		super(props)

		// Gera um datasource para o listview
		let ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })

		this.state = {
			itemsDataSource: ds.cloneWithRows([]),
			refreshing: false
		}
		// Evita bindar o this no metodo render (performance)
		this._onRefresh = this._onRefresh.bind(this)
		this._getNews = this._getNews.bind(this)

		// Recupera materias no primeiro load (não é uma boa pratica chamar aqui)
		this._getNews();
	}

	// Metodo para executar o refresh
	_onRefresh() {
		this.setState({ refreshing: true })
		this._getNews()
	}

	// Recupera materias do backend en drupal
	_getNews(key = 'all') {
		return fetch('http://rest.murilobastos.com/news/' + key)
			.then((response) => response.json())
			.then((responseJson) => {
				let ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })

				this.setState({ itemsDataSource: ds.cloneWithRows(responseJson), refreshing: false })
				return;
			})
			.catch((error) => {
				console.error(error)
			})
	}

	render() {
		let tabs = [
			{ name: 'Destaques', key: 'all' },
			{ name: 'Tecnologia', key: 'tecnologia' },
			{ name: 'Jogos', key: 'jogos' },
			{ name: 'Cinema', key: 'cinema' }
		]

		return (
			<View style={ styles.list }>
				<Tabs data={ tabs } getData={ this._getNews }/>
				<ListView
					// Quantidade de itens para serem renderizados no primeiro scroll
					initialListSize={ 6 }
					dataSource={ this.state.itemsDataSource }
					// Chama o metodo para renderizar os items
					renderRow={(item) => { return this._renderItemRow(item) }}
					// Controla os states de refresh e checa se existe noticias novas
					enableEmptySections={ true }
					refreshControl={
						<RefreshControl
							refreshing={ this.state.refreshing }
							onRefresh={ this._onRefresh }
						/>
					}
				/>
			</View>
		)
	}

	// Meteodo para renderizar cada item da lista
	_renderItemRow(item) {
		return (
			<TouchableOpacity
				style={ styles.item }
				onPress={(e) => { this._navigateToItem(item) }}
			>
				<Image
					style={ styles.image }
					source={{ uri: item.uri }}
				/>
				<View style={ styles.itemTextContainer }>
					<Text style={ styles.itemText }>{ item.title }</Text>
				</View>
				<Precontent data={ item }/>
			</TouchableOpacity>
		)
	}

	// Navega para a rota do item clicado
	_navigateToItem(item) {
		this.props.navigator.push({ name: 'item', data: item })
	}
}

const styles = StyleSheet.create({
	list: {
		flex: 1,
		justifyContent: 'center'
	},

	image: {
		flex: 1,
		height: width * .58
	},

	topBar: {
		elevation: 3,
		paddingVertical: 8,
		backgroundColor: '#fff'
	},

	item: {
		marginVertical: 10,
		backgroundColor: '#fff',
		paddingBottom: 5,
		elevation: 2,
		overflow: 'hidden',
		borderRadius: 3,
		marginHorizontal: 10
	},

	itemTextContainer: {
		marginVertical: 20,
		paddingHorizontal: 20
	},

	itemText: {
		textAlign: 'center',
		fontSize: 17,
		lineHeight: 26,
		color: 'grey'
	}
})