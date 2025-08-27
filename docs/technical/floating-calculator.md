# Floating Calculator Component

## Overview

The Floating Calculator is a sticky, expandable loan calculator that appears on the left side of all pages. It provides quick access to loan calculations without navigating away from the current page.

## Features

### Sticky Positioning
- Fixed position on the left side of the screen
- Centered vertically for optimal visibility
- High z-index (z-50) to appear above other content

### Expandable Interface
- **Collapsed State**: Shows a compact button with calculator icon and "Calculators" text
- **Expanded State**: Reveals a full loan calculator form with all functionality

### Interactive Elements
- **Floating Button**: 
  - White background with primary color text
  - Rounded right corners for modern design
  - Hover effects with scale and shadow changes
  - Subtle pulse animation to draw attention
  - Responsive text (hidden on mobile for space)

- **Calculator Panel**:
  - Width: 320px on mobile, 384px on desktop
  - Maximum height: 90% of viewport height
  - Scrollable content for smaller screens
  - Gradient header with close button

## Functionality

### Loan Calculation
- **Property Type**: Residential (1-7 years) or Commercial (1-10 years)
- **Property Cost**: User input with automatic comma formatting
- **Down Payment**: Automatically calculated as 30% of property cost
- **Loan Term**: Dynamic options based on property type
- **Interest Rate**: Fixed at 12% per annum
- **Processing Fee**: Fixed at 2.5%
- **Monthly Salary**: Optional input for affordability recommendations

### Results Display
- Monthly payment amount (prominently displayed)
- Processing fee amount
- Total interest over loan term
- Personalized recommendations based on salary input

### User Experience Features
- **Click Outside**: Closes calculator when clicking outside the panel
- **Escape Key**: Closes calculator when pressing Escape
- **Touch Optimized**: Mobile-friendly with proper touch targets
- **Responsive Design**: Adapts to different screen sizes
- **Accessibility**: Proper ARIA labels and keyboard navigation

## Technical Implementation

### Component Structure
```tsx
src/components/FloatingCalculator.tsx
```

### State Management
- `isExpanded`: Controls panel visibility
- Form inputs for all calculator fields
- Calculation results and recommendations
- Input validation and formatting

### Event Handlers
- `handleInputChange`: Manages form input changes
- `calculateLoan`: Performs loan calculations
- `useEffect`: Handles side effects and updates

### Styling
- Tailwind CSS classes for consistent design
- Responsive breakpoints (sm: prefix)
- Gradient backgrounds matching brand colors
- Smooth transitions and hover effects

## Integration

### Layout Integration
The component is added to the root layout (`src/app/layout.tsx`) so it appears on all pages:

```tsx
import FloatingCalculator from '@/components/FloatingCalculator';

// In the layout component
<ClientWrapper>
  <ScrollToTop />
  <WhatsAppChat />
  <FloatingCalculator />
</ClientWrapper>
```

### Dependencies
- `lucide-react`: For calculator, close, and chevron icons
- React hooks: `useState`, `useRef`, `useEffect`
- Tailwind CSS: For styling and responsive design

## Customization

### Props
- `className`: Additional CSS classes for customization

### Styling
- Colors can be modified through Tailwind config
- Dimensions can be adjusted in the component
- Animation timing can be customized

### Functionality
- Calculator logic can be extended for additional features
- Form validation can be enhanced
- Additional calculation types can be added

## Browser Support

- Modern browsers with ES6+ support
- Responsive design for mobile and desktop
- Touch-friendly interface for mobile devices
- Keyboard navigation support

## Performance Considerations

- Component only renders when needed
- Event listeners are properly cleaned up
- Efficient state management with React hooks
- Minimal re-renders through proper dependency arrays

## Future Enhancements

- Save calculation history
- Export results to PDF
- Multiple calculation scenarios
- Integration with property listings
- Advanced loan comparison tools
