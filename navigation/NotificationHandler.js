import PushNotification from 'react-native-push-notification'

export default function NotificationHandler(callback = () => {}) {
	PushNotification.configure({
		onRegister: function(data) {
			console.log('TOKEN:', data.token)
			fetch('http://drupal.murilobastos.com/push/push_notifications', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'Accept': 'application/json'
 				},
				body: JSON.stringify({
					type: 'android',
					token: data.token
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

		onNotification: function(notification) {
			console.log('Notification recieved', notification)
			let nid =  notification.nid
			
			if (!notification.foreground && typeof nid !== 'undefined')
				fetch('http://drupal.murilobastos.com/news/news/' + nid)
					.then((response) => response.json())
					.then((responseJson) => {
						
						callback(responseJson[0])
						return
					})
					.catch((error) => {
						console.error(error)
					})
				else
					console.log("Ignoring app is opened, or there's no NID")
		},

		senderID: '95803460496',

		popInitialNotification: true,

		requestPermissions: true
	})
}