/*
	Recupera a lista de materias servidas pelo drupal e renderiza uma lista com imagem e titulo
*/
import React, { Component } from 'react'
import { StyleSheet, AsyncStorage, Dimensions, View, ListView, Text, Image, TouchableNativeFeedback, RefreshControl } from 'react-native'
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
		this._checkCache(0, 'all')
	}

	// Metodo para executar o refresh
	_onRefresh() {
		this.setState({ refreshing: true })
		this._getNews()
	}

	// Cachea a resposta json
	_checkCache(page = 0, key) {
		AsyncStorage.getItem('newsData-' + key + page).then((newsString) => {
			if (newsString != null) {
				let newsItems = JSON.parse(newsString)

				AsyncStorage.getItem('time-' + key + page).then((timeString) => {
					let lastCache = new Date(parseInt(timeString)).getTime()
					let now = new Date().getTime()
					let diffTime = now - lastCache
					let expireTime = 1000 * 60 * 1

					console.log(timeString, lastCache, now, diffTime, expireTime)
					if (diffTime >= expireTime)
						this._getNews(page, key)
					else
						this._setNewsData(page, key, newsItems, true)
				})
			} else {
				this._getNews(page, key)
			}

		}).done()
	}

	// Recupera materias do backend en drupal
	_getNews(page = 0, key = 'all') {
		return fetch('http://rest.murilobastos.com/news/' + key)
			.then((response) => response.json())
			.then((responseJson) => {

				this._setNewsData(page, key, responseJson)
				return
			})
			.catch((error) => {
				console.error(error)
			})
	}

	_setNewsData(page = 0, key = 'all', data, fromCache = false) {
		let ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })

		this.setState({ itemsDataSource: ds.cloneWithRows(data), refreshing: false })
		console.log('newsData-' + key + page, fromCache)
		AsyncStorage.setItem('newsData-' + key + page, JSON.stringify(data))
		AsyncStorage.setItem('time-' + key + page, new Date().getTime().toString())
	}

	render() {
		let tabs = [
			{ name: 'DESTAQUES', key: 'all' },
			{ name: 'TECNOLOGIA', key: 'tecnologia' },
			{ name: 'JOGOS', key: 'jogos' },
			{ name: 'CINEMA', key: 'cinema' }
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
			<TouchableNativeFeedback
				onPress={(e) => { this._navigateToItem(item) }}
			>
				<View style={ styles.item }>
					<Image
						style={ styles.image }
						source={{ uri: item.uri }}
					/>
					<View style={ styles.itemTextContainer }>
						<Text style={ styles.itemText }>{ item.title }</Text>
					</View>
					<Precontent data={ item }/>
				</View>
			</TouchableNativeFeedback>
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