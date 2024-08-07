import { LOWER_DEVICE_WIDTH, UPPER_DEVICE_WIDTH } from '../constants';

/**
 * Scales dimension of any UI element according to video width
 * Dimensions scale proportionally between LOWER_DEVICE_WIDTH
 * and UPPER_DEVICE_WIDTH, and linearly outside this range.
 *
 * @param {number} smallDim The dimension for smaller desktop device widths
 * @param {number} largeDim The dimension for larger desktop device widths
 * @param {number} videoWidth The current width of the video player
 *
 * @returns {number} The scaled dimension of the UI element
 */
export default function getScaledDimension({
  smallDim,
  largeDim,
  videoWidth,
}: {
  smallDim: number;
  largeDim: number;
  videoWidth: number;
}) {
  let scaledDimension: number = 0;
  if (videoWidth >= LOWER_DEVICE_WIDTH && videoWidth <= UPPER_DEVICE_WIDTH) {
    scaledDimension =
      smallDim +
      (largeDim - smallDim) *
        ((videoWidth - LOWER_DEVICE_WIDTH) /
          (UPPER_DEVICE_WIDTH - LOWER_DEVICE_WIDTH));
  } else if (videoWidth < LOWER_DEVICE_WIDTH) {
    scaledDimension = smallDim * (videoWidth / LOWER_DEVICE_WIDTH);
  } else if (videoWidth > UPPER_DEVICE_WIDTH) {
    scaledDimension = largeDim * (videoWidth / UPPER_DEVICE_WIDTH);
  }
  return Number(scaledDimension.toFixed(2));
}
