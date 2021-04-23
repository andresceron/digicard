export const LOCAL = 'local';

export enum LOG_LEVELS {
  ERROR = 'error',
  WARNING = 'warn',
  INFO = 'info',
  HTTP = 'http',
  VERBOSE = 'verbose',
  DEBUG = 'debug'
}

export enum NODE_ENV {
  DEV = 'dev',
  TEST = 'test',
  PROD = 'production'
}

export const EMAIL_TEMPLATES: {[key:string]: string} = {
  welcome: 'd-d526184c23f84bb3963973d67e62b487',
  reset_password: 'd-330ed712529e48ceb9210ae0c93cf441',
  delete_account: 'd-f4ee4cfe7b1143d0b94bb804630a1dba'
}