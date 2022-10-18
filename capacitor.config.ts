import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
	appId: 'com.svelte.capacitor', // TODO: add your app id
	appName: 'Pickup',
	webDir: 'public',
	bundledWebRuntime: false,
	plugins: {
		"SplashScreen": {
			"launchShowDuration": 0
		}
	},
	// remove server section before making production build
	// server: {
	// 	// for android only, below settings will work out of the box
	// 	// for iOS or both, change the url to http://your-device-ip 
	// 	// To discover your workstation IP, just run ifconfig
	// 	"url": "http://localhost:5001/",
	// 	"cleartext": true
	// }
};

export default config;
