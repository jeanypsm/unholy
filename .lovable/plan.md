
# Plano: Remover Badge "Editado em Lovable"

## O que vamos fazer

Adicionar código CSS e JavaScript para detectar e esconder automaticamente o badge/popup "Editado em Lovable" que é injetado pela plataforma de hospedagem.

## Solução

Vamos implementar duas camadas de proteção:

1. **CSS Global** - Esconde elementos conhecidos do badge via seletores
2. **JavaScript** - Um script que monitora e remove elementos injetados dinamicamente

## Alterações

### 1. Adicionar CSS no `src/index.css`

Adicionar regras CSS que escondem elementos comuns usados por badges de plataformas:

```css
/* Esconder badge Lovable */
[data-lovable-badge],
[class*="lovable-badge"],
[id*="lovable-badge"],
a[href*="lovable.dev"]:not([href*="docs"]) {
  display: none !important;
  visibility: hidden !important;
  opacity: 0 !important;
  pointer-events: none !important;
}
```

### 2. Criar componente `src/components/BadgeRemover.tsx`

Um componente React que usa `useEffect` para:
- Detectar elementos injetados no DOM
- Usar MutationObserver para monitorar mudanças
- Remover automaticamente badges encontrados

### 3. Adicionar no `src/App.tsx`

Importar e incluir o componente `BadgeRemover` no App.

## Observação

Como você tem plano pago, o badge não deveria aparecer. Recomendo também:
- Entrar em contato com o suporte do Lovable pelo Discord
- Reportar que o badge ainda aparece mesmo com plano ativo
