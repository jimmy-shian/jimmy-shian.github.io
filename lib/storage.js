/**
 * storage.js
 * 統一 LocalStorage 儲存管理器，支援命名空間、版本控制與安全容錯
 */
(function(window) {
  'use strict';

  const PREFIX = 'toolbox.';
  const VERSION = 1;

  const Storage = {
    /**
     * 儲存資料
     * @param {string} key
     * @param {*} value
     */
    set: function(key, value) {
      try {
        const payload = {
          v: VERSION,
          t: Date.now(),
          data: value
        };
        localStorage.setItem(PREFIX + key, JSON.stringify(payload));
        return true;
      } catch (err) {
        console.warn('[Storage] Failed to save key:', key, err);
        return false;
      }
    },

    /**
     * 讀取資料
     * @param {string} key
     * @param {*} defaultValue
     */
    get: function(key, defaultValue = null) {
      try {
        const item = localStorage.getItem(PREFIX + key);
        if (!item) return defaultValue;
        const payload = JSON.parse(item);
        if (payload && payload.data !== undefined) {
          return payload.data;
        }
        return payload;
      } catch (err) {
        console.warn('[Storage] Failed to get key:', key, err);
        return defaultValue;
      }
    },

    /**
     * 刪除指定鍵
     * @param {string} key
     */
    remove: function(key) {
      try {
        localStorage.removeItem(PREFIX + key);
        return true;
      } catch (err) {
        return false;
      }
    },

    /**
     * 清除指定模組下的所有資料
     * @param {string} moduleKey e.g. 'alarm', 'timer'
     */
    clearModule: function(moduleKey) {
      try {
        const modPrefix = PREFIX + moduleKey + '.';
        const keysToRemove = [];
        for (let i = 0; i < localStorage.length; i++) {
          const k = localStorage.key(i);
          if (k && k.startsWith(modPrefix)) {
            keysToRemove.push(k);
          }
        }
        keysToRemove.forEach(k => localStorage.removeItem(k));
      } catch (err) {
        console.warn('[Storage] clearModule error', err);
      }
    }
  };

  window.AppStorage = Storage;
})(typeof window !== 'undefined' ? window : this);
