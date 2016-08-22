import PushNotification from 'react-native-push-notification'

export default function NotificationHandler(callback = () => {}) {
	PushNotification.configure({
		onRegister: function(data) {
			console.log('TOKEN:', data.token)
			fetch('http://rest.murilobastos.com/entity/push_notifications_token', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'Accept': 'application/json',
					'Authorization': 'Basic MDo=' // usuario es enha encodados (user 0 = anonimo)
 				},
				body: JSON.stringify({
					network: {
						value: 'android'
					},
					token: {
						value: data.token
					}
				})
			})
				.then((response) => response.json())
				.then((responseJson) => {
					
					console.log(responseJson)
					return
				})
				.catch((error) => {
					console.error(error)
				})
		},

		onNotification: function(notification, b) {
			console.log('Notification recieved')
			let nid = notification.data.nid

			if (!notification.foreground)
				fetch('http://rest.murilobastos.com/news/all/' + nid)
					.then((response) => response.json())
					.then((responseJson) => {
						
						callback(responseJson[0])
						return
					})
					.catch((error) => {
						console.error(error)
					})
				else
					console.log('Ignoring app is opened')
		},

		senderID: "95803460496",

		popInitialNotification: true,

		requestPermissions: true
	})
}