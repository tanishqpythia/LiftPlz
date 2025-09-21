import { inject, Injectable } from '@angular/core';
import { SnackBarComponent } from '../../Components/snack-bar/snack-bar.component';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarRef, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';



@Injectable({
  providedIn: 'root'
})
export class NotificationTriggerService {

  constructor() { }

  private _snackBar = inject(MatSnackBar);

  showNotification({
    durationInSeconds = 3,
    Message = 'Notification',
    action = 'OK',
    notificationType = 'info',
    horizontalPosition = 'end',
    verticalPosition = 'bottom',
  }: {
    durationInSeconds?: number;
    Message?: string;
    action?: string;
    notificationType?: string;
    horizontalPosition?: MatSnackBarHorizontalPosition;
    verticalPosition?: MatSnackBarVerticalPosition;
  } = {}) {
    this._snackBar.openFromComponent(SnackBarComponent, {
      duration: durationInSeconds * 1000,
      horizontalPosition: horizontalPosition,
      verticalPosition: verticalPosition,
      data: { message: Message, action: action, notificationType: notificationType },
    });
  }

}
