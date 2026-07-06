## 1. Frontend ID Input and Validation

- [x] 1.1 Add a controlled ontology id input in the viewer toolbar or controls section.
- [x] 1.2 Implement validation to allow only positive integer ids before triggering data fetch.
- [x] 1.3 Show clear validation error messaging when user input is empty, non-numeric, zero, or negative.

## 2. Dynamic Data Loading

- [x] 2.1 Replace hardcoded ontology id usage with selected input id in /api/ontology/{id} fetch flow.
- [x] 2.2 Ensure metadata fetch uses the same selected id via /api/ontology/{id}/metadata.
- [x] 2.3 Handle 404 not-found responses with user-friendly feedback while keeping UI responsive.

## 3. Verification

- [x] 3.1 Verify entering id 389 loads ontology JSON and metadata in the viewer.
- [x] 3.2 Verify invalid and non-existent ids display expected error behavior without app crash.
- [x] 3.3 Confirm no backend endpoint or schema changes are required for this feature.

## Verification Notes

- UI includes ontology id textbox and Load ID control; id 389 loads ontology JSON and metadata successfully.
- Invalid input example `abc` shows: `Enter a valid positive integer ontology ID.`
- Non-existent id example `999999999` shows: `Ontology record not found for id=999999999.` while retaining prior valid viewer content.
- Dynamic API usage confirmed through frontend proxy: /api/ontology/{id} and /api/ontology/{id}/metadata.
- Backend remains unchanged for this feature (no endpoint or schema modifications required).
