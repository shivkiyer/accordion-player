import playBtn from './../../../assets/images/play.svg';
import {
  PLAY_BTN_HEIGHT_LARGE,
  PLAY_BTN_HEIGHT_SMALL,
  PLAY_BTN_WIDTH_LARGE,
  PLAY_BTN_WIDTH_SMALL,
} from '../../../common/constants';
import ControlButton from '../control-button/control-button';

export default function PlayButton() {
  return (
    <ControlButton
      btnHeightSmall={PLAY_BTN_HEIGHT_SMALL}
      btnHeightLarge={PLAY_BTN_HEIGHT_LARGE}
      btnWidthSmall={PLAY_BTN_WIDTH_SMALL}
      btnWidthLarge={PLAY_BTN_WIDTH_LARGE}
      btnImage={playBtn}
      btnAltText='play'
    />
  );
}
