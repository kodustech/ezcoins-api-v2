import Exchanges from '../models/Exchanges';
import Products from '../models/Products';
import Users from '../models/Users';

class FindExchangeByUserIdService {
  async run({ userId: pUserId, page, paginate, transaction = null }) {
    let options = {};
    if (transaction) options = { transaction };

    if (page || paginate) {
      page = page || 1;
      paginate = paginate || 5;

      return Exchanges.paginate({
        page: +page,
        paginate: +paginate,
        where: {
          user_id: pUserId,
        },
        raw: true,
        attributes: ['id', 'cost', 'delivered', 'user_id', 'product_id', 'created_at'],
        include: [
          {
            model: Products,
            as: 'product',
            attributes: ['id', 'name', 'price'],
          },
        ],
        ...options,
      });
    }
    return Exchanges.findAll({
      attributes: ['id', 'cost', 'delivered', 'user_id', 'product_id', 'created_at'],
      include: [
        {
          model: Products,
          as: 'product',
          attributes: ['id', 'name', 'price'],
        },
      ],
      where: {
        user_id: pUserId,
      },
      raw: true,
      ...options,
    });
  }
}

export default new FindExchangeByUserIdService();
