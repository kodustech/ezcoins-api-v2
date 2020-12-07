import app from './app';
import 'dotenv/config';
import CronManager from './cron';
import * as Sentry from '@sentry/node';
import * as Tracing from '@sentry/tracing';

Sentry.init({
  dsn: 'https://4062587ceb5b405bab65e51978b30c0e@o467498.ingest.sentry.io/5547585',

  // We recommend adjusting this value in production, or using tracesSampler
  // for finer control
  tracesSampleRate: 1.0,
});

app.listen(process.env.PORT, () => {
  console.log(`Running on port: ${process.env.PORT}`);
  CronManager.run();
});
