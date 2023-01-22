import { Injectable } from '@angular/core';
import { CreateHotToastRef, HotToastService } from '@ngneat/hot-toast';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  loadingRef!: CreateHotToastRef<any>;

  constructor(private toast: HotToastService) {}

  show(msg: string) {
    this.toast.show(msg);
  }

  info(msg: string) {
    this.toast.info(msg);
  }

  error(msg: string) {
    this.toast.error(msg);
  }

  warning(msg: string) {
    this.toast.warning(msg);
  }

  success(msg: string) {
    this.toast.success(msg);
  }

  loading(msg: string) {
    this.loadingRef = this.toast.loading(msg);
  }

  loadingComplete() {
    if (this.loadingRef) {
      this.loadingRef.close();
    }
  }

}
