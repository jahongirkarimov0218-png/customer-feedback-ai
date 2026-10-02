# Границы интерфейсов (Linear/Raycast UI)

## 1. UI Components
- `Header`: Minimal branding, theme toggle, zero tech badges.
- `Footer`: Clean copyright, minimal links, zero tech badges.
- `Presets`: Horizontal chip pills:
  - Props: `onSelect: (text: string) => void`, `activePreset?: string`, `disabled?: boolean`
- `FeedbackInput`:
  - Props: `onSubmit: (text: string) => void`, `isLoading: boolean`, `value: string`, `onChange: (value: string) => void`
- `ResultsDashboard` (`SummaryCard`, `SentimentCard`, `TopInsights`, `ProblemsTable`, `EvidenceModal`):
  - Preserved contracts for `AnalysisResponse`
- `Page`:
  - Clean pipeline: Hero -> Presets Chips -> FeedbackInput -> ResultsDashboard.
