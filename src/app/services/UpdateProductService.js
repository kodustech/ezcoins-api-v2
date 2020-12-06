import FindProductService from './FindProductService';

class UpdateProductService {
  async run({ transaction = null, id: pId, product: pProduct }) {
    let options = {};
    if (transaction) options = { transaction };

    const product = await FindProductService.run({
      transaction,
      id: pId,
    });

    await product.update(pProduct, options);
    return product;
  }
}

export default new UpdateProductService();
