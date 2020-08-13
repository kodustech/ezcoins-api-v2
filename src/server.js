import app from './app';
import 'dotenv/config';

app.listen(process.env.PORT, () => {
  console.log(`Running on port: ${process.env.PORT}`);
});
