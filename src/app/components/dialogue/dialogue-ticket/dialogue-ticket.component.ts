import {Component, OnInit, Optional} from '@angular/core';
import {Observable} from "rxjs";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Ticket} from "../../../shared/state/model/ticket";
import {Store} from "@ngrx/store";
import {ApplicationStore} from "../../../shared/state/reducers";
import {MatDialogRef} from "@angular/material/dialog";
import {TicketSelector} from "../../../shared/state/selectors/ticket";
import {TicketAction} from "../../../shared/state/actions/ticket-action";
import {Personne} from "../../../shared/state/model/personne";

@Component({
  selector: 'app-dialogue-ticket',
  templateUrl: './dialogue-ticket.component.html',
  styleUrls: ['./dialogue-ticket.component.css']
})
export class DialogueTicketComponent implements OnInit {

  editForm: FormGroup;
  private editTicket$: Observable<Ticket>;
  private numero: FormControl;
  private montant: FormControl;
  private id: string = '';
  private personne: Personne = {} as Personne;
  private data: Ticket = {
    montant: 0,
    numero: '',
    links: [],
    personne: {} as Personne,
    id: ''
  };


  constructor(
    private store: Store<ApplicationStore.State>,
    private fb: FormBuilder,
    @Optional() private dialogRef: MatDialogRef<DialogueTicketComponent>
  ) {
    this.editTicket$ = store.select(TicketSelector.getTicketSelected);
    this.editTicket$.subscribe(res => {
      this.data = res;
    });
    this.numero = new FormControl('', [Validators.required]);
    this.montant = new FormControl(0, [Validators.required]);
    this.editForm = this.createFormGroup(fb);
  }

  ngOnInit(): void {
    this.editForm.patchValue({
      numero: this.data.numero,
      montant: this.data.montant,
    });
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
    this.store.dispatch(new TicketAction.Add(ticket));
    this.close();
  }

  close() {
    this.dialogRef.close();
  }
}
