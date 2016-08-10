import React, { Component } from 'react'
import { StyleSheet, View, Text, TextInput } from 'react-native'
import Button from 'apsl-react-native-button'

// Hardcoded Login form
export default class Login extends Component {
	constructor(props) {
		super(props);
	
		this.state = {
			login: 'fulano',
			password: 'password'
		}
	}

	render() {
		return (
			<View style={ styles.centered }>
				<Text>Username</Text>
				<TextInput
					style={ styles.input }
					onChangeText={ (text) => this.setState({ login: text }) }
					value={ this.state.login }
				/>
				<Text>Password</Text>
				<TextInput
					style={ styles.input }
					onChangeText={ (text) => this.setState({ password: text }) }
					value={ this.state.password }
					secureTextEntry={ true }
				/>
				<Button
					style={ styles.button }
					onPress={(e) => { this._navigateToList() }}
				>
					Login
				</Button>
			</View>
		)
	}

	_navigateToList() {
		this.props.navigator.push({ name: 'list' })
	}
}

const styles = StyleSheet.create({
	button: {
		marginTop: 10,
		backgroundColor: 'white',
		fontSize: 20
	},

	input: {
		marginBottom: 20,
		fontSize: 18
	},

	centered: {
		flex: 1,
		justifyContent: 'center',
		paddingHorizontal: 50
	}
})