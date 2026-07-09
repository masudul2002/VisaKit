export type ScannedElement = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

export const DOMScanner = {
  scan: (): ScannedElement[] => {
    const elements: ScannedElement[] = [];

    const candidates = document.querySelectorAll<ScannedElement>('input, select, textarea');

    candidates.forEach((el) => {
      if (el.tagName === 'INPUT') {
        const inputEl = el as HTMLInputElement;
        const type = (inputEl.type || 'text').toLowerCase();
        if (['hidden', 'submit', 'button', 'image', 'reset', 'file'].includes(type)) {
          return;
        }
      }

      const style = window.getComputedStyle(el);
      if (style.display === 'none' || style.visibility === 'hidden') {
        return;
      }

      elements.push(el);
    });

    return elements;
  },
};
