import mongoose from 'mongoose';
import app from './app';
import config from './app/config';
import { Server } from 'http';

let server: Server;

async function main() {
  try {
    await mongoose.connect(`${config.database_url}`);

    server = app.listen(config.port, () => {
      console.log(`app is listening on port ${config.port}`);
    });
  } catch (err) {
    console.log(err);
  }
}

main();

// Catching unhandledRejection error
process.on('unhandledRejection', () => {
  console.log('unhandledRejection rejection is detected');

  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

// Catching uncaughtException error
process.on('uncaughtException', () => {
  console.log('uncaughtException rejection is detected');
  process.exit(1);
});
