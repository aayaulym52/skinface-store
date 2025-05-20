import { createPinia } from "pinia";
import { createApp } from "vue";
import { createWebHistory, createRouter } from "vue-router";
import { autoAnimatePlugin } from "@formkit/auto-animate/vue";
import "./assets/style.css";
import App from "./App.vue";
import Home from "./pages/Home.vue";
import Shop from "./pages/Shop.vue";
import Contact from "./pages/Contact.vue";
import Delivery from "./pages/Delivery.vue";
import AboutUs from "./pages/AboutUs.vue";
import ProductDetail from "./pages/ProductDetail.vue";
import Profile from "./pages/Profile.vue";
import Favorites from "./pages/Favorites.vue";
import Cart from "./pages/Cart.vue";
import Checkout from "./pages/Checkout.vue";

const app = createApp(App);
const routes = [
  { path: "/", name: "Home", component: Home },
  { path: "/shop", name: "Shop", component: Shop },
  { path: "/contact", name: "Contact", component: Contact },
  { path: "/delivery", name: "Delivery", component: Delivery },
  { path: "/about-us", name: "AboutUs", component: AboutUs },
  { path: "/product/:id", name: "ProductDetail", component: ProductDetail },
  { path: "/profile", name: "Profile", component: Profile },
  { path: "/favorites", name: "Favorites", component: Favorites },
  { path: "/cart", name: "Cart", component: Cart },
  { path: "/checkout", name: "Checkout", component: Checkout },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});
app.use(router);
app.use(createPinia());
app.use(autoAnimatePlugin);
app.mount("#app");
