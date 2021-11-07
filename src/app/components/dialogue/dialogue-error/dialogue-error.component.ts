import {Component, OnInit, Optional} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";

export interface DialogData {
  titre: string;
  message: string;
}

@Component({
  selector: 'app-dialogue-error',
  templateUrl: './dialogue-error.component.html',
  styleUrls: ['./dialogue-error.component.css']
})

export class DialogueErrorComponent implements OnInit {
  titre: string = '';
  message: string = '';
  public data: DialogData = {} as DialogData;

  constructor(@Optional() private dialogRef: MatDialogRef<DialogueErrorComponent>) {
  }

  /*openDialog(): void {
    const dialogRef = this.dialog.open(DialogueErrorComponent, {
      width: '250px',
      data: {titre: this.titre, message: this.message}
    });

  }*/
  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }
}


