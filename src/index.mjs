/**
 * Copyright (c) 2018 - 2021 Robin Malburn
 *
 * Released under the MIT license.
 * See the file LICENSE for copying permission.
 */

import ChromeStorage from "./storage/ChromeStorage.mjs";

/**
 * Create a ChromeStorage instance from the given chrome instance
 * and requested driver.
 *
 * @param {chrome} chrome
 * @param {string} driver
 */
export default function createChromeStorage(chrome, driver) {
  return new ChromeStorage(chrome.storage[driver], chrome.runtime);
}
