const THEME_INIT_SCRIPT = `
(function () {
  try {
    var stored = window.localStorage.getItem('sj-home-theme');
    // Light is the site's default (owner's decision, 2026-09-23); the OS
    // preference no longer picks the first theme. Only a saved choice does.
    var theme = stored === 'light' || stored === 'dark' ? stored : 'light';
    var root = document.getElementById('sj-root');
    if (root) root.setAttribute('data-theme', theme);
  } catch (e) {}
})();
`;

export function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />;
}
