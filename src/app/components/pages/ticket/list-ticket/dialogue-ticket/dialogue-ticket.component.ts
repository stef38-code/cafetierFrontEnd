import {Component, Inject, OnInit, Optional} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Ticket} from "../../../../../shared/state/model/ticket";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Lien} from "../../../../../shared/state/model/lien";
import {HttpClient} from "@angular/common/http";
import {TicketHttpService} from "../../../../../shared/services/ticket-http.service";

@Component({
  selector: 'app-dialogue-ticket',
  templateUrl: './dialogue-ticket.component.html',
  styleUrls: ['./dialogue-ticket.component.css']
})
export class DialogueTicketComponent implements OnInit {

  editForm: FormGroup;
  private numero: FormControl;
  private montant: FormControl;
  private data: Ticket = {} as Ticket;
  /* {
   montant: 0,
   numero: '',
   links: [],
   personne: {} as Personne,
   id: ''
 };*/
  private httpTicket: TicketHttpService;


  constructor(
    private fb: FormBuilder,
    @Optional() private dialogRef: MatDialogRef<DialogueTicketComponent>,
    @Inject(MAT_DIALOG_DATA) public param: Lien,
    private http$: HttpClient
  ) {
    this.httpTicket = new TicketHttpService(this.http$);

    this.numero = new FormControl('', [Validators.required]);
    this.montant = new FormControl(0, [Validators.required]);
    this.editForm = this.createFormGroup(fb);
  }

  ngOnInit(): void {
    let href = this.param.href;
    if (href) {
      this.httpTicket.editer(href).subscribe(res => {
        this.data = res;
        this.numero.setValue(this.data.numero);
        this.montant.setValue(this.data.montant);
      });
    }
  }

  createFormGroup(formBuilder: FormBuilder) {
    return formBuilder.group({
      montant: this.montant,
      numero: this.numero,
    })
  }

  isDesactiveSave(): boolean {
    return !(this.montant.value !== '' && this.numero.value !== '');
  }

  save() {
    this.dialogRef.close(this.editForm.value);
    const ticket: Ticket = Object.assign({}, this.data, {
      montant: this.montant.value,
      numero: this.numero.value,
    });
    this.httpTicket.enregister(ticket).subscribe(res => {
      this.data = res;
    });
    this.close();
  }

  close() {
    this.dialogRef.close();
  }
}
