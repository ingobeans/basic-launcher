let themes = {
  light: {
    "--background-color": "#f2f2f2",
    "--text-color": "#000",
    "--contrast-color": "#ffffff",
    "--highlight-color": "#292929",
  },
  dark: {
    "--background-color": "#000000",
    "--text-color": "#ffffff",
    "--contrast-color": "#292929",
    "--highlight-color": "#ffffff",
  },
};

function loadTheme(theme) {
  for (const variable in theme) {
    if (theme.hasOwnProperty(variable)) {
      document.documentElement.style.setProperty(variable, theme[variable]);
    }
  }
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
