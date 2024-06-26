/**
 * Check if the video is ready for the ending action
 *
 * @param {number} currentTime
 * @param {string} videoLabel
 * @param {object} videoData
 * @returns {boolean}
 */
export default function checkForVideoEnding(
  currentTime,
  videoLabel,
  videoData
) {
  if (videoLabel === 'endscreenInfo') {
    if (currentTime >= videoData[videoLabel]['startHotSpot'] / 1000) {
      return true;
    }
  }
  return false;
}
