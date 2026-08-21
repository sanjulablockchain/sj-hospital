const THEME_INIT_SCRIPT = `
(function () {
  try {
    var stored = window.localStorage.getItem('sj-home-theme');
    var theme = stored === 'light' || stored === 'dark'
      ? stored
      : (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
    var root = document.getElementById('sj-root');
    if (root) root.setAttribute('data-theme', theme);
  } catch (e) {}
})();
`;

export function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />;
}
