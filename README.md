# Tessell Design System

Tessell Design System—a React-based component library built with scalability, developer experience, and design handoff in mind.

## Overview

Tessell Design System is a comprehensive UI component library that helps developers build beautiful and consistent user interfaces quickly. It provides a set of pre-built components, design tokens, and utilities that follow modern design principles.

## Features

- 🎨 Modern and accessible components
- ⚡️ Built with React and Vite for optimal performance
- 📦 Easy to integrate and customize
- 🎯 TypeScript support for better development experience
- 📱 Responsive design patterns
- 🎭 Theme customization support

## Getting Started

### Installation

```bash
npm install tessell-design-system
# or
yarn add tessell-design-system
```

### Usage

```jsx
import { Button } from 'tessell-design-system';

function App() {
    return <Button variant="primary">Click me</Button>;
}
```

## Development

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Setup

1. Clone the repository:

```bash
git clone https://github.com/your-username/tessell-design-system.git
cd tessell-design-system
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Start the development server:

```bash
npm run dev
# or
yarn dev
```

### Storybook

This project uses Storybook for component development and documentation. Storybook provides an interactive environment to develop and showcase components in isolation.

To start Storybook:

```bash
npm run storybook
# or
yarn storybook
```

This will start the Storybook server at `http://localhost:6006` by default.

Key Storybook features:

- 📚 Interactive component documentation
- 🎨 Visual testing and development
- 🔍 Component isolation
- 📱 Responsive testing
- 🎭 Theme switching
- 📝 Documentation with MDX

To add a new component story:

1. Create a new `.stories.tsx` file alongside your component
2. Write stories using the Component Story Format (CSF)
3. Add documentation using MDX if needed

Example story:

```tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
    title: 'Components/Button',
    component: Button,
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
    args: {
        variant: 'primary',
        children: 'Button',
    },
};
``;
```
