import * as Yup from 'yup';

const ProductSchema = Yup.object().shape({
  name: Yup.string().required(),
  price: Yup.number().required(),
  image: Yup.string(),
  url: Yup.string(),
  status: Yup.number().required(),
});

export default ProductSchema;
