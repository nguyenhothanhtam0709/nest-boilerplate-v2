import Joi from 'joi';
import { DEFAULT_API_PORT, DEFAULT_THREADPOOL_SIZE } from '@constants/env';
import { EnvKeyName } from '@enums/env';
import { ConfigModule } from '@nestjs/config';

const validationSchema = Joi.object({
  // system
  [EnvKeyName.NODE_ENV]: Joi.string(),
  [EnvKeyName.UV_THREADPOOL_SIZE]: Joi.number().default(
    DEFAULT_THREADPOOL_SIZE,
  ),

  // app
  [EnvKeyName.API_PORT]: Joi.number().default(DEFAULT_API_PORT),

  // database

  // sentry
  [EnvKeyName.SENTRY_DSN]: Joi.string(),
});

export const SetupConfigModule = () =>
  ConfigModule.forRoot({
    isGlobal: true,
    validationSchema,
    cache: true,
  });
