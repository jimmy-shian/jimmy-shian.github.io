/**
 * validation.js
 * 統一資料與輸入驗證器
 */
(function(window) {
  'use strict';

  const Validation = {
    isNumber: function(val) {
      return typeof val === 'number' && !isNaN(val) && isFinite(val);
    },

    clamp: function(val, min, max) {
      const n = Number(val);
      if (isNaN(n)) return min;
      return Math.max(min, Math.min(max, n));
    },

    isValidTime: function(hours, minutes, seconds) {
      const h = Number(hours);
      const m = Number(minutes);
      const s = Number(seconds);
      return h >= 0 && h <= 23 && m >= 0 && m <= 59 && s >= 0 && s <= 59;
    }
  };

  window.AppValidation = Validation;
})(typeof window !== 'undefined' ? window : this);
