import * as Yup from 'yup';

const DonateSchema = Yup.object().shape({
  quantity: Yup.number().required(),
  sender_user_id: Yup.number().required(),
  receiver_user_id: Yup.number().required(),
});

export default DonateSchema;
