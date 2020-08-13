import * as Yup from 'yup';

const UserSchema = Yup.object().shape({
  name: Yup.string().required(),
  email: Yup.string().required(),
  discord_id: Yup.string().required(),
});

export default UserSchema;
