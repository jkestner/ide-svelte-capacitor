import HMR from "@roxi/routify/hmr";
import App from './App.svelte'
import '../assets/global.css'

// const app = new App({
//   target: document.getElementById('app')
// })
const app = HMR(App, { target: document.getElementById('app') }, "routify-app");

export default app
