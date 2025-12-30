/**
 * Button Component Tests
 * Tests for UI button component with variants, sizes, and states
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@/test/utils';
import Button from '../Button';

describe('Button Component', () => {
  describe('Rendering', () => {
    it('should render button with text', () => {
      render(<Button>Click me</Button>);

      expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument();
    });

    it('should render with children', () => {
      render(
        <Button>
          <span>Custom Content</span>
        </Button>
      );

      expect(screen.getByText('Custom Content')).toBeInTheDocument();
    });

    it('should apply custom className', () => {
      render(<Button className="custom-class">Button</Button>);

      const button = screen.getByRole('button');
      expect(button).toHaveClass('custom-class');
    });

    it('should forward ref correctly', () => {
      const ref = { current: null as HTMLButtonElement | null };
      render(<Button ref={ref}>Button</Button>);

      expect(ref.current).toBeInstanceOf(HTMLButtonElement);
    });
  });

  describe('Variants', () => {
    it('should render primary variant by default', () => {
      render(<Button>Primary</Button>);

      const button = screen.getByRole('button');
      expect(button).toHaveClass('bg-[#2563EB]');
    });

    it('should render secondary variant', () => {
      render(<Button variant="secondary">Secondary</Button>);

      const button = screen.getByRole('button');
      expect(button).toHaveClass('bg-[#0F766E]');
    });

    it('should render ghost variant', () => {
      render(<Button variant="ghost">Ghost</Button>);

      const button = screen.getByRole('button');
      expect(button).toHaveClass('bg-transparent');
    });

    it('should render danger variant', () => {
      render(<Button variant="danger">Danger</Button>);

      const button = screen.getByRole('button');
      expect(button).toHaveClass('bg-[#DC2626]');
    });
  });

  describe('Sizes', () => {
    it('should render medium size by default', () => {
      render(<Button>Medium</Button>);

      const button = screen.getByRole('button');
      expect(button).toHaveClass('px-4', 'py-2', 'text-base');
    });

    it('should render small size', () => {
      render(<Button size="sm">Small</Button>);

      const button = screen.getByRole('button');
      expect(button).toHaveClass('px-3', 'py-1.5', 'text-sm');
    });

    it('should render large size', () => {
      render(<Button size="lg">Large</Button>);

      const button = screen.getByRole('button');
      expect(button).toHaveClass('px-6', 'py-3', 'text-lg');
    });
  });

  describe('Icons', () => {
    it('should render icon on the left by default', () => {
      const icon = <svg data-testid="test-icon" />;
      render(<Button icon={icon}>With Icon</Button>);

      const button = screen.getByRole('button');
      const iconElement = screen.getByTestId('test-icon');

      // Icon should be before text
      const buttonChildren = Array.from(button.childNodes);
      const iconIndex = buttonChildren.findIndex((node) =>
        node.contains(iconElement)
      );
      expect(iconIndex).toBeLessThan(
        buttonChildren.findIndex((node) => node.textContent === 'With Icon')
      );
    });

    it('should render icon on the right', () => {
      const icon = <svg data-testid="test-icon" />;
      render(
        <Button icon={icon} iconPosition="right">
          With Icon
        </Button>
      );

      const button = screen.getByRole('button');
      const iconElement = screen.getByTestId('test-icon');

      // Icon should be after text
      const buttonChildren = Array.from(button.childNodes);
      const iconIndex = buttonChildren.findIndex((node) =>
        node.contains(iconElement)
      );
      expect(iconIndex).toBeGreaterThan(
        buttonChildren.findIndex((node) => node.textContent === 'With Icon')
      );
    });

    it('should render icon without text', () => {
      const icon = <svg data-testid="test-icon" />;
      render(<Button icon={icon} />);

      expect(screen.getByTestId('test-icon')).toBeInTheDocument();
    });
  });

  describe('Full Width', () => {
    it('should not be full width by default', () => {
      render(<Button>Normal Width</Button>);

      const button = screen.getByRole('button');
      expect(button).not.toHaveClass('w-full');
    });

    it('should render full width when specified', () => {
      render(<Button fullWidth>Full Width</Button>);

      const button = screen.getByRole('button');
      expect(button).toHaveClass('w-full');
    });
  });

  describe('Disabled State', () => {
    it('should render disabled button', () => {
      render(<Button disabled>Disabled</Button>);

      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
      expect(button).toHaveClass('disabled:opacity-50');
    });

    it('should not call onClick when disabled', () => {
      const handleClick = vi.fn();
      render(
        <Button disabled onClick={handleClick}>
          Disabled
        </Button>
      );

      const button = screen.getByRole('button');
      fireEvent.click(button);

      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  describe('Click Handlers', () => {
    it('should call onClick handler', () => {
      const handleClick = vi.fn();
      render(<Button onClick={handleClick}>Click me</Button>);

      const button = screen.getByRole('button');
      fireEvent.click(button);

      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('should pass event to onClick handler', () => {
      const handleClick = vi.fn();
      render(<Button onClick={handleClick}>Click me</Button>);

      const button = screen.getByRole('button');
      fireEvent.click(button);

      expect(handleClick).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'click',
        })
      );
    });

    it('should handle multiple clicks', () => {
      const handleClick = vi.fn();
      render(<Button onClick={handleClick}>Click me</Button>);

      const button = screen.getByRole('button');
      fireEvent.click(button);
      fireEvent.click(button);
      fireEvent.click(button);

      expect(handleClick).toHaveBeenCalledTimes(3);
    });
  });

  describe('HTML Button Attributes', () => {
    it('should accept type attribute', () => {
      render(<Button type="submit">Submit</Button>);

      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('type', 'submit');
    });

    it('should accept aria-label', () => {
      render(<Button aria-label="Close dialog">×</Button>);

      const button = screen.getByRole('button', { name: 'Close dialog' });
      expect(button).toBeInTheDocument();
    });

    it('should accept data attributes', () => {
      render(<Button data-testid="custom-button">Button</Button>);

      expect(screen.getByTestId('custom-button')).toBeInTheDocument();
    });

    it('should accept form attribute', () => {
      render(<Button form="my-form">Submit</Button>);

      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('form', 'my-form');
    });
  });

  describe('Focus Management', () => {
    it('should be focusable', () => {
      render(<Button>Focusable</Button>);

      const button = screen.getByRole('button');
      button.focus();

      expect(button).toHaveFocus();
    });

    it('should have focus styles', () => {
      render(<Button>Focusable</Button>);

      const button = screen.getByRole('button');
      expect(button).toHaveClass('focus:outline-none', 'focus:ring-2');
    });

    it('should not be focusable when disabled', () => {
      render(<Button disabled>Not Focusable</Button>);

      const button = screen.getByRole('button');
      button.focus();

      expect(button).not.toHaveFocus();
    });
  });

  describe('Accessibility', () => {
    it('should have button role', () => {
      render(<Button>Accessible</Button>);

      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('should support aria-disabled', () => {
      render(<Button aria-disabled="true">Disabled</Button>);

      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-disabled', 'true');
    });

    it('should support aria-pressed for toggle buttons', () => {
      render(<Button aria-pressed="true">Toggle</Button>);

      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-pressed', 'true');
    });
  });

  describe('Combined Props', () => {
    it('should handle variant + size + fullWidth', () => {
      render(
        <Button variant="secondary" size="lg" fullWidth>
          Combined
        </Button>
      );

      const button = screen.getByRole('button');
      expect(button).toHaveClass('bg-[#0F766E]'); // secondary variant
      expect(button).toHaveClass('px-6', 'py-3'); // lg size
      expect(button).toHaveClass('w-full'); // fullWidth
    });

    it('should handle variant + icon + disabled', () => {
      const icon = <svg data-testid="icon" />;
      const handleClick = vi.fn();

      render(
        <Button variant="danger" icon={icon} disabled onClick={handleClick}>
          Delete
        </Button>
      );

      const button = screen.getByRole('button');
      expect(button).toHaveClass('bg-[#DC2626]'); // danger variant
      expect(screen.getByTestId('icon')).toBeInTheDocument();
      expect(button).toBeDisabled();

      fireEvent.click(button);
      expect(handleClick).not.toHaveBeenCalled();
    });
  });
});
