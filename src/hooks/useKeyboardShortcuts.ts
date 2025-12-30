/**
 * useKeyboardShortcuts - Keyboard navigation hook
 * Provides keyboard shortcut handling with modifier key support
 */

import { useEffect, useCallback, useRef } from 'react';

export interface KeyboardShortcut {
  key: string;
  ctrl?: boolean;
  alt?: boolean;
  shift?: boolean;
  meta?: boolean;
  callback: (event: KeyboardEvent) => void;
  description?: string;
}

export type ShortcutMap = Record<string, () => void>;

interface UseKeyboardShortcutsOptions {
  enabled?: boolean;
  disableInInputs?: boolean;
  preventDefault?: boolean;
}

/**
 * Hook for handling keyboard shortcuts
 * @param shortcuts - Map of key combinations to callbacks (e.g., { "ctrl+k": () => {} })
 * @param options - Configuration options
 */
export function useKeyboardShortcuts(
  shortcuts: ShortcutMap | KeyboardShortcut[],
  options: UseKeyboardShortcutsOptions = {}
): void {
  const {
    enabled = true,
    disableInInputs = true,
    preventDefault = true,
  } = options;

  const shortcutsRef = useRef(shortcuts);

  // Update ref when shortcuts change
  useEffect(() => {
    shortcutsRef.current = shortcuts;
  }, [shortcuts]);

  /**
   * Check if element is an input/textarea/contenteditable
   */
  const isInputElement = useCallback((element: Element): boolean => {
    const tagName = element.tagName.toLowerCase();
    const isContentEditable = element.getAttribute('contenteditable') === 'true';

    return (
      tagName === 'input' ||
      tagName === 'textarea' ||
      tagName === 'select' ||
      isContentEditable
    );
  }, []);

  /**
   * Parse shortcut string (e.g., "ctrl+shift+k")
   */
  const parseShortcutString = useCallback((shortcut: string) => {
    const parts = shortcut.toLowerCase().split('+');
    const key = parts[parts.length - 1] ?? '';
    const modifiers = parts.slice(0, -1);

    return {
      key: key as string,
      ctrl: modifiers.includes('ctrl') || modifiers.includes('control'),
      alt: modifiers.includes('alt'),
      shift: modifiers.includes('shift'),
      meta: modifiers.includes('meta') || modifiers.includes('cmd'),
    };
  }, []);

  /**
   * Check if keyboard event matches shortcut
   */
  const matchesShortcut = useCallback((
    event: KeyboardEvent,
    shortcut: KeyboardShortcut | string
  ): boolean => {
    let shortcutConfig: KeyboardShortcut;

    if (typeof shortcut === 'string') {
      const parsed = parseShortcutString(shortcut);
      shortcutConfig = {
        ...parsed,
        callback: () => {},
      };
    } else {
      shortcutConfig = shortcut;
    }

    const keyMatches = event.key.toLowerCase() === shortcutConfig.key.toLowerCase();
    const ctrlMatches = !!shortcutConfig.ctrl === (event.ctrlKey || event.metaKey);
    const altMatches = !!shortcutConfig.alt === event.altKey;
    const shiftMatches = !!shortcutConfig.shift === event.shiftKey;
    const metaMatches = !!shortcutConfig.meta === event.metaKey;

    return keyMatches && ctrlMatches && altMatches && shiftMatches && metaMatches;
  }, [parseShortcutString]);

  /**
   * Handle keydown event
   */
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (!enabled) return;

    // Check if focus is in input element
    if (disableInInputs && event.target && isInputElement(event.target as Element)) {
      return;
    }

    const currentShortcuts = shortcutsRef.current;

    // Handle array of shortcuts
    if (Array.isArray(currentShortcuts)) {
      for (const shortcut of currentShortcuts) {
        if (matchesShortcut(event, shortcut)) {
          if (preventDefault) {
            event.preventDefault();
          }
          shortcut.callback(event);
          break;
        }
      }
      return;
    }

    // Handle shortcut map
    for (const [shortcutString, callback] of Object.entries(currentShortcuts)) {
      if (matchesShortcut(event, shortcutString)) {
        if (preventDefault) {
          event.preventDefault();
        }
        callback();
        break;
      }
    }
  }, [enabled, disableInInputs, preventDefault, isInputElement, matchesShortcut]);

  /**
   * Register keyboard event listener
   */
  useEffect(() => {
    if (!enabled) return;

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [enabled, handleKeyDown]);
}

/**
 * Helper to create keyboard shortcut objects
 */
export function createShortcut(
  key: string,
  callback: (event: KeyboardEvent) => void,
  modifiers?: {
    ctrl?: boolean;
    alt?: boolean;
    shift?: boolean;
    meta?: boolean;
  },
  description?: string
): KeyboardShortcut {
  return {
    key,
    callback,
    description,
    ...modifiers,
  };
}
