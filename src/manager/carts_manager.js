import fs from "fs";
import { v4 as uuidv4 } from "uuid";

export default class CartsManager {
  constructor(path) {
    this.path = path;
  }

  async getCarts() {
    try {
      if (fs.existsSync(this.path)) {
        const carts = await fs.promises.readFile(this.path, "utf-8");
        return JSON.parse(carts);
      } else return [];
    } catch (error) {
      return { status: "Error", msg: error };
    }
  }

  async getCartById(cid) {
    try {
      const carts = await this.getCarts();
      const cartExist = carts.find((ca) => ca.id === cid);
      if (!cartExist) return null;
      return cartExist;
    } catch (error) {
      return { status: "Error", msg: error };
    }
  }

  async createCart(obj) {
    try {
      const cart = { id: uuidv4(), products: [] };
      const carts = await this.getCarts();
      carts.push(cart);
      await fs.promises.writeFile(this.path, JSON.stringify(carts));
      return {status: 'Cart created', cart};
    } catch (error) {
      return { status: "Error", msg: error };
    }
  }

  async addToCart(obj) {
    try {
        const { cid,pid } = obj;
        const cart = await this.getCartById(cid);
        if(!cart) return null;
        const existProductIndex = cart.products.findIndex(prod => prod.product === pid);
        if(existProductIndex !== -1) {
            cart.products[existProductIndex].quantity++;
        } else {
            cart.products.push({
                product: pid,
                quantity:1
            })
        }
                       
        const carts = await this.getCarts();
        const newCarts = carts.filter((ca) => ca.id !== cid);
        newCarts.push(cart);
        await fs.promises.writeFile(this.path,JSON.stringify(newCarts));
        return {status: 'Product added to cart', cart};
      } catch (error) {
        return { status: "Error", msg: error };
      }
  }
}
