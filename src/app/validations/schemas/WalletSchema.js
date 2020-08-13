import * as Yup from 'yup';

const WalletSchema = Yup.object().shape({
  owner_user_id: Yup.number().required(),
});

export default WalletSchema;
