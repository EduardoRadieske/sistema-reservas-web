import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

export type ToastType = 'success' | 'warning' | 'error';

@Injectable({
    providedIn: 'root'
})
export class Toast {
    private toastSubject = new BehaviorSubject<{ message: string; type: ToastType } | null>(null);
    toast$ = this.toastSubject.asObservable();

    show(message: string, type: ToastType = 'success', duration: number = 3000) {
        this.toastSubject.next({ message, type });
        setTimeout(() => this.toastSubject.next(null), duration);
    }
}