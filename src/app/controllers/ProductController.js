import ListProductsService from '../services/ListProductsService';

class ProductsController {
  async index(req, res) {
    try {
      const products = await ListProductsService.run({});

      return res.json(products);
    } catch (err) {
      return res.json({ error: err });
    }
  }
}

export default new ProductsController();
