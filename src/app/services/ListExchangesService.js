import Exchanges from '../models/Exchanges';
import Products from '../models/Products';
import Users from '../models/Users';

class ListExchangesService {
  async run({ page, paginate, transaction = null }) {
    let options = {
      attributes: ['id', 'cost', 'delivered', 'user_id', 'product_id'],
      raw: true,
      include: [
        {
          model: Users,
          as: 'rescuedBy',
          attributes: ['id', 'name'],
        },
        {
          model: Products,
          as: 'product',
          attributes: ['id', 'name', 'price', 'image', 'url'],
        },
      ],
    };
    if (transaction) options = { transaction };

    if (page || paginate) {
      page = page || 1;
      paginate = paginate || 5;

      return Exchanges.paginate({
        page: +page,
        paginate: +paginate,
        ...options,
      });
    }

    return Exchanges.findAll(options);
  }
}

export default new ListExchangesService();
