/*
 * Copyright 2021 The Backstage Authors
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

import { useEffect, useState } from 'react';
import { useApi } from '@backstage/core-plugin-api';
import { catalogApiRef } from '../api';

export function useEntityKinds() {
  const [kinds, setKinds] = useState(['component']);
  const catalogApi = useApi(catalogApiRef);

  useEffect(() => {
    async function loadKinds() {
      const entities = await catalogApi
        .getEntities({ fields: ['kind'] })
        .then(response => response.items);
      setKinds([...new Set(entities.map(e => e.kind))].sort());
    }
    loadKinds();
  }, [catalogApi]);

  return kinds;
}
