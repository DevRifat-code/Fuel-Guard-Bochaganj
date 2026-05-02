# Security Specification - Bochaganj Fuel Distribution Management System

## Data Invariants
1. A transaction must reference a valid user and a valid pump.
2. Only managers and admins can create transactions.
3. Users can only read their own profile.
4. Admins have full read/write access to all collections except potentially sensitive system fields if restricted.
5. Fuel prices can only be updated by admins.
6. User roles can only be updated by admins (specifically super-admins in the app logic, but rules should restrict it to admins).
7. Cooldown must be respected (enforced via app logic, but rules could potentially check if it's being bypassed if we used batch writes or something complex, but for now we rely on manager's role).

## The "Dirty Dozen" Payloads (to be rejected)
1. **Self-Promotion:** A user attempting to set their role to 'admin' during signup.
2. **Shadow Field:** Adding `isApproved: true` during signup.
3. **Identity Spoofing:** Creating a transaction with someone else's `userId`.
4. **Price Poisoning:** A non-admin user updating `settings/fuelPrices`.
5. **Station Hijack:** A non-admin user creating or deleting a `pumps` document.
6. **Log Manipulation:** A user trying to delete a transaction record.
7. **Role Escalation:** A manager trying to change their own role to 'admin'.
8. **Invalid Data Type:** Setting `amountBdt` to a string.
9. **Massive Payload:** Injecting a 1MB string into a pump name.
10. **ID Poisoning:** Using a very long and strange ID for a new pump.
11. **Future Timestamp:** Setting `timestamp` to a future date manually (from client).
12. **Unauthorized Approval:** A non-admin user approving themselves or others.

## Test Cases (Draft)
- `users/{uid}`: `create` should fail if role != 'user' or isApproved == true.
- `users/{uid}`: `update` should fail if non-admin tries to change `role` or `isApproved`.
- `transactions`: `create` should fail if `request.auth.uid` doesn't have 'manager' or 'admin' role.
- `settings/fuelPrices`: `update` should fail if `request.auth.uid` doesn't have 'admin' role.
