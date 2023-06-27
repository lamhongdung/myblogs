import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotifierModule, NotifierOptions } from 'angular-notifier';



const customNotifierOptions: NotifierOptions = {
  position: {
    horizontal: {
      // position: 'left',
      position: 'right',
      distance: 150
    },
    vertical: {
      position: 'top',
      // distance: 12,
      distance: 50,
      gap: 10
    }
  },
  theme: 'material',
  behaviour: {
    autoHide: 5000,
    onClick: 'hide',
    onMouseover: 'pauseAutoHide',
    showDismissButton: true,
    stacking: 4
  },
  animations: {
    enabled: true,
    show: {
      preset: 'slide',
      speed: 300,
      easing: 'ease'
    },
    hide: {
      preset: 'fade',
      speed: 300,
      easing: 'ease',
      offset: 50
    },
    shift: {
      speed: 300,
      easing: 'ease'
    },
    overlap: 150
  }
};


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NotifierModule.withConfig(customNotifierOptions)
  ],
  exports: [NotifierModule]
})
export class NotificationModule { }