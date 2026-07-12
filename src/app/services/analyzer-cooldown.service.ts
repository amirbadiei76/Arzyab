import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AnalyzerCooldownService {
  cooldownTime = signal<number>(0);
  private cooldownInterval: any;
  constructor() {}

  startCooldown(seconds: number) {
    if (this.cooldownInterval) clearInterval(this.cooldownInterval);
    this.cooldownTime.set(seconds);
    this.cooldownInterval = setInterval(() => {
      if (this.cooldownTime() > 0) {
        this.cooldownTime.update((v) => v - 1);
      } else {
        clearInterval(this.cooldownInterval);
      }
    }, 1000);
  }
}
