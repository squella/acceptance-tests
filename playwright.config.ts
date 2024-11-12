import { defineConfig } from '@playwright/test';

import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, 'config/.pre.env') });

export default defineConfig({
  testDir: './tests',                   
  fullyParallel: true,                   
  forbidOnly: !!process.env.CI,          
  retries: process.env.CI ? 2 : 0,       
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',

});
