import { Logger } from './Logger';
import { ScannedElement } from './DOMScanner';

export const FormFiller = {
  fill: (el: ScannedElement, value: string | boolean): boolean => {
    try {
      if (el.tagName === 'INPUT' && (el as HTMLInputElement).type === 'radio') {
        const inputEl = el as HTMLInputElement;
        const shouldCheck = Boolean(value);

        if (shouldCheck && !inputEl.checked) {
          inputEl.checked = true;
          FormFiller.triggerEvents(inputEl, ['change', 'click']);
          return true;
        }
        return false;
      }

      if (el.tagName === 'INPUT' && (el as HTMLInputElement).type === 'checkbox') {
        const inputEl = el as HTMLInputElement;
        const shouldCheck = Boolean(value);
        if (inputEl.checked !== shouldCheck) {
          inputEl.checked = shouldCheck;
          FormFiller.triggerEvents(inputEl, ['change', 'click']);
          return true;
        }
        return false;
      }

      const valStr = String(value);
      if (el.value !== valStr) {
        el.value = valStr;
        FormFiller.triggerEvents(el, ['input', 'change', 'blur']);
        return true;
      }

      return false;
    } catch (err) {
      Logger.error(`Failed to set value on element ${el.tagName}`, err);
      return false;
    }
  },

  triggerEvents: (el: HTMLElement, eventNames: string[]) => {
    eventNames.forEach((name) => {
      const event = new Event(name, { bubbles: true, cancelable: true });
      el.dispatchEvent(event);
    });
  },
};
