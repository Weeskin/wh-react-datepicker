# wh-react-datepicker

React DatePicker component with keyboard navigation and accessibility support. Replacement for jQuery UI Datepicker.

## Installation

```bash
npm install wh-react-datepicker
```

## Usage

```tsx
import { DatePicker } from "wh-react-datepicker"
import "wh-react-datepicker/dist/wh-react-datepicker.css"

function MyForm() {
  const [date, setDate] = useState("")

  return (
    <DatePicker
      id="my-date"
      label="Date of Birth"
      value={date}
      onChange={setDate}
    />
  )
}
```

## Props

| Prop | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | yes | HTML id for the input (used by the label) |
| `label` | `string` | yes | Label text |
| `value` | `string` | yes | ISO date string `"YYYY-MM-DD"` or `""` |
| `onChange` | `(value: string) => void` | yes | Called with ISO date string on selection |
| `error` | `string` | no | Error message displayed below the input |
| `min` | `string` | no | Minimum selectable date (ISO) |
| `max` | `string` | no | Minimum selectable date (ISO) |

## Keyboard navigation

| Key | Action |
|---|---|
| `↑ ↓ ← →` | Navigate days in the calendar grid |
| `Enter` / `Space` | Select the focused day |
| `Escape` | Close the calendar |
| `Tab` | Cycle through interactive elements in the calendar |

## Theming

Override the `--dp-primary` CSS custom property on the container or a parent:

```css
.my-form {
  --dp-primary: #1a56db;
}
```

## Peer dependencies

- React >= 18
