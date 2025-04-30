const dbName = 'suspra';
const dbVersion = 2;
const stores = {
  assessment: { name: 'assessment', key: 'key' },
  indicators: { name: 'indicators', key: 'indicators' },
};

type IndicatorsField = 'community' | 'food' | 'water' | 'movement';

function readIndicatorsStore(resolve: (value: unknown) => void, ostore: IDBObjectStore) {
  const community = useCommunityIndicators();
  const food = useFoodIndicators();
  const water = useWaterIndicators();
  const movement = useMovementIndicators();

  ostore.openCursor().onsuccess = (event) => {
    const cursor = (event.target as IDBRequest).result;
    if (!cursor) {
      resolve({ success: true });
      return;
    }

    const v = cursor.value;
    switch (v.indicators) {
      case 'community':
        community.value = v;
        break;
      case 'food':
        food.value = v;
        break;
      case 'water':
        water.value = v;
        break;
      case 'movement':
        movement.value = v;
        break;
    }

    cursor.continue();
  }
}

function readAssessmentStore(resolve: (value: unknown) => void, ostore: IDBObjectStore) {
  const assessment = useAssessment();

  ostore.openCursor().onsuccess = (event) => {
    const cursor = (event.target as IDBRequest).result;
    if (!cursor) {
      resolve({ success: true });
      return;
    }

    if (!assessment.value) {
      assessment.value = cursor.value;
    }

    cursor.continue();
  }
}

function upgradeDatabase(event: Event) {
  const db = (event.target as IDBRequest).result;
  for (const sn of Object.getOwnPropertyNames(stores)) {
    const ss = stores as { [index: string]: { name: string; key: string } };
    const store = ss[sn];
    if (!db.objectStoreNames.contains(store.name)) {
      db.createObjectStore(store.name, { keyPath: store.key });
    }
  }
}

export function loadAssessment(resolve: (value: unknown) => void, reject: (reason?: any) => void) {
  const request = window.indexedDB.open(dbName, dbVersion);

  request.onerror = (_event: unknown) => {
    console.error(`Error opening database: ${dbName}.${dbVersion}`);
    reject(`${dbName}.${dbVersion}: cannot open`);
  };

  request.onupgradeneeded = upgradeDatabase;

  request.onsuccess = (event) => {
    const db = (event.target as IDBRequest).result;
    const txn = db.transaction(stores.assessment.name);

    txn.onerror = (_e: unknown) => {
      console.error(`Error loading assessment from database: ${dbName}.${dbVersion}`);
      reject(`${dbName}.${dbVersion}: cannot load assessment`);
    };

    const ostore = txn.objectStore(stores.assessment.name);
    readAssessmentStore(resolve, ostore);
  }
}

export function loadIndicators(resolve: (value: unknown) => void, reject: (reason?: any) => void) {
  const request = window.indexedDB.open(dbName, dbVersion);

  request.onerror = (_event: unknown) => {
    console.error(`Error opening database: ${dbName}.${dbVersion}`);
    reject(`${dbName}.${dbVersion}: cannot open`);
  };

  request.onupgradeneeded = upgradeDatabase;

  request.onsuccess = (event) => {
    const db = (event.target as IDBRequest).result;
    const txn = db.transaction(stores.indicators.name);

    txn.onerror = (_e: unknown) => {
      console.error(`Error loading indicators from database: ${dbName}.${dbVersion}`);
      reject(`${dbName}.${dbVersion}: cannot load indicators`);
    };

    const ostore = txn.objectStore(stores.indicators.name);
    readIndicatorsStore(resolve, ostore);
  }
}

export function saveAssessment(assessment: MaybeRef<Assessment>) {
  generateAssessmentKey((assessment as Ref<Assessment>).value);

  while (isRef(assessment)) {
    assessment = toRaw(assessment.value) as MaybeRef<Assessment>;
  }

  const request = window.indexedDB.open(dbName, dbVersion);

  request.onerror = (_event: unknown) => {
    console.error(`Error opening database for saving assessment: ${dbName}.${dbVersion}`);
  };

  request.onupgradeneeded = (_event: unknown) => {
    console.error(`Database should have been been initialized before saving assessment: ${dbName}.${dbVersion}`);
  }

  request.onsuccess = (event) => {
    const db = (event.target as IDBRequest).result;
    const txn = db.transaction(stores.assessment.name, 'readwrite');

    txn.onerror = (_e: unknown) => {
      console.error(`Error saving assessment to database: ${dbName}.${dbVersion}`);
    }

    const ostore = txn.objectStore(stores.assessment.name);
    ostore.put(assessment);
  }
}

export function saveIndicators<T extends { indicators: IndicatorsField }>(indicators: T) {
  while (isRef(indicators)) {
    indicators = toRaw(indicators.value) as T;
  }

  const request = window.indexedDB.open(dbName, dbVersion);

  request.onerror = (_event: unknown) => {
    console.error(`Error opening database for saving ${indicators.indicators} indicators: ${dbName}.${dbVersion}`);
  };

  request.onupgradeneeded = (_event: unknown) => {
    console.error(`Database should have been been initialized before saving indicators: ${dbName}.${dbVersion}`);
  }

  request.onsuccess = (event) => {
    const db = (event.target as IDBRequest).result;
    const txn = db.transaction(stores.indicators.name, 'readwrite');

    txn.onerror = (_e: unknown) => {
      console.error(`Error saving ${indicators.indicators} indicators to database: ${dbName}.${dbVersion}`);
    }

    const ostore = txn.objectStore(stores.indicators.name);
    ostore.put(indicators);
  }
}