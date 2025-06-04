import { Component, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { SpinnerService } from '../../../services/common/spinner.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrl: './spinner.component.scss',
  animations: [
    trigger('slideInOut', [
      state('void', style({ opacity: 0.5})),
      state('*', style({ opacity: 1})),
      transition(':enter', [
        animate('300ms ease-out')
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ opacity: 0}))
      ])
    ])
  ]
})
export class SpinnerComponent implements OnDestroy {
    public spinnerVisible: boolean = false;
    private subscription: Subscription;

    constructor(
        private spinnerService: SpinnerService,
        private cdr: ChangeDetectorRef
    ) {
        this.subscription = this.spinnerService.spinnerState$.subscribe((spinnerState) => {
            this.spinnerVisible = spinnerState.visible;
            this.cdr.detectChanges();
        });
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
