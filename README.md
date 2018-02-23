# Redux Persist Chrome Storage

Storage adaptor for using [Google Chrome's Storage API](https://developer.chrome.com/apps/storage) with [redux-persist](https://github.com/rt2zz/redux-persist).

The main use case for this adaptor is when writing Chrome extensions and making use of either the Sync, Local or Managed StorageArea drivers to persist your redux state.

# Installation

`npm install redux-persist-chrome-storage`

# Usage

## createChromeStorage Helper (Recommended)

```javascript

import { createStore } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import createChromeStorage from 'redux-persist-chrome-storage'
import reducer from './reducers'

// Create a ChromeStorage instance using the chrome runtime and the Sync StorageArea.
const storage = createChromeStorage(window.chrome, 'sync');

const config = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(config, reducer);

export default () => {
  let store = createStore(persistedReducer)
  let persistor = persistStore(store)
  return { store, persistor };
}

```

## Direct Instantiation

```javascript
import { createStore } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import ChromeStorage from 'redux-persist-chrome-storage/storage/ChromeStorage'
import reducer from './reducers'

// Create a ChromeStorage instance using the chrome runtime and the Sync StorageArea.
const storage = new ChromeStorage(window.chrome.storage.sync, window.chrome.runtime);

const config = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(config, reducer);

export default () => {
  let store = createStore(persistedReducer)
  let persistor = persistStore(store)
  return { store, persistor };
}
```