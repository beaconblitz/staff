# Beaconblitz Staff - Sale Readiness Checklist

## Must finish before selling publicly

- Replace the temporary `kv_store` open anon policies with Supabase Auth and role-based RLS.
- Keep the Supabase `service_role` key only on a server, never inside `index.html`.
- Move profile photos and chat images from base64 database values to Supabase Storage.
- Add payment flow with Razorpay or Stripe and update each business `accountStatus`, `plan`, `staffLimit`, and expiry date after payment.
- Add automated database backup before onboarding paid customers.
- Host the app on HTTPS with your own domain.
- Create Terms, Privacy Policy, and location consent text for staff tracking.
- Test install/login/location/attendance on Android Chrome and iPhone Safari.

## Current seller controls added in app

- New businesses start on a 14-day Starter trial.
- Main admin can set business status: Trial, Active, Suspended, or Expired.
- Main admin can set plan, staff limit, trial expiry, subscription expiry, and seller notes.
- Admin/staff login is blocked when a business is suspended or expired.
- Adding staff is blocked when the business reaches its plan limit.
