import * as Yup from 'yup';

const ExchangeSchema = Yup.object().shape({
  cost: Yup.number().required(),
  user_id: Yup.number().required(),
  product_id: Yup.number().required(),
});

export default ExchangeSchema;
