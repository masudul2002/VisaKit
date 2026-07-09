# Coding Standards

Please adhere to these coding standards when contributing to VisaKit.

---

## 🛑 Strict Rules

1.  **Never Use `any`**:
    Always define explicit types or interface shapes. If external values are unknown, use `unknown` instead of `any`.
2.  **File Size Limits**:
    To maintain readability:
    *   Maximum lines per file: **300 lines**.
    *   If any component or helper module exceeds 300 lines, it must be split into sub-components or utility files.
3.  **No Duplicate Code**:
    Extract duplicate blocks into services or shared hook utilities.
4.  **No TODO Code**:
    All commits must represent complete feature integrations. Do not commit draft code blocks containing `TODO` comments.

---

## 🎨 React & TypeScript Standards

*   Use **Functional Components** with standard arrow function syntax.
*   Manage states using customized custom hooks (decoupled from component render layouts).
*   Declare typescript props interfaces using descriptive property fields:
    ```typescript
    export interface ButtonProps {
      variant?: 'primary' | 'secondary';
      children: React.ReactNode;
      onClick: () => void;
    }
    ```
*   Utilize Prettier formatting before committing changes.
