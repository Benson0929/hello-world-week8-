// Loaded ONLY by preview.html. Nothing is saved to storage or the main site.
const previewSettings = { speed: 60, startSecond: 2, resetSecond: 3600, endSecond: 3602 };
const previewHour = new Date();
previewHour.setMinutes(0, 0, 0);
const previewState = { playing: false, position: previewSettings.startSecond, anchor: performance.now() };

// Fast-forward growth, then show the actual two-second reset at normal speed.
function advancePreview(position, elapsedSeconds) {
  const { speed, resetSecond, endSecond } = previewSettings;
  if (position < resetSecond) {
    const remaining = (resetSecond - position) / speed;
    if (elapsedSeconds <= remaining) return position + elapsedSeconds * speed;
    return Math.min(endSecond, resetSecond + elapsedSeconds - remaining);
  }
  return Math.min(endSecond, position + elapsedSeconds);
}

function previewPosition(now = performance.now()) {
  if (!previewState.playing) return previewState.position;
  const position = advancePreview(previewState.position, (now - previewState.anchor) / 1000);
  if (position >= previewSettings.endSecond) {
    previewState.position = previewSettings.endSecond;
    previewState.playing = false;
  }
  return position;
}

function readPreviewDate() {
  // Set wall-clock components rather than accumulating drawing-frame deltas.
  const simulated = new Date(previewHour);
  simulated.setSeconds(0, Math.round(previewPosition() * 1000));
  return simulated;
}

const previewPlay = document.getElementById("preview-play");
const previewRestart = document.getElementById("preview-restart");
const previewSlider = document.getElementById("preview-position");
const previewStatus = document.getElementById("preview-status");

previewPlay.addEventListener("click", () => {
  previewState.position = previewPosition();
  if (previewState.position >= previewSettings.endSecond) previewState.position = previewSettings.startSecond;
  previewState.playing = !previewState.playing;
  previewState.anchor = performance.now();
  updatePreviewControls();
});

previewRestart.addEventListener("click", () => {
  previewState.position = previewSettings.startSecond;
  previewState.anchor = performance.now();
  previewState.playing = false;
  updatePreviewControls();
});

previewSlider.addEventListener("input", () => {
  previewState.position = Number(previewSlider.value);
  previewState.anchor = performance.now();
  previewState.playing = false;
  updatePreviewControls();
});

// Pause when hidden so the user does not miss the reset while changing tabs.
document.addEventListener("visibilitychange", () => {
  if (document.hidden && previewState.playing) {
    previewState.position = previewPosition();
    previewState.playing = false;
    updatePreviewControls();
  }
});

function updatePreviewControls() {
  const position = previewPosition();
  const reset = position >= previewSettings.resetSecond;
  const finished = position >= previewSettings.endSecond;
  previewPlay.textContent = previewState.playing ? "暫停" : finished ? "再播放一次" : "播放 60×";
  previewSlider.value = position;
  previewSlider.setAttribute("aria-valuetext", reset
    ? "整點淡出 " + (position - previewSettings.resetSecond).toFixed(1) + " 秒"
    : "生成進度 " + (position / 36).toFixed(1) + "%");
  previewStatus.textContent = finished ? "已完成整點歸零"
    : reset ? "整點歸零 · 以原速顯示 2 秒淡出"
    : "生成 " + (position / 36).toFixed(1) + "% · " + (previewState.playing ? "60×" : "已暫停");
}

function previewControlFrame() {
  updatePreviewControls();
  requestAnimationFrame(previewControlFrame);
}
previewControlFrame();
