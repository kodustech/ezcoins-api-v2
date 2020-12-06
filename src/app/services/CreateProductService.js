import Products from '../models/Products';
import ProductSchema from '../validations/schemas/ProductSchema';

class CreateProductService {
  async run({ transaction = null, product: pProduct }) {
    let options = {};
    if (transaction) options = { transaction };

    await ProductSchema.validate(pProduct, {
      abortEarly: false,
    });

    const product = await Products.create(pProduct, options);
    return product;
  }
}

export default new CreateProductService();
