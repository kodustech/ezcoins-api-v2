import Products from '../models/Products';
import FindProductService from './FindProductService';

class DeleteProductService {
  async run({ id: pId, transaction = null }) {
    let options = {};
    if (transaction) options = { transaction };

    const product = await FindProductService.run({
      id: pId,
      transaction,
    });

    await Products.destroy({
      ...options,
      where: {
        id: pId,
      },
    });

    return product;
  }
}

export default new DeleteProductService();
