import {
  OnInit,
  Component,
  HostListener
} from '@angular/core';

import { AppConstants } from '../../common/constants';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrl: './video-player.component.scss',
})
export class VideoPlayerComponent implements OnInit {
  videoStyle: any;

  constructor() {}

  ngOnInit(): void {
    this.generateVideoStyle(window.innerWidth, window.innerHeight);
  }

  generateVideoStyle(inpWidth: number, inpHeight: number): void {
    let playerWidth, playerHeight, playerMarginTop: number;
    playerWidth = 0.9 * inpWidth;
    if (playerWidth > AppConstants.MAX_VIDEO_WIDTH) {
      playerWidth = AppConstants.MAX_VIDEO_WIDTH;
    }
    playerHeight = playerWidth * AppConstants.VIDEO_ASPECT_RATIO;
    if (playerHeight > inpHeight) {
      playerHeight = 0.9 * inpHeight;
      playerWidth = playerHeight / AppConstants.VIDEO_ASPECT_RATIO;
    }
    playerMarginTop = (inpHeight - playerHeight) / 2.0;

    this.videoStyle = {
      height: `${playerHeight}px`,
      width: `${playerWidth}px`,
      marginTop: `${playerMarginTop}px`,
    };
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.generateVideoStyle(event.target.innerWidth, event.target.innerHeight);
  }
}