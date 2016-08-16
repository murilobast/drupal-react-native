import React, { Component } from 'react'
import { StyleSheet, View, ListView, Text, Image, TouchableOpacity, RefreshControl } from 'react-native'

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

		// Recupera materias no primeiro load (não é uma boa pratica chamar aqui)
		this._getNews();
	}

	// Metodo para executar o refresh
	_onRefresh() {
		this.setState({ refreshing: true })
		this._getNews()
	}

	// Recupera materias do backend en drupal
	_getNews() {
		return fetch('http://rest.murilobastos.com/news')
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
		return (
			<View style={ styles.centered }>
				<View style={ styles.topBar } >
					<Text style={ styles.title }>DESTAQUES</Text>
				</View>
				<ListView
					// Quantidade de itens para serem renderizados no primeiro scroll
					initialListSize={ 12 }
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
			</TouchableOpacity>
		)
	}

	// Navega para a rota do item clicado
	_navigateToItem(item) {
		this.props.navigator.push({ name: 'item', data: item })
	}
}

const styles = StyleSheet.create({
	centered: {
		flex: 1,
		justifyContent: 'center'
	},

	image: {
		flex: 1,
		height: 200
	},

	topBar: {
		elevation: 3,
		paddingVertical: 8,
		backgroundColor: '#fff'
	},

	title: {
		fontSize: 16,
		textAlign: 'center',
		color: '#212121',
		paddingHorizontal: 10
	},

	item: {
		marginBottom: 20,
		backgroundColor: '#fff',
		paddingBottom: 5,
		elevation: 1,
		overflow: 'hidden'
	},

	itemTextContainer: {
		marginVertical: 20,
		paddingHorizontal: 20,
		borderLeftWidth: 3,
		borderLeftColor: '#3F51B5'
	},

	itemText: {
		textAlign: 'left',
		fontSize: 18,
		color: '#757575',

	}
})