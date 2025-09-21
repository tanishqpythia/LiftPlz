import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-dialogbox',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './dialogbox.component.html',
  styleUrl: './dialogbox.component.css'
})
export class DialogboxComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
