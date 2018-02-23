/**
 * Copyright (c) 2018 Robin Malburn
 *
 * Released under the MIT license.
 * See the file LICENSE for copying permission.
 */

const driverMap = new WeakMap();
const runtimeMap = new WeakMap();

export default class ChromeStorage {
  /**
   * Construct a new class instance.
   *
   * @param {chrome.StorageArea} driver - Chrome Storage Area driver.
   * @param {chrome.runtime} runtime - Chrome runtime.
   *
   * @return void
   */
  constructor(driver, runtime) {
    driverMap.set(this, driver);
    runtimeMap.set(this, runtime);
  }

  /**
   * Return the storage driver.
   *
   * @return {chrome.StorageArea}
   */
  getDriver() {
    return driverMap.get(this);
  }

  /**
   * Determine whether the runtime has an error.
   *
   * @return {boolean}
   */
  hasError() {
    return this.getError() !== undefined;
  }

  /**
   * Get the last error message
   *
   * @return {string|undefined}
   */
  getError() {
    return runtimeMap.get(this).lastError;
  }

  /**
   * Set an item in storage.
   *
   * @param {string} key
   * @param {mixed} item
   *
   * @return {Promise}
   */
  setItem(key, item) {
    return new Promise((resolve, reject) => {
      this.getDriver().set(
        { [key]: item },
        () => {
          if (this.hasError()) {
            return reject(this.getError());
          }
          return resolve();
        },
      );
    });
  }

  /**
   * Get an item from storage.
   *
   * @param {string} key
   *
   * @return {Promise}
   */
  getItem(key) {
    return new Promise((resolve, reject) => {
      this.getDriver().get(key, (response) => {
        if (this.hasError()) {
          return reject(this.getError());
        }
        return resolve(response[key]);
      });
    });
  }

  /**
   * Remove an item from storage.
   *
   * @param {string} key
   *
   * @return {Promise}
   */
  removeItem(key) {
    return new Promise((resolve, reject) => {
      this.getDriver().remove(key, () => {
        if (this.hasError()) {
          return reject(this.getError());
        }
        return resolve();
      });
    });
  }
}
