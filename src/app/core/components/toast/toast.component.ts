import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Toast } from '../../utils/toast';

@Component({
    selector: 'app-toast',
    imports: [CommonModule],
    template: `
    @if (toastService.toast$ | async; as toast) {
        <div class="toast" [ngClass]="toast.type">
            {{ toast.message }}
        </div>
    }
  `,
    styles: [`
    .toast {
      position: fixed;
      bottom: 20px;
      right: 20px;
      padding: 12px 18px;
      border-radius: 8px;
      color: white;
      font-weight: 500;
      box-shadow: 0 2px 8px rgba(0,0,0,0.2);
      animation: fadein 0.3s, fadeout 0.3s 2.7s;
      z-index: 9999;
    }
    .success { background: #4CAF50; }
    .warning { background: #FF9800; }
    .error { background: #F44336; }

    @keyframes fadein { from {opacity: 0;} to {opacity: 1;} }
    @keyframes fadeout { from {opacity: 1;} to {opacity: 0;} }
  `]
})
export class ToastComponent {
    public toastService = inject(Toast);
}