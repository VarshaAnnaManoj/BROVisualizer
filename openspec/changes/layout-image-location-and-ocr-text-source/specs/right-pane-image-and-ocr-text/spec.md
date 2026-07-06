## ADDED Requirements

### Requirement: Ontology API exposes media and OCR source fields
The system SHALL expose location and ocr_text in ontology record responses and SHALL preserve existing response fields used by the Pre/Post comparison UI.

#### Scenario: Response includes required source fields
- **WHEN** a client requests an ontology record
- **THEN** the response MUST include location and ocr_text fields in addition to existing ontology payload fields

#### Scenario: Backward-compatible image binding
- **WHEN** the ontology record contains a non-empty location value
- **THEN** the response MUST provide an image binding compatible with existing image_url consumers

### Requirement: Right pane renders redesigned media and OCR sections
The frontend SHALL render the redesigned right pane with an Image section sourced from location and an OCR Text section sourced from ocr_text.

#### Scenario: Image panel uses location source
- **WHEN** the API response contains location
- **THEN** the right pane image section MUST render using that location value as the source

#### Scenario: OCR panel uses ocr_text source
- **WHEN** the API response contains ocr_text
- **THEN** the right pane OCR section MUST display that text content

### Requirement: Right pane remains stable when data is missing
The frontend SHALL preserve layout integrity and display explicit fallback content when location or ocr_text is missing.

#### Scenario: Missing location fallback
- **WHEN** location is null, empty, or invalid for rendering
- **THEN** the image section MUST show a readable fallback state without collapsing layout

#### Scenario: Missing OCR text fallback
- **WHEN** ocr_text is null or empty
- **THEN** the OCR section MUST show a readable fallback message and maintain panel dimensions

### Requirement: Existing comparison and metadata behavior is preserved
The redesign SHALL NOT break Pre/Post pane loading, diff navigation bubbles, or metadata card rendering.

#### Scenario: Comparison behavior remains operational
- **WHEN** users load Pre/Post ontology versions and interact with bubble actions
- **THEN** comparison interactions MUST continue to function as before the right-pane redesign

#### Scenario: Metadata cards remain visible and mapped
- **WHEN** the redesigned right pane is rendered
- **THEN** metadata cards MUST still display mapped values for change description, hierarchy assessment, validation notes, and change reason
