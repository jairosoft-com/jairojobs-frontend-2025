# JairoJobs Design System - Tailwind CSS Edition

## Overview
A modern, minimalistic design system for JairoJobs built with Tailwind CSS. This system leverages Tailwind's utility-first approach to create consistent, scalable, and maintainable user interfaces.

## Design Philosophy

### 1. Utility-First Approach
- Use Tailwind's utility classes for maximum flexibility
- Compose complex components from simple utilities
- Maintain consistency through design tokens
- Enable rapid prototyping and development

### 2. Minimalism & Clarity
- Clean, uncluttered interfaces with generous whitespace
- Clear visual hierarchy through typography and spacing
- Intuitive user interactions and navigation patterns
- Focus on content and essential functionality

### 3. Accessibility & Performance
- Built-in accessibility features using semantic HTML
- High contrast ratios and keyboard navigation support
- Optimized for performance with minimal custom CSS
- Responsive design that works on all devices

## Color System

### Primary Colors
```css
/* Primary Brand Colors */
bg-primary        /* hsl(217, 91%, 60%) - Main brand color */
bg-primary/90     /* 90% opacity for hover states */
bg-primary/80     /* 80% opacity for pressed states */

/* Usage Examples */
<button class="bg-primary text-primary-foreground hover:bg-primary/90">
  Primary Button
</button>
```

### Neutral Colors
```css
/* Gray Scale */
bg-gray-50        /* Lightest backgrounds */
bg-gray-100       /* Light backgrounds */
bg-gray-200       /* Borders, dividers */
bg-gray-400       /* Borders, dividers */
bg-gray-600       /* Muted text, placeholders */
bg-gray-800       /* Secondary text */
bg-gray-950       /* Primary text, headers */

/* Usage Examples */
<div class="bg-gray-50 border border-gray-200">
  <h2 class="text-gray-950">Heading</h2>
  <p class="text-gray-600">Muted text content</p>
</div>
```

### Semantic Colors
```css
/* Success, Warning, Error */
bg-success        /* hsl(142, 76%, 36%) - Success states */
bg-warning        /* hsl(38, 92%, 50%) - Warning states */
bg-destructive    /* hsl(346, 87%, 43%) - Error states */

/* Usage Examples */
<div class="bg-success text-success-foreground">Success message</div>
<div class="bg-warning text-warning-foreground">Warning message</div>
<div class="bg-destructive text-destructive-foreground">Error message</div>
```

## Typography System

### Headings
```css
/* Heading Classes */
.h1, h1    /* text-4xl lg:text-5xl font-semibold */
.h2, h2    /* text-3xl font-semibold */
.h3, h3    /* text-xl font-semibold */
.h4, h4    /* text-lg font-semibold */

/* Usage Examples */
<h1 class="text-4xl lg:text-5xl font-semibold">Main Page Title</h1>
<h2 class="text-3xl font-semibold">Section Header</h2>
<h3 class="text-xl font-semibold">Subsection Title</h3>
```

### Body Text
```css
/* Body Text Classes */
text-base         /* Default body text (16px) */
text-lg           /* Lead text (18px) */
text-sm           /* Small text (14px) */
text-xs           /* Caption text (12px) */

/* Text Variants */
text-muted-foreground  /* Muted text color */
text-lead             /* Lead paragraph styling */

/* Usage Examples */
<p class="text-lg text-muted-foreground">Lead paragraph text</p>
<p class="text-base">Regular body text</p>
<small class="text-sm text-muted-foreground">Caption text</small>
```

### Font Weights
```css
font-normal       /* 400 - Regular text */
font-medium       /* 500 - Emphasis */
font-semibold     /* 600 - Headings, buttons */
font-bold         /* 700 - Strong emphasis */
```

## Spacing System

### Padding & Margin
```css
/* Base spacing scale (4px increments) */
p-1     /* 4px */
p-2     /* 8px */
p-3     /* 12px */
p-4     /* 16px */
p-6     /* 24px */
p-8     /* 32px */
p-12    /* 48px */
p-16    /* 64px */
p-24    /* 96px */

/* Usage Examples */
<div class="p-6 mb-4">Card with padding</div>
<div class="px-4 py-2">Button padding</div>
<section class="py-16">Section spacing</section>
```

### Layout Spacing
```css
/* Gap for flexbox and grid */
gap-4     /* 16px */
gap-6     /* 24px */
gap-8     /* 32px */

/* Space between elements */
space-y-4  /* 16px vertical spacing */
space-x-6  /* 24px horizontal spacing */

/* Usage Examples */
<div class="flex gap-4">Flexbox with gap</div>
<div class="space-y-6">Stacked elements</div>
```

## Component Patterns

### Buttons
```css
/* Primary Button */
<button class="bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-3 rounded-md font-medium transition-colors">
  Primary Action
</button>

/* Secondary Button */
<button class="bg-secondary text-secondary-foreground hover:bg-secondary/80 px-6 py-3 rounded-md font-medium transition-colors">
  Secondary Action
</button>

/* Outline Button */
<button class="border border-input bg-background hover:bg-accent hover:text-accent-foreground px-6 py-3 rounded-md font-medium transition-colors">
  Outline Button
</button>
```

### Cards
```css
/* Standard Card */
<div class="bg-card text-card-foreground border border-border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
  <h3 class="font-semibold mb-2">Card Title</h3>
  <p class="text-muted-foreground">Card content</p>
</div>

/* Interactive Card */
<div class="bg-card text-card-foreground border border-border rounded-lg p-6 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer">
  Interactive card content
</div>
```

### Form Elements
```css
/* Input Field */
<input class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">

/* Label */
<label class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
  Field Label
</label>

/* Select */
<select class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
  <option>Option 1</option>
</select>
```

## Layout System

### Container
```css
/* Container with max-width and padding */
<div class="container mx-auto px-4 sm:px-6 lg:px-8">
  Content within container
</div>

/* Custom container sizes */
<div class="max-w-4xl mx-auto px-4">Narrow container</div>
<div class="max-w-7xl mx-auto px-4">Wide container</div>
```

### Grid System
```css
/* Responsive grid */
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  <div>Grid item</div>
  <div>Grid item</div>
  <div>Grid item</div>
</div>

/* Flexbox layout */
<div class="flex flex-col lg:flex-row gap-8">
  <div class="flex-1">Main content</div>
  <div class="lg:w-80">Sidebar</div>
</div>
```

### Responsive Breakpoints
```css
/* Tailwind breakpoints */
sm:   /* 640px and up */
md:   /* 768px and up */
lg:   /* 1024px and up */
xl:   /* 1280px and up */
2xl:  /* 1536px and up */

/* Usage Examples */
<div class="text-sm md:text-base lg:text-lg">Responsive text</div>
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">Responsive grid</div>
```

## Component Specifications

### Job Card
```css
<div class="bg-card border border-border rounded-lg p-6 shadow-sm hover:shadow-lg transition-shadow duration-300">
  <div class="flex items-start space-x-3 mb-4">
    <div class="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
      <!-- Company logo -->
    </div>
    <div class="flex-1">
      <h3 class="font-semibold text-gray-950 mb-1">Job Title</h3>
      <p class="text-gray-600 mb-2">Company Name</p>
      <div class="flex items-center gap-4 text-sm text-gray-600">
        <span>Location</span>
        <span>Job Type</span>
        <span>Salary</span>
      </div>
    </div>
  </div>
</div>
```

### Search Bar
```css
<div class="bg-white rounded-lg shadow-lg p-6">
  <div class="grid grid-cols-1 lg:grid-cols-12 gap-4">
    <div class="lg:col-span-5">
      <input class="w-full h-12 px-4 pl-10 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent" placeholder="Job title or keywords">
    </div>
    <div class="lg:col-span-4">
      <input class="w-full h-12 px-4 pl-10 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent" placeholder="Location">
    </div>
    <div class="lg:col-span-3">
      <button class="w-full h-12 bg-primary text-primary-foreground rounded-md font-medium hover:bg-primary-dark transition-colors">
        Search Jobs
      </button>
    </div>
  </div>
</div>
```

## Animation & Transitions

### Hover Effects
```css
/* Button hover */
hover:bg-primary/90      /* Color transition with opacity */
hover:shadow-lg          /* Shadow transition */
hover:scale-105          /* Scale effect */

/* Card hover */
hover:shadow-md          /* Subtle shadow */
hover:shadow-lg          /* Pronounced shadow */
hover:-translate-y-1     /* Lift effect */
```

### Transitions
```css
transition-colors        /* Color transitions */
transition-shadow        /* Shadow transitions */
transition-transform     /* Transform transitions */
transition-all           /* All properties */

/* Duration */
duration-150            /* 150ms */
duration-300            /* 300ms */
duration-500            /* 500ms */
```

### Custom Animations
```css
animate-fade-in         /* Fade in animation */
animate-slide-up        /* Slide up animation */
animate-scale-in        /* Scale in animation */
```

## Accessibility Guidelines

### Focus States
```css
/* Focus ring for interactive elements */
focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:outline-none

/* High contrast focus for better visibility */
focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2
```

### Color Contrast
```css
/* Ensure minimum 4.5:1 contrast ratio */
text-gray-950 on bg-white        /* High contrast */
text-gray-600 on bg-white        /* Medium contrast */
text-primary-foreground on bg-primary  /* Brand contrast */
```

### Keyboard Navigation
```css
/* Keyboard accessible interactive elements */
<button class="focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:outline-none">
  Keyboard accessible button
</button>
```

## Dark Mode Support

### Dark Mode Classes
```css
/* Dark mode variants */
dark:bg-gray-900        /* Dark background */
dark:text-white         /* Dark text */
dark:border-gray-700    /* Dark borders */

/* Usage Examples */
<div class="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
  Content that adapts to dark mode
</div>
```

## Performance Optimization

### Utility Class Purging
- Tailwind automatically purges unused classes in production
- Use dynamic class names carefully to avoid purging issues
- Use safelist for dynamic classes that might be purged

### Custom Components
- Use `@layer components` for reusable component patterns
- Keep custom CSS minimal and leverage Tailwind utilities
- Use CSS custom properties for dynamic theming

## Implementation Guidelines

### File Organization
```
styles/
├── globals.css          # Base styles and custom utilities
└── components/          # Component-specific styles (if needed)
```

### Class Naming Conventions
```css
/* Component classes */
.card-hover             /* Reusable component utilities */
.btn-primary           /* Button variants */
.gradient-primary      /* Brand gradients */

/* Utility classes */
.line-clamp-2          /* Custom utilities */
.focus-ring            /* Accessibility helpers */
```

### Best Practices
1. **Compose utilities**: Build complex components from simple utilities
2. **Use design tokens**: Leverage Tailwind's color and spacing scales
3. **Maintain consistency**: Use consistent patterns across components
4. **Optimize for performance**: Minimize custom CSS and use Tailwind's built-in optimizations
5. **Test accessibility**: Ensure all interactive elements are keyboard accessible
6. **Document patterns**: Create reusable component patterns for common UI elements