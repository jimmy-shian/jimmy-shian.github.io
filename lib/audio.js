/**
 * audio.js
 * 統一音效管理器 (基於 Web Audio API，零外部檔案依賴，支援音量控制與靜音)
 */
(function(window) {
  'use strict';

  let audioCtx = null;
  let isMuted = false;
  let masterVolume = 0.8;

  function getAudioContext() {
    if (!audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        audioCtx = new AudioContextClass();
      }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    return audioCtx;
  }

  const AppAudio = {
    setVolume: function(vol) {
      masterVolume = Math.max(0, Math.min(1, vol));
    },

    getVolume: function() {
      return masterVolume;
    },

    setMuted: function(muted) {
      isMuted = !!muted;
    },

    isMuted: function() {
      return isMuted;
    },

    /**
     * 播放滴答/微小點擊聲 (輪盤、按鈕)
     */
    playTick: function() {
      if (isMuted) return;
      const ctx = getAudioContext();
      if (!ctx) return;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.03);

      gain.gain.setValueAtTime(0.15 * masterVolume, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.03);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.035);
    },

    /**
     * 播放翻牌聲 (卡牌翻轉)
     */
    playCardFlip: function() {
      if (isMuted) return;
      const ctx = getAudioContext();
      if (!ctx) return;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(320, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(580, ctx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.12 * masterVolume, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.09);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.09);
    },

    /**
     * 播放倒數結束 / 提示鈴聲
     */
    playChime: function() {
      if (isMuted) return;
      const ctx = getAudioContext();
      if (!ctx) return;

      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const start = ctx.currentTime + idx * 0.1;

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, start);

        gain.gain.setValueAtTime(0, start);
        gain.gain.linearRampToValueAtTime(0.25 * masterVolume, start + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, start + 0.6);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(start);
        osc.stop(start + 0.65);
      });
    },

    /**
     * 播放鬧鐘連續響鈴
     */
    createAlarmLoop: function() {
      let intervalId = null;
      return {
        start: function() {
          if (intervalId) return;
          const ring = () => {
            if (isMuted) return;
            const ctx = getAudioContext();
            if (!ctx) return;

            // 雙嗶聲
            [0, 0.15].forEach(offset => {
              const osc = ctx.createOscillator();
              const gain = ctx.createGain();
              const start = ctx.currentTime + offset;

              osc.type = 'square';
              osc.frequency.setValueAtTime(880, start); // A5

              gain.gain.setValueAtTime(0.2 * masterVolume, start);
              gain.gain.exponentialRampToValueAtTime(0.01, start + 0.1);

              osc.connect(gain);
              gain.connect(ctx.destination);

              osc.start(start);
              osc.stop(start + 0.1);
            });
          };

          ring();
          intervalId = setInterval(ring, 1000);
        },
        stop: function() {
          if (intervalId) {
            clearInterval(intervalId);
            intervalId = null;
          }
        }
      };
    },

    /**
     * 播放勝利 / 抽中大獎慶祝音樂
     */
    playFanfare: function() {
      if (isMuted) return;
      const ctx = getAudioContext();
      if (!ctx) return;

      const chords = [
        { f: 523.25, d: 0.12 }, // C5
        { f: 659.25, d: 0.12 }, // E5
        { f: 783.99, d: 0.12 }, // G5
        { f: 1046.5, d: 0.45 }  // C6
      ];

      let t = ctx.currentTime;
      chords.forEach(c => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(c.f, t);

        gain.gain.setValueAtTime(0.25 * masterVolume, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + c.d);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(t);
        osc.stop(t + c.d);
        t += c.d;
      });
    }
  };

  window.AppAudio = AppAudio;
})(typeof window !== 'undefined' ? window : this);
