/**
 * utils.js
 * 統一通用輔助函數
 */
(function(window) {
  'use strict';

  const Utils = {
    /**
     * 複製文字到剪貼簿
     * @param {string} text
     * @returns {Promise<boolean>}
     */
    copyToClipboard: async function(text) {
      try {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(text);
          return true;
        } else {
          const textArea = document.createElement('textarea');
          textArea.value = text;
          textArea.style.position = 'fixed';
          textArea.style.left = '-999999px';
          textArea.style.top = '-999999px';
          document.body.appendChild(textArea);
          textArea.focus();
          textArea.select();
          const successful = document.execCommand('copy');
          document.body.removeChild(textArea);
          return successful;
        }
      } catch (err) {
        console.error('Clipboard copy failed:', err);
        return false;
      }
    },

    /**
     * 防抖 (Debounce)
     */
    debounce: function(func, wait = 250) {
      let timeout;
      return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
      };
    },

    /**
     * 密碼學安全隨機整數 [min, max]
     */
    getRandomInt: function(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      if (window.crypto && window.crypto.getRandomValues) {
        const range = max - min + 1;
        const maxUint32 = 4294967295;
        const maxLimit = maxUint32 - (maxUint32 % range);
        const array = new Uint32Array(1);
        let randomVal;
        do {
          window.crypto.getRandomValues(array);
          randomVal = array[0];
        } while (randomVal >= maxLimit);
        return min + (randomVal % range);
      }
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    /**
     * 陣列 Fisher-Yates 隨機洗牌
     */
    shuffleArray: function(array) {
      const arr = [...array];
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Utils.getRandomInt(0, i);
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
      return arr;
    },

    /**
     * 數字補零 (e.g. 5 -> "05")
     */
    padZero: function(num, length = 2) {
      return String(num).padStart(length, '0');
    },

    /**
     * 時間格式化 (毫秒 -> HH:MM:SS.mmm)
     */
    formatTimeMs: function(ms) {
      const milliseconds = ms % 1000;
      const totalSeconds = Math.floor(ms / 1000);
      const seconds = totalSeconds % 60;
      const totalMinutes = Math.floor(totalSeconds / 60);
      const minutes = totalMinutes % 60;
      const hours = Math.floor(totalMinutes / 60);

      const msStr = String(Math.floor(milliseconds / 10)).padStart(2, '0');
      if (hours > 0) {
        return `${Utils.padZero(hours)}:${Utils.padZero(minutes)}:${Utils.padZero(seconds)}.${msStr}`;
      }
      return `${Utils.padZero(minutes)}:${Utils.padZero(seconds)}.${msStr}`;
    },

    /**
     * HTML 特殊字元轉義 (防止 XSS)
     */
    escapeHtml: function(str) {
      if (!str) return '';
      const div = document.createElement('div');
      div.textContent = str;
      return div.innerHTML;
    }
  };

  window.AppUtils = Utils;
})(typeof window !== 'undefined' ? window : this);
