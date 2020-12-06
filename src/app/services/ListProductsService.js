import Products from '../models/Products';

class ListProductsService {
  async run({ page, paginate, transaction = null }) {
    let options = {
      attributes: ['id', 'name', 'price', 'image', 'url', 'status'],
      where: {
        status: 0,
      },
    };
    if (transaction) options = { transaction };

    if (page || paginate) {
      page = page || 1;
      paginate = paginate || 5;

      return Products.paginate({
        page: +page,
        paginate: +paginate,
        ...options,
      });
    }

    return Products.findAll(options);
  }
}

export default new ListProductsService();
