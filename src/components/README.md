# Components

This directory contains all the reusable UI components that make up the Tessell Design System. Each component is built with accessibility, reusability, and maintainability in mind.

## Available Components

- **Button**: Primary interaction component for user actions
- **Card**: Container component for grouping related content
- **HeaderCell**: Table header component for column headers
- **Input**: Form input component for user data entry
- **Layout**: Layout components for structuring page content
- **Link**: Navigation component for internal and external links
- **Progress**: Visual indicator for progress and loading states
- **Selection**: Components for selection interfaces (checkboxes, radio buttons)
- **Switch**: Toggle component for binary choices
- **Table**: Data display component for tabular information
- **TableCell**: Individual cell component for table data
- **Tag**: Label component for categorizing and organizing content

## Component Structure

Each component follows a consistent structure:

```
ComponentName/
├── ComponentName.tsx       # Main component implementation
├── ComponentName.stories.tsx # Storybook stories
├── ComponentName.test.tsx  # Component tests
├── ComponentName.types.ts  # TypeScript type definitions
└── index.ts               # Component exports
```

## Usage Guidelines

1. Import components from the main index:
```tsx
import { Button, Card, Input } from 'tessell-design-system';
```

2. Use components with their TypeScript props:
```tsx
<Button variant="primary" size="medium" onClick={handleClick}>
  Click Me
</Button>
```

## Component Development

When creating new components:

1. Follow the established component structure
2. Include comprehensive TypeScript types
3. Add Storybook stories for visual testing
4. Write unit tests for component behavior
5. Ensure accessibility compliance
6. Document props and usage examples

## Best Practices

- Keep components focused and single-responsibility
- Use TypeScript for type safety
- Implement proper error handling
- Follow accessibility guidelines
- Maintain consistent prop naming
- Use CSS-in-JS for styling
- Write clear component documentation 