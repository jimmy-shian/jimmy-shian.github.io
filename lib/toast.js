/**
 * toast.js
 * 統一 Toast 訊息彈窗管理器
 */
(function(window) {
  'use strict';

  function getToastContainer() {
    let container = document.getElementById('toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-container';
      document.body.appendChild(container);
    }
    return container;
  }

  const Toast = {
    show: function(message, type = 'info', duration = 3000) {
      const container = getToastContainer();
      const toast = document.createElement('div');
      toast.className = `toast toast-${type}`;

      const icons = {
        success: '✅',
        error: '❌',
        warning: '⚠️',
        info: 'ℹ️'
      };

      const iconSpan = document.createElement('span');
      iconSpan.className = 'toast-icon';
      iconSpan.textContent = icons[type] || icons.info;

      const textSpan = document.createElement('span');
      textSpan.className = 'toast-text';
      textSpan.textContent = message;

      toast.appendChild(iconSpan);
      toast.appendChild(textSpan);
      container.appendChild(toast);

      // 動畫淡入
      requestAnimationFrame(() => {
        toast.classList.add('show');
      });

      // 自動淡出銷毀
      setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
          if (toast.parentNode) {
            toast.parentNode.removeChild(toast);
          }
        }, 300);
      }, duration);
    },

    success: function(msg, dur) { this.show(msg, 'success', dur); },
    error: function(msg, dur) { this.show(msg, 'error', dur); },
    warning: function(msg, dur) { this.show(msg, 'warning', dur); },
    info: function(msg, dur) { this.show(msg, 'info', dur); }
  };

  window.AppToast = Toast;
})(typeof window !== 'undefined' ? window : this);
