# Design Retionale

## Why SQLite?

- Lightweight
- Easy for local development

## Architecture CHoice

- React for component-based UI
- Express for clear REST routing

## State Management

- Local React state since app size is small
- `componentDidMount` used to fetch tasks initially

## Data Flow

Frontend:

- From validates before POST
- Checkbox triggers PUT -> refresh list

Backend:

- REST API handles CRUD
- SQLite stores tasks with fields:
  (id, title, description, priority, dueDate, ststus)

## UI

- clean interface
- Checkbox for status toggle
- Error message for empty fields
