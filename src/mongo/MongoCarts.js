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
  async updateCart(id, product_list) {
    console.log(id);
    console.log(product_list);
    let response = await this.collection.updateOne(
      { _id: id },
      { products: product_list }
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
    cart.products = cart.products.filter(
      (e) => e._id.toString() !== product._id.toString()
    );
    let response = await this.updateCart(cart._id, cart.products);
    return response;
  }
}

export default MongoCarts;
