## ADDED Requirements

### Requirement: Right panel uses equal horizontal halves
The frontend SHALL split the right-side metadata panel into two equal horizontal halves within the available screen area.

#### Scenario: Equal top and bottom halves
- **WHEN** the dashboard is rendered at desktop width
- **THEN** the right panel MUST allocate equal vertical space to the top media half and the bottom metadata half

### Requirement: Top half contains equal Image and OCR sections
The frontend SHALL place Image and OCR Text in the upper half as two equal-width columns.

#### Scenario: Image/OCR horizontal split
- **WHEN** top half is rendered
- **THEN** Image and OCR Text sections MUST appear side-by-side with equal width

### Requirement: Lower half is divided into four equal metadata parts
The frontend SHALL render the remaining four metadata columns as equal-size cards in the lower half.

#### Scenario: Four equal metadata cards
- **WHEN** lower half is rendered
- **THEN** Change Description, Hierarchy Assessment, Validation Notes, and Change Reason MUST occupy four equal parts

### Requirement: Content wraps within screen area and avoids page-level vertical growth
The frontend SHALL prioritize text wrapping and contained overflow to keep the main panel within screen area rather than forcing additional page-level vertical scrolling.

#### Scenario: Long OCR/metadata content handling
- **WHEN** OCR or metadata text is long
- **THEN** content MUST wrap and remain contained inside panel/card boundaries

#### Scenario: Page-level scroll pressure is reduced
- **WHEN** layout is rendered with typical production payloads
- **THEN** the right panel MUST not create avoidable blank-space-plus-scroll behavior from uneven card expansion

### Requirement: Existing comparison behavior remains intact
The layout update SHALL NOT break Pre/Post controls, JSON toggles, bubble navigation, or focused-path highlighting.

#### Scenario: Pre/Post interactions still work
- **WHEN** users load and navigate Pre/Post panes
- **THEN** existing comparison interactions MUST function as before the layout adjustment
