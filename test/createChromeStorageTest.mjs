/**
 * Copyright (c) 2018 - 2025 Robin Malburn
 *
 * Released under the MIT license.
 * See the file LICENSE for copying permission.
 */

import * as chai from "chai";
import chrome from "sinon-chrome/extensions/index.js";
import createChromeStorage from "../src/index.mjs";

describe("createChromeStorage", function () {
  beforeEach(function () {
    chrome.runtime.lastError = undefined;
  });

  it("should be able to create a sync storage instance.", function () {
    const storage = createChromeStorage(chrome, "sync");

    chai.assert.deepEqual(storage.getDriver(), chrome.storage.sync);
  });

  it("should be able to create a local storage instance.", function () {
    const storage = createChromeStorage(chrome, "local");

    chai.assert.deepEqual(storage.getDriver(), chrome.storage.local);
  });

  it("should be able to create a local storage instance.", function () {
    const storage = createChromeStorage(chrome, "managed");

    chai.assert.deepEqual(storage.getDriver(), chrome.storage.managed);
  });

  afterEach(function () {
    chrome.reset();
    chrome.runtime.lastError = undefined;
  });
});
