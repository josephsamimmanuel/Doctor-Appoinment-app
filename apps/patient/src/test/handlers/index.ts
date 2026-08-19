import { authHandlers } from './auth.handlers.js';
import { doctorHandlers } from './doctor.handlers.js';

export const handlers = [...authHandlers, ...doctorHandlers];
