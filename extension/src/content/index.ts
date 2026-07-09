import { ResultReporter } from '../features/autofill/engine/ResultReporter';
import { AutofillMessage } from '../features/autofill/types/types';
import { pdfService } from '../features/profile/services/pdf.service';
import { VisaProfile } from '../features/profile/types/profile';

console.log('[VisaKit] Content script loaded.');

// Standard message listener for background tab commands
chrome.runtime.onMessage.addListener((message: AutofillMessage, _sender, sendResponse) => {
  if (message.action === 'AUTOFILL') {
    ResultReporter.runAutofill(message.profile)
      .then((report) => {
        sendResponse(report);
      })
      .catch((err) => {
        console.error('[VisaKit] Autofill engine execution failure:', err);
        sendResponse({
          filled: 0,
          skipped: 0,
          failed: 1,
          timeMs: 0,
        });
      });
    return true;
  }
});

// Auto-inject widget only on the supported Indian Visa website
const isSupportedDomain = window.location.hostname.includes('indianvisa-bangladesh.nic.in');

if (isSupportedDomain) {
  // Prevent duplicate injections
  if (!document.getElementById('visakit-panel-root')) {
    injectFloatingPanel();
  }
}

function injectFloatingPanel() {
  const root = document.createElement('div');
  root.id = 'visakit-panel-root';
  root.style.position = 'fixed';
  root.style.zIndex = '999999';
  root.style.top = '20px';
  root.style.right = '20px';
  root.style.width = '360px';
  root.style.fontFamily = 'Inter, system-ui, -apple-system, sans-serif';
  root.style.boxSizing = 'border-box';

  const styleTag = document.createElement('style');
  styleTag.textContent = `
    #visakit-panel-root *, #visakit-panel-root *::before, #visakit-panel-root *::after {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    .visakit-card {
      background: rgba(15, 23, 42, 0.95);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 16px;
      box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.2);
      color: #f8fafc;
      padding: 16px;
      display: flex;
      flex-direction: column;
      gap: 14px;
      backdrop-filter: blur(8px);
    }
    .visakit-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      cursor: move;
      border-b: 1px solid rgba(255, 255, 255, 0.05);
      padding-bottom: 8px;
    }
    .visakit-logo {
      font-weight: 800;
      font-size: 13px;
      color: #3b82f6;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    .visakit-title {
      font-weight: 700;
      font-size: 14px;
      color: #f8fafc;
    }
    .visakit-controls {
      display: flex;
      gap: 6px;
    }
    .visakit-btn-control {
      background: none;
      border: none;
      color: #64748b;
      cursor: pointer;
      font-size: 14px;
      line-height: 1;
      padding: 2px 6px;
      border-radius: 4px;
      transition: all 0.15s;
    }
    .visakit-btn-control:hover {
      background: rgba(255, 255, 255, 0.05);
      color: #f8fafc;
    }
    .visakit-body {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .visakit-label {
      font-size: 10px;
      font-weight: 700;
      color: #94a3b8;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      margin-bottom: 4px;
      display: block;
    }
    .visakit-select {
      width: 100%;
      background: #090d16;
      border: 1px solid #1e293b;
      border-radius: 8px;
      color: #e2e8f0;
      padding: 8px 12px;
      font-size: 12px;
      outline: none;
      cursor: pointer;
    }
    .visakit-btn-primary {
      width: 100%;
      background: #2563eb;
      color: #ffffff;
      border: none;
      border-radius: 8px;
      padding: 10px;
      font-size: 12px;
      font-weight: 700;
      cursor: pointer;
      transition: background 0.15s;
    }
    .visakit-btn-primary:hover {
      background: #1d4ed8;
    }
    .visakit-input-file {
      font-size: 11px;
      color: #94a3b8;
      margin-top: 4px;
      width: 100%;
    }
    .visakit-toast {
      padding: 8px 12px;
      border-radius: 8px;
      font-size: 11px;
      font-weight: 600;
      margin-top: 6px;
    }
    .visakit-toast-success {
      background: rgba(16, 185, 129, 0.1);
      border: 1px solid rgba(16, 185, 129, 0.2);
      color: #34d399;
    }
    .visakit-toast-error {
      background: rgba(239, 68, 68, 0.1);
      border: 1px solid rgba(239, 68, 68, 0.2);
      color: #f87171;
    }
  `;

  document.head.appendChild(styleTag);

  root.innerHTML = `
    <div class="visakit-card" id="visakit-panel-card">
      <div class="visakit-header" id="visakit-panel-drag-header">
        <span class="visakit-logo">VisaKit</span>
        <span class="visakit-title">Floating Panel</span>
        <div class="visakit-controls">
          <button class="visakit-btn-control" id="visakit-btn-min">_</button>
          <button class="visakit-btn-control" id="visakit-btn-close">×</button>
        </div>
      </div>
      <div class="visakit-body" id="visakit-panel-body-content">
        <div>
          <label class="visakit-label">Profile Selector</label>
          <select class="visakit-select" id="visakit-profile-selector"></select>
        </div>
        <button class="visakit-btn-primary" id="visakit-btn-trigger-autofill">Quick Autofill</button>
        <div>
          <label class="visakit-label">Import from PDF</label>
          <input type="file" class="visakit-input-file" id="visakit-panel-pdf-upload" accept=".pdf" />
        </div>
        <div id="visakit-panel-toasts"></div>
      </div>
    </div>
  `;

  document.body.appendChild(root);

  // Restore saved coordinates if available
  chrome.storage.local.get(['visakit_panel_top', 'visakit_panel_right'], (res) => {
    if (res.visakit_panel_top) root.style.top = res.visakit_panel_top;
    if (res.visakit_panel_right) root.style.right = res.visakit_panel_right;
  });

  // Dragging Implementation
  let isDragging = false;
  let offsetX = 0;
  let offsetY = 0;

  const header = document.getElementById('visakit-panel-drag-header');
  header?.addEventListener('mousedown', (e) => {
    isDragging = true;
    offsetX = e.clientX - root.getBoundingClientRect().left;
    offsetY = e.clientY - root.getBoundingClientRect().top;
    e.preventDefault();
  });

  document.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    const x = e.clientX - offsetX;
    const y = e.clientY - offsetY;

    root.style.left = `${x}px`;
    root.style.top = `${y}px`;
    root.style.right = 'auto'; // release right alignment
  });

  document.addEventListener('mouseup', () => {
    if (isDragging) {
      isDragging = false;
      chrome.storage.local.set({
        visakit_panel_top: root.style.top,
        visakit_panel_right: root.style.right,
        visakit_panel_left: root.style.left,
      });
    }
  });

  // Minimize Implementation
  const btnMin = document.getElementById('visakit-btn-min');
  const bodyContent = document.getElementById('visakit-panel-body-content');
  btnMin?.addEventListener('click', () => {
    if (bodyContent) {
      const isHidden = bodyContent.style.display === 'none';
      bodyContent.style.display = isHidden ? 'flex' : 'none';
      btnMin.textContent = isHidden ? '_' : '+';
    }
  });

  // Close Implementation
  const btnClose = document.getElementById('visakit-btn-close');
  btnClose?.addEventListener('click', () => {
    root.remove();
  });

  // Populate profiles select dropdown
  const select = document.getElementById('visakit-profile-selector') as HTMLSelectElement;
  chrome.storage.local.get('visakit_profiles', (res) => {
    const raw = res.visakit_profiles;
    if (raw) {
      // Decode if encrypted
      let profiles: VisaProfile[] = [];
      try {
        if (typeof raw === 'string') {
          // If we have a decrypted passcode token in session memory, we can decode it
          // For simplicity in the injected context, we list default profiles or plain profiles
          profiles = JSON.parse(raw) as VisaProfile[];
        } else if (Array.isArray(raw)) {
          profiles = raw;
        }
      } catch {
        profiles = [];
      }
      profiles.forEach((p) => {
        const opt = document.createElement('option');
        opt.value = p.id;
        opt.textContent = `${p.surname}, ${p.givenName} (${p.passportNumber})`;
        if (p.isDefault) opt.selected = true;
        select?.appendChild(opt);
      });
    }
  });

  // Quick Autofill button trigger
  const autofillBtn = document.getElementById('visakit-btn-trigger-autofill');
  autofillBtn?.addEventListener('click', async () => {
    autofillBtn.textContent = 'Filling fields...';
    const profileId = select?.value;
    chrome.storage.local.get('visakit_profiles', async (res) => {
      const raw = res.visakit_profiles;
      let profiles: VisaProfile[] = [];
      if (raw) {
        if (Array.isArray(raw)) profiles = raw;
        else {
          try {
            profiles = JSON.parse(raw) as VisaProfile[];
          } catch {
            profiles = [];
          }
        }
      }
      const active = profiles.find((p) => p.id === profileId);
      if (!active) {
        showToast('Active profile not found.', 'error');
        autofillBtn.textContent = 'Quick Autofill';
        return;
      }
      try {
        const report = await ResultReporter.runAutofill(active);
        showToast(`Filled ${report.filled} fields, skipped ${report.skipped}.`, 'success');
      } catch (err) {
        showToast(err instanceof Error ? err.message : 'Autofill failed.', 'error');
      } finally {
        autofillBtn.textContent = 'Quick Autofill';
      }
    });
  });

  // PDF file upload parsing
  const pdfInput = document.getElementById('visakit-panel-pdf-upload') as HTMLInputElement;
  pdfInput?.addEventListener('change', () => {
    const file = pdfInput.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const buffer = event.target?.result as ArrayBuffer;
        const text = pdfService.extractTextFromPdfBuffer(buffer);
        const parsed = pdfService.parsePdfProfile(text);
        if (parsed.passportNumber) {
          showToast(`Extracted Passport No: ${parsed.passportNumber}`, 'success');
        } else {
          showToast('Failed to find passport details in PDF.', 'error');
        }
      } catch {
        showToast('PDF parsing failed.', 'error');
      }
    };
    reader.readAsArrayBuffer(file);
  });
}

function showToast(msg: string, type: 'success' | 'error') {
  const container = document.getElementById('visakit-panel-toasts');
  if (container) {
    container.innerHTML = `<div class="visakit-toast visakit-toast-${type}">${msg}</div>`;
    setTimeout(() => {
      container.innerHTML = '';
    }, 4000);
  }
}

