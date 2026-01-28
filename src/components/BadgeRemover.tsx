import { useEffect } from 'react';

const BadgeRemover = () => {
  useEffect(() => {
    const removeBadge = () => {
      // Seletores comuns para badges de plataformas
      const selectors = [
        '[data-lovable-badge]',
        '[class*="lovable-badge"]',
        '[id*="lovable-badge"]',
        '[class*="gptengineer"]',
        '[id*="gptengineer"]',
        'a[href*="lovable.dev"]:not([href*="docs"])',
        'a[href*="gptengineer.app"]',
      ];

      selectors.forEach(selector => {
        document.querySelectorAll(selector).forEach(el => {
          el.remove();
        });
      });

      // Remove elementos fixos suspeitos no canto inferior
      document.querySelectorAll('div[style*="position: fixed"], div[style*="position:fixed"]').forEach(el => {
        const rect = el.getBoundingClientRect();
        const style = window.getComputedStyle(el);
        
        // Se está no canto inferior e parece ser um badge
        if (rect.bottom > window.innerHeight - 100 && 
            (rect.right > window.innerWidth - 200 || rect.left < 200) &&
            rect.width < 300 && rect.height < 100) {
          const text = el.textContent?.toLowerCase() || '';
          if (text.includes('lovable') || text.includes('edit') || text.includes('made with')) {
            el.remove();
          }
        }
      });
    };

    // Executa imediatamente
    removeBadge();

    // Configura MutationObserver para detectar elementos injetados
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.addedNodes.length) {
          removeBadge();
        }
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    // Executa periodicamente como fallback
    const interval = setInterval(removeBadge, 2000);

    return () => {
      observer.disconnect();
      clearInterval(interval);
    };
  }, []);

  return null;
};

export default BadgeRemover;
