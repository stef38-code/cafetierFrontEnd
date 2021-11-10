import {Injectable} from '@angular/core';
import {BehaviorSubject, Subject} from "rxjs";
import {RefPersonne} from "../state/model/personne";

@Injectable({
  providedIn: 'root'
})
export class PersonneEchangeTicketService {

  /**
   * Mise à jours des informations
   */
  public updateSource: boolean = false;
  public updateTicketsNonAffectes: boolean = false;
  public updateTicketsAffectes: boolean = false;
  /**
   * Active ou non les tableaux
   */
  public activerSource: boolean = false;
  public activerTicketsNonAffectes: boolean = false;
  public activerTicketsAffectes: boolean = false;
  /**
   * Les references de la personne
   */
  public refPersonne: RefPersonne = {} as RefPersonne;
  public subject = new Subject<any>();
  private messageUpdateSource = new BehaviorSubject(this.updateSource);
  currentUpdateSource = this.messageUpdateSource.asObservable();
  private messageUpdateTicketsNonAffectes = new BehaviorSubject(this.updateTicketsNonAffectes);
  currentUpdateTicketsNonAffectes = this.messageUpdateTicketsNonAffectes.asObservable();
  private messageUpdateTicketsAffectes = new BehaviorSubject(this.updateTicketsAffectes);
  currentUpdateTicketsAffectes = this.messageUpdateTicketsAffectes.asObservable();
  private messageActiverSource = new BehaviorSubject(this.activerSource);
  currentActiverSource = this.messageActiverSource.asObservable();
  private messageActiverTicketsNonAffectes = new BehaviorSubject(this.activerTicketsNonAffectes);
  currentActiverTicketsNonAffectes = this.messageActiverTicketsNonAffectes.asObservable();
  private messageActiverTicketsAffectes = new BehaviorSubject(this.activerTicketsAffectes);
  currentActiverTicketsAffectes = this.messageActiverTicketsAffectes.asObservable();
  private messageRefPersonne = new BehaviorSubject(this.refPersonne);
  currentRefPersonne = this.messageRefPersonne.asObservable();

  constructor() {
  }

  changeUpdateSource(update: boolean) {
    console.log("changeUpdateSource", this.updateSource, update);
    this.messageUpdateSource.next(update);
  }

  changeUpdateTicketsNonAffectes(update: boolean) {
    console.log("changeUpdateTicketsNonAffectes", this.updateTicketsNonAffectes, update);
    this.messageUpdateTicketsNonAffectes.next(update);
  }

  changeUpdateTicketsAffectes(update: boolean) {
    console.log("changeUpdateTicketsAffectes", this.updateTicketsAffectes, update);
    this.messageUpdateTicketsAffectes.next(update);
  }

  changeActiverSource(update: boolean) {
    console.log("changeActiverSource", this.activerSource, update);
    this.messageActiverSource.next(update);
  }

  changeActiverTicketsNonAffectes(update: boolean) {
    console.log("changeActiverTicketsNonAffectes", this.activerTicketsNonAffectes, update);
    this.messageActiverTicketsNonAffectes.next(update);
  }

  changeActiverTicketsAffectes(update: boolean) {
    console.log("changeActiverTicketsAffectes", this.activerTicketsAffectes, update);
    this.messageActiverTicketsAffectes.next(update);
  }

  changeRefPersonne(refPersonne: RefPersonne) {
    console.log("changeRefPersonne", this.refPersonne, refPersonne);
    this.messageRefPersonne.next(refPersonne);
  }
}
