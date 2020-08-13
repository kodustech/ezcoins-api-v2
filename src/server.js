import app from './app';
import 'dotenv/config';
import CreditEZCToOffer from './app/crons/CreditEZCToOffer';

CreditEZCToOffer.start();

app.listen(process.env.PORT, () => {
  console.log(`Running on port: ${process.env.PORT}`);
});
