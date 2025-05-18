# Styles

This directory contains the core styling system for the Tessell Design System. It includes theme definitions, typography, colors, and utility styles.

## Style Files

- **color.css**: Color palette and theme variables
- **default-theme.css**: Default theme configuration
- **grid.css**: Grid system and layout utilities
- **main.css**: Global styles and CSS reset
- **normalise.css**: CSS normalization for consistent rendering
- **typography.css**: Typography system and text styles

## Theme System

The design system uses a CSS variables-based theming system that allows for:

- Light and dark mode support
- Custom theme overrides
- Consistent spacing and sizing
- Responsive design utilities

## Usage

1. Import the required style files in your application:

```tsx
import 'tessell-design-system/styles/main.css';
import 'tessell-design-system/styles/typography.css';
```

2. Use CSS variables in your components:

```css
.my-component {
  color: var(--tessell-color-primary);
  font-family: var(--tessell-font-family);
  padding: var(--tessell-spacing-md);
}
```

## Customization

To customize the theme:

1. Override CSS variables in your application:

```css
:root {
  --tessell-color-primary: #your-color;
  --tessell-font-family: 'Your Font', sans-serif;
}
```

2. Use the theme provider component for dynamic theme switching:

```tsx
import { ThemeProvider } from 'tessell-design-system';

<ThemeProvider theme={customTheme}>
  <YourApp />
</ThemeProvider>
```

## Best Practices

- Use CSS variables for theme values
- Follow the established naming conventions
- Maintain consistent spacing and sizing
- Consider accessibility in color choices
- Use responsive design patterns
- Keep styles modular and reusable 