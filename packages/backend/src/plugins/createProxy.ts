/*
 * Copyright 2020 The Backstage Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { createProxyMiddleware } from 'http-proxy-middleware';
import { Config } from '@backstage/config';
import Router from 'express-promise-router';
import { Logger } from 'winston';
import { PluginEnvironment } from '../types';

export interface NextRouterOptions {
  logger: Logger;
  config: Config;
}
const apiPaths = {
  '/pro': {
    target: 'https://reqres.in/',
    pathRewrite: {
      '^/pro': '/api',
    },
    changeOrigin: true,
  },
};

export async function createProxy({}: PluginEnvironment) {
  return createProxyMiddleware(apiPaths['/pro']);
  // );
}
export default createProxy;
