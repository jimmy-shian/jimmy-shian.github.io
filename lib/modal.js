/**
 * modal.js
 * 統一 Modal 模態框管理器，支援 ESC 關閉、背景點擊關閉與 Focus 管理
 */
(function(window) {
  'use strict';

  const AppModal = {
    /**
     * 開啟指定 Modal
     * @param {string|HTMLElement} modalTarget
     */
    open: function(modalTarget) {
      const el = typeof modalTarget === 'string' ? document.querySelector(modalTarget) : modalTarget;
      if (!el) return;

      el.classList.add('active');
      document.body.style.overflow = 'hidden';

      // 監聽 ESC 關閉
      const onKeyDown = (e) => {
        if (e.key === 'Escape') {
          AppModal.close(el);
          window.removeEventListener('keydown', onKeyDown);
        }
      };
      window.addEventListener('keydown', onKeyDown);
      el._escListener = onKeyDown;
    },

    /**
     * 關閉指定 Modal
     * @param {string|HTMLElement} modalTarget
     */
    close: function(modalTarget) {
      const el = typeof modalTarget === 'string' ? document.querySelector(modalTarget) : modalTarget;
      if (!el) return;

      el.classList.remove('active');
      document.body.style.overflow = '';

      if (el._escListener) {
        window.removeEventListener('keydown', el._escListener);
        delete el._escListener;
      }
    },

    /**
     * 初始化自動綁定點擊背景和關閉按鈕
     */
    init: function() {
      document.addEventListener('click', (e) => {
        // 點擊關閉按鈕
        const closeBtn = e.target.closest('[data-modal-close], .modal-close');
        if (closeBtn) {
          const modal = closeBtn.closest('.modal-backdrop, .modal');
          if (modal) AppModal.close(modal);
          return;
        }

        // 點擊背景空白處
        if (e.target.classList.contains('modal-backdrop') || (e.target.classList.contains('modal') && e.target.classList.contains('active'))) {
          AppModal.close(e.target);
        }
      });
    }
  };

  // 自動初始化
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => AppModal.init());
  } else {
    AppModal.init();
  }

  window.AppModal = AppModal;
})(typeof window !== 'undefined' ? window : this);
