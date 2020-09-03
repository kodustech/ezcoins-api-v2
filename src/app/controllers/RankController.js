import { Sequelize } from 'sequelize';
import database from '../../database';

class RankController {
  async index(req, res) {
    try {
      const rank = await database.connection.query(
        `
        SELECT DISTINCT
          u.name,
          w.received + w.extras as coins,
          w.received,
          w.extras
        FROM Wallets w
        INNER JOIN Users u ON u.id = w.owner_user_id
        WHERE u.is_admin = 'N'
        AND u.status = 0
        ORDER BY coins DESC
        LIMIT 15
      `,
        {
          type: Sequelize.QueryTypes.SELECT,
        }
      );
      return res.json(rank);
    } catch (err) {
      return res.json({ error: err });
    }
  }
}

export default new RankController();
