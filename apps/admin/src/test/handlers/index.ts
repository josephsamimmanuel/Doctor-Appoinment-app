import { adminHandlers } from './admin.handlers.js';
import { authHandlers } from './auth.handlers.js';

export const handlers = [...authHandlers, ...adminHandlers];
