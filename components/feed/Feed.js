/*
	Recupera a lista de materias servidas pelo drupal e renderiza uma lista com imagem e titulo

	Código está gigante, precisa ser componetizado
*/
import React, { Component } from 'react'
import {
	StyleSheet,
	AsyncStorage,
	ActivityIndicator,
	Dimensions,
	View,
	ListView,
	Text,
	Image,
	RefreshControl
} from 'react-native'
// Local imports
import Tabs from '../tabs/Tabs'
import Precontent from '../article/Precontent'
import Card from './Card'

const { height, width } = Dimensions.get('window')

export default class Feed extends Component {
	constructor(props) {
		super(props)

		// Gera um datasource para o listview
		let ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })

		this.state = {
			itemsDataSource: ds.cloneWithRows([]),
			refreshing: false,
			loading: true,
			key: props.rest
		}

		// Evita bindar o this no metodo render (performance)
		this._getNews = this._getNews.bind(this)
		this._onRefresh = this._onRefresh.bind(this)
		this._checkCache = this._checkCache.bind(this)
		this._setNewsData = this._setNewsData.bind(this)

		// Recupera materias no primeiro load (não é uma boa pratica chamar aqui)
		this._checkCache()
	}

	// Metodo para executar o refresh
	_onRefresh() {
		this.setState({ refreshing: true })
		this._checkCache()
	}

	// Cachea a resposta json
	_checkCache(page = 0, key) {
		if (typeof key === 'undefined')
			key = this.state.key
		else 
			this.setState({ key: key })

		AsyncStorage.getItem('newsData-' + key + page).then((newsString) => {
			if (newsString != null) {
				let newsItems = JSON.parse(newsString)

				AsyncStorage.getItem('time-' + key + page).then((timeString) => {
					let lastCache = new Date(parseInt(timeString)).getTime()
					let now = new Date().getTime()
					let diffTime = now - lastCache
					let expireTime = 1000 * 60 * 1

					console.log(timeString, lastCache, now, diffTime, expireTime)
					if (timeString === null || diffTime >= expireTime)
						this._getNews(page, key)
					else
						this._setNewsData(page, key, newsItems)
				})
			} else {
				this._getNews(page, key)
			}

		}).done()
	}

	// Recupera materias do backend en drupal
	_getNews(page = 0, key = 'news') {
		let url = 'http://drupal.murilobastos.com/' + key
		console.log(url)
		return fetch(url)
			.then((response) => response.json())
			.then((responseJson) => {

				this._cacheRequest(page, key, responseJson)
				this._setNewsData(page, key, responseJson)
				return
			})
			.catch((error) => {
				console.error(error)
			})
	}

	// Caching JSON data to avoid unecessary connections
	_cacheRequest(page = 0, key = 'news', data) {
		AsyncStorage.setItem('newsData-' + key + page, JSON.stringify(data))
		AsyncStorage.setItem('time-' + key + page, new Date().getTime().toString())
	}

	// Feeding the component with the actual data
	_setNewsData(page = 0, key = 'news', data) {
		let ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })

		this.setState({
			itemsDataSource: ds.cloneWithRows(data),
			refreshing: false,
			loading: false
		})

	}

	render() {
		return (
			<View style={ styles.list }>
				<ListView
					// Quantidade de itens para serem renderizados no primeiro scroll
					initialListSize={ 6 }
					// Define quantos cards devem ser renderizados abaixo da area visivel
					scrollRenderAheadDistance={ 2 }
					// Define qual é a fonte de dados da qual a ListView vai se "alimentar"
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
				<ActivityIndicator
					color={ '#0099ff' }
					animating={ this.state.loading }
					size={ 'small' }
					style={ styles.centering }
				/>
			</View>
		)
	}

	// Meteodo para renderizar cada item da lista
	_renderItemRow(item) {
		return (
			<Card item={ item } navigator={ this.props.navigator }/>
		)
	}

	// Navega para a rota do item clicado
	_navigateToItem(item) {
		this.props.navigator.push({ name: 'item', data: item })
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