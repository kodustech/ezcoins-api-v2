import Configurations from '../models/Configurations';
import Users from '../models/Users';

class GetConfigurationsService {
  async run({ transaction = null }) {
    let options = {};
    if (transaction) options = { transaction };

    return Configurations.findAll({
      attributes: ['name', 'value'],
      ...options,
    });
  }
}

export default new GetConfigurationsService();
