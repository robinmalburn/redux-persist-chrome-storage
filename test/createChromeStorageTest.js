/**
 * Copyright (c) 2018 - 2021 Robin Malburn
 *
 * Released under the MIT license.
 * See the file LICENSE for copying permission.
 */

/* global describe, beforeEach, afterEach, it */
/* eslint func-names: "off" */
/* eslint prefer-arrow-callback: "off" */

import chai from 'chai';
import chrome from 'sinon-chrome/extensions';
import createChromeStorage from '../src';

describe('createChromeStorage', function () {
  beforeEach(function () {
    chrome.runtime.lastError = undefined;
  });

  it('should be able to create a sync storage instance.', function () {
    const storage = createChromeStorage(chrome, 'sync');

    chai.assert.deepEqual(storage.getDriver(), chrome.storage.sync);
  });

  it('should be able to create a local storage instance.', function () {
    const storage = createChromeStorage(chrome, 'local');

    chai.assert.deepEqual(storage.getDriver(), chrome.storage.local);
  });

  it('should be able to create a local storage instance.', function () {
    const storage = createChromeStorage(chrome, 'managed');

    chai.assert.deepEqual(storage.getDriver(), chrome.storage.managed);
  });

  afterEach(function () {
    chrome.reset();
    chrome.runtime.lastError = undefined;
  });
});
