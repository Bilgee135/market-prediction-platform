/*
 * components/ui/DisclaimerModal.jsx
 *
 * What this is:
 *   A blocking modal overlay that fires when the user first lands on
 *   ModelsPage. The user must acknowledge the disclaimer before accessing
 *   the model selection content.
 *
 * Where it is used:
 *   ModelsPage.jsx only.
 *
 * What it should contain:
 *   - A semi-transparent blurred overlay covering the full screen
 *   - A centred card with the disclaimer text (not financial advice, for
 *     educational purposes only)
 *   - A single confirm button that closes the modal and reveals the page
 *   - Controlled by a useState boolean in ModelsPage (not internal state)
 *
 * Props:
 *   onConfirm  function called when the user clicks confirm
 *
 * Development order:
 *   Build when starting ModelsPage. It is the first thing the user sees
 *   on that route so it needs to work before the carousel is built.
 */