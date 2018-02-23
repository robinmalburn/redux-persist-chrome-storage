/**
 * Copyright (c) 2018 Robin Malburn
 *
 * Released under the MIT license.
 * See the file LICENSE for copying permission.
 */

/* global describe, beforeEach, afterEach, it */
/* global describe, beforeEach, afterEach, it */
/* eslint func-names: "off" */
/* eslint prefer-arrow-callback: "off" */

import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import chrome from 'sinon-chrome/extensions';
import ChromeStorage from '../src/storage/ChromeStorage';

chai.use(chaiAsPromised);

describe('ChromeStorage', function () {
  ['sync', 'local', 'managed'].forEach(function (driver) {
    let storage;

    beforeEach(function () {
      storage = new ChromeStorage(chrome.storage[driver], chrome.runtime);
      chrome.runtime.lastError = undefined;
    });

    it(`should have the ${driver} storage driver.`, function () {
      chai.assert.deepEqual(storage.getDriver(), chrome.storage[driver]);
    });

    it(`should set an item in the ${driver} storage instance.`, function () {
      chrome.storage[driver].set.yields(undefined);

      const stored = storage.setItem('foo', 'bar');

      chai.assert.ok(
        chrome.storage[driver].set.withArgs({ foo: 'bar' }).calledOnce,
        `Assert that chrome.storage.${driver}.set should be called once with the key and payload.`,
      );

      chai.expect(stored).to.be.a('promise');

      return chai.expect(stored).to.eventually.be.undefined;
    });

    it(`should handle failing to set an item in the ${driver} storage instance.`, function () {
      chrome.runtime.lastError = 'Failed';
      chrome.storage[driver].set.yields(undefined);

      const stored = storage.setItem('foo', 'bar');

      chai.assert.ok(
        chrome.storage[driver].set.withArgs({ foo: 'bar' }).calledOnce,
        `Assert that chrome.storage.${driver}.set should be called once with the key and payload.`,
      );

      chai.expect(stored).to.be.a('promise');

      return chai.expect(stored).to.eventually.be.rejectedWith('Failed');
    });

    it(`should get an item from the ${driver} storage instance.`, function () {
      chrome.storage[driver].get.yields({ foo: 'bar' });

      const retrieved = storage.getItem('foo');

      chai.assert.ok(
        chrome.storage[driver].get.withArgs('foo').calledOnce,
        `Assert that chrome.storage.${driver}.get should be called once with the key.`,
      );

      chai.expect(retrieved).to.be.a('promise');

      return chai.expect(retrieved).to.eventually.be.equal('bar');
    });

    it(`should handle failing to get an item from the ${driver} storage instance.`, function () {
      chrome.runtime.lastError = 'Failed';
      chrome.storage[driver].get.yields(undefined);

      const retrieved = storage.getItem('foo');

      chai.assert.ok(
        chrome.storage[driver].get.withArgs('foo').calledOnce,
        `Assert that chrome.storage.${driver}.get should be called once with the key.`,
      );

      chai.expect(retrieved).to.be.a('promise');

      return chai.expect(retrieved).to.eventually.be.rejectedWith('Failed');
    });

    it(`should remove an item from the ${driver} storage instance.`, function () {
      chrome.storage[driver].remove.yields(undefined);

      const cleared = storage.removeItem('foo');

      chai.assert.ok(
        chrome.storage[driver].remove.withArgs('foo'),
        `Assert that chrome.storage.${driver}.remove should be called once with the key.`,
      );

      chai.expect(cleared).to.be.a('promise');

      return chai.expect(cleared).to.eventually.be.undefined;
    });

    it(`should handle failing to remove an item from the ${driver} storage instance.`, function () {
      chrome.runtime.lastError = 'Failed';
      chrome.storage[driver].remove.yields(undefined);

      const cleared = storage.removeItem('foo');

      chai.assert.ok(
        chrome.storage[driver].remove.withArgs('foo'),
        `Assert that chrome.storage.${driver}.remove should be called once with the key.`,
      );

      chai.expect(cleared).to.be.a('promise');

      return chai.expect(cleared).to.eventually.be.rejectedWith('Failed');
    });

    afterEach(function () {
      chrome.reset();
      chrome.runtime.lastError = undefined;
    });
  });
});
