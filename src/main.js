import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
const firebaseConfig = {
  apiKey: "AIzaSyDhh-C-DFY7IpWOESElhwI84tojOq8m2wk",
  authDomain: "vue-form-87c57.firebaseapp.com",
  projectId: "vue-form-87c57",
  storageBucket: "vue-form-87c57.appspot.com",
  messagingSenderId: "1061988327260",
  appId: "1:1061988327260:web:35da42471cf1046834eb99"
};

initializeApp(firebaseConfig);

const app = createApp(App);
import './assets/base.css'

app.use(router);

app.mount("#app");
