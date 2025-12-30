# UI Component Library

Core UI components for Netter's Anatomy Learning Tool, built with React, TypeScript, and Tailwind CSS.

## Components

### Button

Multi-variant button component with icon support.

**Variants:** `primary`, `secondary`, `ghost`, `danger`
**Sizes:** `sm`, `md`, `lg`
**States:** default, hover, active, disabled

```tsx
import { Button } from '@/components/ui';

<Button variant="primary" size="md">
  Click me
</Button>

<Button variant="secondary" icon={<Icon />} iconPosition="left">
  With Icon
</Button>
```

**Props:**
- `variant?: 'primary' | 'secondary' | 'ghost' | 'danger'` - Visual style (default: 'primary')
- `size?: 'sm' | 'md' | 'lg'` - Button size (default: 'md')
- `icon?: React.ReactNode` - Icon element
- `iconPosition?: 'left' | 'right'` - Icon placement (default: 'left')
- `fullWidth?: boolean` - Stretch to container width
- All standard HTML button attributes

---

### Card

Container component for displaying anatomical structure information.

**States:** default, hover, selected

```tsx
import { Card, Badge } from '@/components/ui';

<Card
  title="Biceps Brachii"
  subtitle="Primary flexor of the elbow"
  badge={<Badge type="muscle" />}
  bookmarked={true}
  selected={false}
  onClick={() => handleSelect()}
/>
```

**Props:**
- `title: string` - Card title (required)
- `subtitle?: string` - Secondary text
- `badge?: React.ReactNode` - Badge component (typically structure type)
- `icon?: React.ReactNode` - Leading icon
- `bookmarked?: boolean` - Show bookmark indicator
- `selected?: boolean` - Highlight as selected
- `onClick?: () => void` - Click handler
- `children?: React.ReactNode` - Additional content

---

### Modal

Accessible modal dialog with focus trap and backdrop.

**Sizes:** `sm` (320px), `md` (480px), `lg` (800px)
**Features:** Focus trap, escape key handling, body scroll lock, backdrop click

```tsx
import { Modal } from '@/components/ui';

<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  size="md"
  title="Structure Details"
>
  <p>Modal content here...</p>
</Modal>
```

**Props:**
- `isOpen: boolean` - Visibility state (required)
- `onClose: () => void` - Close handler (required)
- `size?: 'sm' | 'md' | 'lg'` - Modal width (default: 'md')
- `title?: string` - Header title
- `showCloseButton?: boolean` - Show close X button (default: true)
- `children: React.ReactNode` - Modal content (required)

**Accessibility:**
- Traps focus within modal
- Restores focus on close
- Escape key closes modal
- Backdrop click closes modal
- ARIA attributes for screen readers

---

### Badge

Visual indicator for anatomical structure types using system colors.

**Types:** `bone`, `muscle`, `nerve`, `artery`, `vein`, `organ`, `ligament`, `fascia`, `other`
**Sizes:** `sm`, `md`

```tsx
import { Badge } from '@/components/ui';

<Badge type="muscle" />
<Badge type="nerve" label="Cranial Nerve" size="sm" />
```

**Props:**
- `type: StructureType` - Structure type (required)
- `label?: string` - Custom label (defaults to type name)
- `size?: 'sm' | 'md'` - Badge size (default: 'md')

**System Colors:**
- Bone: `#F5F0E6` (Ivory)
- Muscle: `#C45C5C` (Muted red)
- Nerve: `#E6C744` (Yellow)
- Artery: `#D64545` (Red)
- Vein: `#4571D6` (Blue)
- Organ: `#7E57C2` (Purple)
- Ligament: `#8D9E78` (Sage)
- Fascia: `#B8A99A` (Tan)

---

### Tabs

Tabbed interface for organizing content panels.

**Use Case:** Annotation panel (Overview, Description, Relationships, Clinical, References)

```tsx
import { Tabs } from '@/components/ui';

const tabs = [
  { id: 'overview', label: 'Overview', content: <div>Overview content</div> },
  { id: 'description', label: 'Description', content: <div>Description</div>, icon: <Icon /> },
  { id: 'clinical', label: 'Clinical', content: <div>Clinical notes</div>, badge: 3 },
];

<Tabs tabs={tabs} defaultTab="overview" onChange={(id) => console.log(id)} />
```

**Props:**
- `tabs: Tab[]` - Array of tab configurations (required)
- `defaultTab?: string` - Initially active tab ID
- `onChange?: (tabId: string) => void` - Tab change callback

**Tab Configuration:**
- `id: string` - Unique identifier (required)
- `label: string` - Tab label text (required)
- `content: React.ReactNode` - Tab panel content (required)
- `icon?: React.ReactNode` - Optional icon
- `badge?: number` - Optional notification count

---

### ProgressBar

Linear and circular progress indicators.

**Variants:** `linear`, `circular`
**Sizes:** `sm`, `md`, `lg`
**Colors:** `primary`, `success`, `warning`

```tsx
import { ProgressBar } from '@/components/ui';

// Linear
<ProgressBar value={75} variant="linear" showLabel label="Chapter Progress" />

// Circular
<ProgressBar value={42} variant="circular" size="lg" color="success" />
```

**Props:**
- `value: number` - Progress value 0-100 (required)
- `variant?: 'linear' | 'circular'` - Display style (default: 'linear')
- `size?: 'sm' | 'md' | 'lg'` - Component size (default: 'md')
- `showLabel?: boolean` - Show percentage text
- `label?: string` - Descriptive label
- `color?: 'primary' | 'success' | 'warning'` - Color theme (default: 'primary')

---

### Tooltip

Contextual information on hover/focus.

**Positions:** `top`, `bottom`, `left`, `right`
**Features:** Automatic viewport positioning, configurable delay

```tsx
import { Tooltip } from '@/components/ui';

<Tooltip content="This is the biceps brachii muscle" position="top" delay={200}>
  <button>Hover me</button>
</Tooltip>
```

**Props:**
- `content: React.ReactNode` - Tooltip content (required)
- `children: React.ReactElement` - Trigger element (required)
- `position?: 'top' | 'bottom' | 'left' | 'right'` - Preferred position (default: 'top')
- `delay?: number` - Show delay in ms (default: 200)

**Accessibility:**
- Keyboard accessible (shows on focus)
- Uses ARIA `aria-describedby`
- Automatically repositions to stay in viewport

---

### Input

Text input with search variant and autocomplete support.

**Variants:** `default`, `search`
**Features:** Icons, error states, helper text, clear button (search)

```tsx
import { Input, Autocomplete } from '@/components/ui';

// Basic input
<Input
  label="Structure name"
  placeholder="Enter name..."
  error="Required field"
  fullWidth
/>

// Search input
<Input
  variant="search"
  placeholder="Search structures..."
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
  onClear={() => setSearchTerm('')}
/>

// Autocomplete
<Autocomplete
  options={[
    { id: '1', label: 'Biceps Brachii', subtitle: 'Muscle - Upper Arm' },
    { id: '2', label: 'Triceps Brachii', subtitle: 'Muscle - Upper Arm' }
  ]}
  onSelect={(option) => console.log(option)}
  placeholder="Search structures..."
/>
```

**Input Props:**
- `label?: string` - Input label
- `error?: string` - Error message
- `helperText?: string` - Helper text below input
- `leftIcon?: React.ReactNode` - Left icon
- `rightIcon?: React.ReactNode` - Right icon
- `variant?: 'default' | 'search'` - Input style (default: 'default')
- `fullWidth?: boolean` - Full width
- `onClear?: () => void` - Clear button handler (search variant)
- All standard HTML input attributes

**Autocomplete Props:**
- `options: AutocompleteOption[]` - Selectable options (required)
- `onChange?: (value: string) => void` - Input change handler
- `onSelect?: (option: AutocompleteOption) => void` - Option selection handler
- `filterOptions?: (options, inputValue) => AutocompleteOption[]` - Custom filter function
- All Input props

**Accessibility:**
- Keyboard navigation (arrow keys, enter, escape)
- ARIA combobox pattern
- Screen reader announcements
- Error association

---

## Design System Colors

```css
Primary:       #2563EB (Blue)
Secondary:     #0F766E (Teal)
Background:    #FAFAFA (Off-white)
Text:          #1F2937 (Dark gray)
Success:       #059669 (Green)
Warning:       #D97706 (Amber)
Error:         #DC2626 (Red)
```

## Animations

All components use consistent animation timing:

- **Navigation:** 150ms ease-out (slide)
- **Modal:** 200ms ease-out (fade + scale)
- **Panel expand/collapse:** 250ms ease-in-out
- **Button press:** 100ms (scale 98%)
- **Tooltip:** 150ms ease-out

## Accessibility

All components follow WCAG 2.1 Level AA standards:

- **Keyboard navigation:** Full support for all interactive elements
- **Focus indicators:** Visible 2px ring on focus
- **ARIA attributes:** Proper roles, states, and properties
- **Color contrast:** Minimum 4.5:1 for text, 3:1 for UI components
- **Screen reader support:** Semantic HTML and ARIA labels
- **Touch targets:** Minimum 44x44px for interactive elements

## Usage

```tsx
import {
  Button,
  Card,
  Modal,
  Badge,
  Tabs,
  ProgressBar,
  Tooltip,
  Input,
  Autocomplete
} from '@/components/ui';
```

## TypeScript Support

All components are fully typed with TypeScript interfaces exported alongside components.

```tsx
import type { ButtonProps, CardProps, ModalProps } from '@/components/ui';
```
