import { defineStore } from "pinia";
import axios from "axios";

export const useShopStore = defineStore("shop", {
  state: () => ({
    items: [],
    cartItems: JSON.parse(localStorage.getItem("cart")) || [],
    favoriteItems: [],
    notification: null,
  }),

  actions: {
    async fetchItems(sortBy = "name", searchQuery = "", category = "") {
      try {
        const params = { sortBy };
        if (searchQuery) params.name = `*${searchQuery}*`;
        if (category) params.category = category;
        const res = await axios.get(
          "https://61491fe95a8721ce.mokky.dev/items",
          { params }
        );
        this.items = res.data;
        await this.fetchFavorites();
      } catch (err) {
        console.error("Ошибка при загрузке:", err);
      }
    },

    async fetchBestSellers() {
      try {
        const res = await axios.get(
          "https://61491fe95a8721ce.mokky.dev/items",
          { params: { isBestSeller: true } }
        );
        this.items = res.data;
        await this.fetchFavorites();
      } catch (err) {
        console.error("Ошибка при загрузке бестселлеров:", err);
      }
    },

    addToCart(product) {
      const existing = this.cartItems.find((i) => i.id === product.id);
      if (existing) {
        existing.quantity += 1;
      } else {
        this.cartItems.push({ ...product, quantity: 1 });
        this.showNotification("Товар добавлен в корзину");
      }
      this.saveCart();
    },

    removeFromCart(id) {
      this.cartItems = this.cartItems.filter((i) => i.id !== id);
      this.saveCart();
      this.showNotification("Товар удалён из корзины");
    },

    updateQuantity(id, quantity) {
      const item = this.cartItems.find((i) => i.id === id);
      if (item) {
        item.quantity = quantity;
        if (item.quantity <= 0) {
          this.removeFromCart(id);
        }
      }
      this.saveCart();
    },

    clearCart() {
      this.cartItems = [];
      this.saveCart();
    },

    saveCart() {
      localStorage.setItem("cart", JSON.stringify(this.cartItems));
    },

    async fetchItemById(id) {
      try {
        const res = await axios.get(
          `https://61491fe95a8721ce.mokky.dev/items/${id}`
        );
        return res.data;
      } catch (err) {
        console.error("Ошибка при загрузке товара по ID:", err);
        return null;
      }
    },

    showNotification(message) {
      this.notification = message;
      setTimeout(() => {
        this.notification = null;
      }, 3000);
    },

    async toggleFavorite(item) {
      try {
        if (!item.isFavorite) {
          const obj = { item_id: item.id };
          const { data } = await axios.post(
            "https://61491fe95a8721ce.mokky.dev/favorites",
            obj
          );
          item.isFavorite = true;
          item.favoriteId = data.id;
          this.showNotification("Товар добавлен в избранное");
        } else {
          await axios.delete(
            `https://61491fe95a8721ce.mokky.dev/favorites/${item.favoriteId}`
          );
          item.isFavorite = false;
          item.favoriteId = null;
          this.showNotification("Товар удалён из избранного");
        }
      } catch (err) {
        console.error("Ошибка при добавлении в избранное:", err);
      }
    },

    async fetchFavorites() {
      try {
        const res = await axios.get(
          "https://61491fe95a8721ce.mokky.dev/favorites"
        );
        this.favoriteItems = res.data;
        this.items.forEach((item) => {
          const fav = this.favoriteItems.find((f) => f.item_id === item.id);
          if (fav) {
            item.isFavorite = true;
            item.favoriteId = fav.id;
          } else {
            item.isFavorite = false;
            item.favoriteId = null;
          }
        });
      } catch (err) {
        console.error("Ошибка при загрузке избранного:", err);
      }
    },
  },
});
