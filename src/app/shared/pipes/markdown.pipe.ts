import { Pipe, PipeTransform, inject } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'markdown',
})
export class MarkdownPipe implements PipeTransform {
  private sanitizer = inject(DomSanitizer);

  transform(value: string | undefined | null): SafeHtml {
    if (!value) {
      return '';
    }

    let html = value;

    // Escapar caracteres HTML para mitigar XSS de forma básica
    html = html
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

    // 1. Títulos de markdown (###, ##, #)
    html = html.replace(/^### (.*$)/gim, '<h3 class="text-xs font-extrabold mt-2 mb-1">$1</h3>');
    html = html.replace(/^## (.*$)/gim, '<h2 class="text-sm font-extrabold mt-3 mb-1.5">$1</h2>');
    html = html.replace(/^# (.*$)/gim, '<h1 class="text-base font-extrabold mt-4 mb-2">$1</h1>');

    // 2. Negritas (**texto** o __texto__)
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong class="font-extrabold text-brand-dark">$1</strong>');
    html = html.replace(/__(.*?)__/g, '<strong class="font-extrabold text-brand-dark">$1</strong>');

    // 3. Cursivas (*texto* o _texto_)
    html = html.replace(/\*(.*?)\*/g, '<em class="italic">$1</em>');
    html = html.replace(/_(.*?)_/g, '<em class="italic">$1</em>');

    // 4. Código inline (`código`)
    html = html.replace(/`(.*?)`/g, '<code class="bg-slate-100 text-brand-dark px-1.5 py-0.5 rounded font-mono text-[11px]">$1</code>');

    // 5. Enlaces ([texto](url))
    html = html.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-brand-primary underline hover:text-brand-dark font-semibold">$1</a>');

    // 6. Elementos de listas (- item, * item, 1. item)
    html = html.replace(/^\s*-\s+(.*$)/gim, '<li class="ml-4 list-disc text-slate-700">$1</li>');
    html = html.replace(/^\s*\*\s+(.*$)/gim, '<li class="ml-4 list-disc text-slate-700">$1</li>');
    html = html.replace(/^\s*\d+\.\s+(.*$)/gim, '<li class="ml-4 list-decimal text-slate-700">$1</li>');

    // Respetar saltos de línea reemplazándolos con <br>
    html = html.replace(/\n/g, '<br>');

    return this.sanitizer.bypassSecurityTrustHtml(html);
  }
}
