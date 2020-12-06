import * as Yup from 'yup';

const EventSchema = Yup.object().shape({
  name: Yup.string().required(),
  participants: Yup.array().min(1),
});

export default EventSchema;
