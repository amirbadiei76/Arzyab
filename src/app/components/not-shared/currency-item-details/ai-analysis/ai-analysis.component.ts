import { Component, inject, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AiAnalyzerService,
  AiAnalysisResult,
} from '../../../../services/ai-analyzer.service';
import { CurrencyItem } from '../../../../interfaces/data.types';
import { AnalyzerCooldownService } from '../../../../services/analyzer-cooldown.service';

@Component({
  selector: 'app-ai-analysis',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './ai-analysis.component.html',
  styleUrl: './ai-analysis.component.css',
})
export class AiAnalysisComponent {
  private aiService = inject(AiAnalyzerService);
  cooldownService = inject(AnalyzerCooldownService);

  // symbol = input.required<string>();
  // name = input<string>('');
  currentPrice = input.required<CurrencyItem>();

  analysisData = signal<AiAnalysisResult | null>(null);
  errorMessage = signal<string | null>(null);
  isLoading = signal<boolean>(false);

  async triggerAnalysis() {
    if (this.cooldownService.cooldownTime() > 0 || this.isLoading()) return;

    this.isLoading.set(true);
    this.errorMessage.set(null);
    this.analysisData.set(null);

    try {
      const result = await this.aiService.generateAnalysis(this.currentPrice());
      this.analysisData.set(result);
      this.cooldownService.startCooldown(30);
    } catch (err: any) {
      if (err.status === 429) {
        this.errorMessage.set(
          'ترافیک تحلیل‌گر در حال حاضر بسیار بالاست. لطفاً یک دقیقه دیگر مجدداً تلاش کنید.',
        );
        this.cooldownService.startCooldown(60);
      } else {
        this.errorMessage.set(
          'ارتباط با سرور هوش مصنوعی برقرار نشد. لطفاً دقایقی دیگر تلاش کنید.',
        );
        this.cooldownService.startCooldown(15);
      }
    } finally {
      this.isLoading.set(false);
    }
  }
}
