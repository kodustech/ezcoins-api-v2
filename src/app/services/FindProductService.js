import Products from '../models/Products';

class FindProductService {
  async run({ id: pId, transaction = null }) {
    let options = {};
    if (transaction) options = { transaction };

    return Products.findByPk(pId, {
      attributes: ['id', 'name', 'price', 'image', 'url'],
      ...options,
    });
  }
}

export default new FindProductService();
