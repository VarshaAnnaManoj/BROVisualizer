## ADDED Requirements

### Requirement: Attachment placeholder labels SHALL be suppressed from the visible workflow
The system SHALL suppress non-actionable attachment placeholder labels (including "Pasted Image" and numbered variants such as "Pasted Image#3") from rendered user-visible comparison/dashboard content.

#### Scenario: Base placeholder label is present in source data
- **WHEN** the incoming content includes the attachment label "Pasted Image"
- **THEN** the UI does not render that label in the visible workflow

#### Scenario: Numbered placeholder variant is present in source data
- **WHEN** the incoming content includes a numbered variant such as "Pasted Image#3"
- **THEN** the UI does not render that label in the visible workflow

### Requirement: Suppression SHALL not remove valid domain content
The system MUST suppress only recognized placeholder attachment labels and SHALL keep normal business/domain text visible.

#### Scenario: Legitimate content is preserved
- **WHEN** the content contains regular ontology/category/capability text that is not a placeholder
- **THEN** the UI renders that content unchanged
