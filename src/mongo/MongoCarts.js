import { cartModelName, cartSchema } from "../models/cartSchema.js";
import MongoContainer from "./MongoContainer.js";

class MongoCarts extends MongoContainer {
  constructor() {
    super(cartModelName, cartSchema);
  }

  async saveCart(cart) {
    let response = await this.collection.create(cart);
    return response;
  }
  async updateCart(cart) {
    let response = await this.collection.updateOne(
      { _id: cart.id },
      { cart: cart }
    );
    return response;
  }
  async addtoCart(cartId, product) {
    let cart = await this.collection.find({ _id: cartId });
    let response = await this.collection.find(
      { _id: cartId },
      { cart: cart.products.push(product) }
    );
    return response;
  }
  async deleteCartProduct(cart, product) {
    let index = cart.products.map((e) => e.id).indexOf(product.id);
    cart.products.splice(index, 1);
    let response = await this.updateCart(cart);
    return response;
  }
}

export default MongoCarts;
