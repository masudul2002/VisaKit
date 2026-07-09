# AI Development Rules

When assisting with VisaKit code development, you must strictly follow these instructions:

---

## 🛑 Strict Restrictions

1.  **Strict File Sizing**:
    Never write any single code file that exceeds **300 lines**. If your changes cause a file to exceed this threshold, you MUST split the file into smaller, modular sub-components or utility files.
2.  **No Code Removal**:
    Never remove working feature logic or clean comments unless explicitly requested.
3.  **No TODO Drafts**:
    All code edits must represent finished, buildable features. Do not leave `TODO` comments or empty method stubs in your changes.
4.  **No `any` Typings**:
    Always write explicitly typed objects. Use union types or generics where applicable.

---

## 🎨 UI & Layout Rules

*   Maintain the primary blue theme (`#2563EB`) and sleek slate backgrounds.
*   Support responsive spacing, proper border highlights, focus-visible rings (`focus-visible:ring-2 focus-visible:ring-blue-500`), and dark mode elements (`dark:bg-slate-950`).
*   Ensure all components are accessible, providing ARIA labels for buttons and screen-reader headings.
