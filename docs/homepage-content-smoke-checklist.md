# Homepage Content Smoke Checklist

Use this quick checklist after changing property/design visibility logic.

## Properties ("On Show")

- In admin properties list, toggle one property to `On Show`.
- Confirm it appears on homepage in the `On Show` section.
- Toggle it back to hidden and confirm it disappears after refresh.
- Confirm when no properties are `On Show`, homepage shows the empty-state message.

## Property Designs (Featured Designs)

- In admin property designs list, toggle one design to `On Homepage`.
- Confirm it appears under `Featured Designs` on homepage.
- Toggle it back to hidden and confirm it disappears after refresh.
- Confirm when no designs are featured, `Featured Designs` shows no cards.

## Security and Access

- Verify non-admin user cannot toggle homepage visibility from admin APIs.
- Verify admin user can still toggle `featured` / `is_featured`.
- Verify unauthorized direct calls to `/api/admin/*` return `401/403`.
