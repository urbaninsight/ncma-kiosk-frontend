import { useEffect, useRef } from "react";

/**
 * Hook that creates a focus trap within a container element
 * @param isActive - Whether the focus trap should be active
 * @returns A ref to attach to the container element
 */
export function useFocusTrap(isActive: boolean) {
  const containerRef = useRef<HTMLDivElement>(null);
  const previouslyFocusedElementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isActive || !containerRef.current) return;

    const container = containerRef.current;

    // Store the previously focused element
    previouslyFocusedElementRef.current = document.activeElement as HTMLElement;

    // Get all focusable elements within the container
    const getFocusableElements = (): HTMLElement[] => {
      const focusableSelectors = [
        "button:not([disabled])",
        "input:not([disabled])",
        "textarea:not([disabled])",
        "select:not([disabled])",
        "a[href]",
        '[tabindex]:not([tabindex="-1"])',
        '[contenteditable="true"]',
      ];

      const elements = container.querySelectorAll(
        focusableSelectors.join(", "),
      );
      const focusableElements = Array.from(elements) as HTMLElement[];

      // Include the container itself if it's focusable (has tabindex >= 0)
      const containerTabIndex = container.getAttribute("tabindex");
      if (containerTabIndex !== null && parseInt(containerTabIndex) >= 0) {
        // Add container as the first element in the tab order
        focusableElements.unshift(container);
      }

      return focusableElements;
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Tab") return;

      const focusableElements = getFocusableElements();

      if (focusableElements.length === 0) {
        // If no focusable elements, prevent tabbing
        event.preventDefault();
        return;
      }

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];
      const currentFocusedElement = document.activeElement;

      if (event.shiftKey) {
        // Shift + Tab (moving backwards)
        if (currentFocusedElement === firstElement) {
          event.preventDefault();
          lastElement.focus();
        }
      } else {
        // Tab (moving forwards)
        if (currentFocusedElement === lastElement) {
          event.preventDefault();
          firstElement.focus();
        }
      }
    };

    // Add the event listener
    container.addEventListener("keydown", handleKeyDown);

    // Focus the container initially
    container.focus();

    // Cleanup function
    return () => {
      container.removeEventListener("keydown", handleKeyDown);

      // Restore focus to the previously focused element when trap is deactivated
      if (previouslyFocusedElementRef.current) {
        previouslyFocusedElementRef.current.focus();
      }
    };
  }, [isActive]);

  return containerRef;
}
