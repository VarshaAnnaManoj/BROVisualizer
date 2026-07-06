## ADDED Requirements

### Requirement: Metadata Image Toggle Expansion
The system SHALL allow the user to click the metadata image to toggle between default panel view and expanded view.

#### Scenario: Expand image from default state
- **WHEN** the user clicks the metadata image while it is in default panel size
- **THEN** the system shows the same image in an expanded overlay/modal view
- **AND** the current compare context (selected IDs/version and loaded data) remains unchanged

#### Scenario: Contract image from expanded state
- **WHEN** the user clicks the expanded image or close control
- **THEN** the system returns the image to its original metadata panel size
- **AND** the metadata panel content remains visible and consistent

### Requirement: Expanded Image Accessibility and Responsiveness
The system SHALL provide accessible and responsive behavior for expanded image mode.

#### Scenario: Keyboard close behavior
- **WHEN** the user presses Escape while the image is expanded
- **THEN** the system closes expanded mode and restores default image display

#### Scenario: Viewport fit behavior
- **WHEN** the image is expanded on a small or large viewport
- **THEN** the system constrains image dimensions to fit within the viewport without clipping critical controls
