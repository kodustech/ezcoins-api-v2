import database from '../../database';
import CreateProductService from '../services/CreateProductService';
import DeleteProductService from '../services/DeleteProductService';
import FindProductService from '../services/FindProductService';
import ListProductsService from '../services/ListProductsService';
import UpdateProductService from '../services/UpdateProductService';
import UserIsNotAdminExceptions from '../validations/UserIsNotAdminExceptions';

class ProductsController {
  async index(req, res) {
    try {
      const products = await ListProductsService.run({});

      return res.json(products);
    } catch (err) {
      return res.json({ error: err });
    }
  }
  async store(req, res) {
    const transaction = await database.connection.transaction();
    try {
      if (!req.session.isAdmin) {
        throw new UserIsNotAdminExceptions();
      }
      const product = await CreateProductService.run({
        transaction,
        product: {
          name: req.body.name,
          price: req.body.price,
          image: req.body.image,
          url: req.body.url,
          status: 1,
        },
      });

      await transaction.commit();

      return res.json(product);
    } catch (err) {
      if (transaction) await transaction.rollback();
      return res.json({
        error: err,
      });
    }
  }
  async findById(req, res) {
    try {
      const product = await FindProductService.run({
        id: req.params.id,
      });
      return res.json(product);
    } catch (error) {
      return res.json(error);
    }
  }
  async update(req, res) {
    const transaction = await database.connection.transaction();
    try {
      if (!req.session.isAdmin) {
        throw new UserIsNotAdminExceptions();
      }
      const product = await UpdateProductService.run({
        transaction,
        id: req.params.id,
        product: {
          name: req.body.name,
          price: req.body.price,
          image: req.body.image,
          url: req.body.url,
          status: 1,
        },
      });
      await transaction.commit();

      return res.json(product);
    } catch (error) {
      if (transaction) await transaction.rollback();
      return res.json(error);
    }
  }
  async delete(req, res) {
    const transaction = await database.connection.transaction();
    try {
      if (!req.session.isAdmin) {
        throw new UserIsNotAdminExceptions();
      }
      const product = await DeleteProductService.run({
        transaction,
        id: req.params.id,
      });
      await transaction.commit();

      return res.json(product);
    } catch (error) {
      if (transaction) await transaction.rollback();
      return res.json(error);
    }
  }
}

export default new ProductsController();
