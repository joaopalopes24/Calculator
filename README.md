# 🧮 Calculator

Web calculator with **persistent history**, virtual keypad, and keyboard shortcuts. Expression evaluation via a custom parser (no `eval`).

### 📦 Installation

```bash
npm install
```

Requirements: Node ^20.19.0 or >=22.12.0.

### ▶️ Running

```bash
npm run dev       # development server
npm run build     # production build
npm run test:unit # unit tests
```

### 🧩 Features

#### ✅ Input and calculation

- **Expression field** — Type or use the virtual keypad. Accepts spaces; known characters are normalized (e.g. `*` → `×`).
- **Operators:** addition (`+`), subtraction (`−`), multiplication (`×`), division (`÷`), square (`²`), percent (`%`), and parentheses. Decimal numbers with a dot.
- **Precedence:** multiplication and division before addition and subtraction; parentheses override the order.
- **= / Enter** — Evaluates, shows the result in the field, and adds it to history.

#### ✅ Keypad

- **Virtual keypad** — Buttons for digits, operators, parentheses, `C` (clear), `.`, `%`, `²`, etc. Double `×` inserts `²`.
- **Physical keyboard** — Outside the field: mapped digits and operators, Enter/= to evaluate, Backspace to remove the last character. Inside the field: normal typing and paste; Enter evaluates.

#### ✅ History

- **Calculation list** — Each row shows expression and result. Click a row to reuse that expression.
- **Delete item** — Hover over a row to show the delete button; click to remove it from history.
- **Clear All** — Top button clears the entire history.
- **Persistence** — History is stored in the browser (localStorage) across sessions.

#### ✅ Errors

- Error messages (invalid expression, division by zero, unbalanced parentheses, etc.) appear above the field. Any new edit or action clears the error.

### ⚙️ Technical stack

- **Frontend:** Vue 3 (Composition API), TypeScript.
- **State:** Pinia with history persistence (pinia-plugin-persistedstate).
- **Styling:** Tailwind CSS v4.
- **Build:** Vite 7.
- **Tests:** Vitest and Vue Test Utils (store, expression evaluator, clicks, keyboard, and history).
- **Expression evaluation:** Custom parser (tokenization + precedence), no `eval`. Supports `+`, `−`, `×`, `÷`, `²`, `%`, and parentheses.

### 🧩 Benefits

✅ Persistent history in the browser  
✅ Input via virtual and physical keyboard  
✅ Safe expression parser (no `eval`)  
✅ Operator precedence and parentheses  
✅ Unit tests (store, eval, UI, and keyboard)
