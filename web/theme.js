let themes = {
  light: `
  --background-color: #f2f2f2;
  --text-color: #000;
  --contrast-color: #ffffff;
  --highlight-color: #292929;`,

  dark: `
    --background-color: #19191b;
    --text-color: #ffffff;
    --contrast-color: #3d3d43;
    --highlight-color: #ffffff;`,
};

function loadTheme(theme) {
  document.documentElement.style.cssText = theme;
}

function updateThemeToSystem() {
  if (
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  ) {
    loadTheme(themes["dark"]);
  } else {
    loadTheme(themes["light"]);
  }
}

window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", (event) => {
    updateThemeToSystem();
  });

updateThemeToSystem();
