# shadcn-form-date-time-picker

Example of how to build a **date & time picker** with
[shadcn/ui](https://ui.shadcn.com) and use it with
[React Hook Form](https://react-hook-form.com/) and [Zod](https://zod.dev/). It
combines a calendar + time input inside one popover.

View Demo: https://shadcn-form-date-time-picker.vercel.app/

_This component provides a foundation for a date & time picker that you can
customize and extend to fit your own needs._

## Notes

- The component maintains **internal state** (`tempDate`) to track the currently
  selected date and time while the popover is open.

- The form value (`onChange`) is **only updated when the popover closes**,
  ensuring that partial changes in the picker do not immediately trigger form
  updates.

- The displayed date value uses `Date.toLocaleString()`, so formatting and
  language follow the **browser's language/locale settings**.

- The time input (`<input type="time" />`) uses the **operating system's time
  format settings**, e.g. 12h vs 24h clock.
  
- If you need control over the **calendar language**, you can pass a `locale`
  prop to the underlying
  [`Calendar`](https://ui.shadcn.com/docs/components/calendar) component.

  ```tsx
  import { fi } from "react-day-picker/locale"


  <Calendar locale={fi} ... />
  ```

## Contributing

_If you encounter any bugs or issues, I would be happy if you opened a PR or
issue to help improve this component._
