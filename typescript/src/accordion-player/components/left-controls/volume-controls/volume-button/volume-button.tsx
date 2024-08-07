import volumeBtn from './../../../../assets/images/volume_icon.svg';
import volumeMuteBtn from './../../../../assets/images/volume_icon_mute.svg';
import {
  VOLUME_BTN_HEIGHT_LARGE,
  VOLUME_BTN_HEIGHT_SMALL,
  VOLUME_BTN_WIDTH_LARGE,
  VOLUME_BTN_WIDTH_SMALL,
} from './../../../../common/constants';
import ControlButton from './../../control-button/control-button';

/**
 * Volume control icon that toggles volume slider
 *
 * @param {boolean} isMute Status of whether video is muted
 * @param {function} clickHandler Function to toggle volume mute
 *
 * @returns {ReactNode} Control button of type Volume control
 *
 * @example
 * <VolumeButton isMute='false' clickhandler={fn} />
 *
 */
export default function VolumeButton({
  isMute,
  clickHandler,
}: {
  isMute: boolean;
  clickHandler: () => void;
}) {
  return (
    <ControlButton
      btnHeightSmall={VOLUME_BTN_HEIGHT_SMALL}
      btnHeightLarge={VOLUME_BTN_HEIGHT_LARGE}
      btnWidthSmall={VOLUME_BTN_WIDTH_SMALL}
      btnWidthLarge={VOLUME_BTN_WIDTH_LARGE}
      btnImage={isMute ? volumeMuteBtn : volumeBtn}
      btnAltText='volume'
      btnClickHandler={clickHandler}
    />
  );
}
