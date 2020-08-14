import app from './app';
import 'dotenv/config';
import CronManager from './cron';

app.listen(process.env.PORT, () => {
  console.log(`Running on port: ${process.env.PORT}`);
  CronManager.run();
});
