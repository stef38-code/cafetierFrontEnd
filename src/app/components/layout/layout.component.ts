import { Component, OnInit, HostBinding } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MatSidenavContainer } from '@angular/material/sidenav';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'material-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {


  public loading: boolean = false;
  public isAuthenticated: boolean = false;
  public title: string | undefined;

  public isBypass: boolean = false;
  public mobile: boolean = false;
  public isMenuInitOpen!: boolean;


  constructor(private breakpointObserver: BreakpointObserver,
              private router: Router,
              private _snackBar: MatSnackBar) { }

  //private sidenav: MatSidenav;

  public isMenuOpen = true;
  public contentMargin = 240;

  get isHandset(): boolean {
    return this.breakpointObserver.isMatched(Breakpoints.Handset);
  }

  // *********************************************************************************************
  // * LIFE CYCLE EVENT FUNCTIONS
  // *********************************************************************************************

  ngOnInit() {
    this.isMenuOpen = true;  // Open side menu by default
    this.title = 'Material Layout Demo';
  }

  ngDoCheck() {
    if (this.isHandset) {
      this.isMenuOpen = false;
    } else {
      this.isMenuOpen = true;
    }
  }

  // *********************************************************************************************
  // * COMPONENT FUNCTIONS
  // *********************************************************************************************

  public openSnackBar(msg: string): void {
    this._snackBar.open(msg, 'X', {
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: 'notif-error'
    });
  }

  public onSelectOption(option: any): void {
    const msg = `Chose option ${option}`;
    this.openSnackBar(msg);

    /* To route to another page from here */
    // this.router.navigate(['/home']);
  }
}
