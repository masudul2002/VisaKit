# Coding Rules & Conventions

Always write code matching these standards:

---

## 💻 Tech Stack Specifications

-   **React 19**: Use functional components, React Hooks (`useState`, `useEffect`, `useCallback`, `useMemo`), and strict rendering.
-   **TypeScript**: Keep compiler options strict. Avoid typing shortcuts.
-   **TailwindCSS**: Avoid inline CSS. Utilize tailwind utility classes.
-   **Chrome Storage**: Use `chrome.storage.local` inside services. Always provide a transparent fallback to `localStorage` for development preview environments.

---

## 📂 Subdirectory Architecture

*   Feature folders must follow a strict layout:
    ```text
    features/
    └── <name>/
        ├── components/     # UI elements
        ├── hooks/          # React hooks
        ├── services/       # Repository classes
        ├── types/          # Schema interfaces
        └── index.ts        # Exports entrypoint
    ```
*   **Export policy**: Every subdirectory MUST contain an `index.ts` file re-exporting its sibling files.
*   **Decoupling**: Keep UI layouts separate from state management by utilizing custom hooks (e.g. decoupling `ProfileDashboard.tsx` state into `useProfiles.ts`).
