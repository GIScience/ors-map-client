// This is an example file and is expected to be cloned
// without the -example on the same folder that it resides.

const light = {
  dark: false,
  colors: {
    background: '#FFFFFF',
    surface: '#FFFFFF',
    primary: '#C62828',
    'primary-darken-1': '#671515',
    secondary: '#8e0000',
    'secondary-darken-1': '#540101',
    error: '#f44336',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FFD54F',
  },
}

const dark = {
  dark: true,
  colors: {
    background: '#1f2023',
    surface: '#1f2023',
    primary: '#C62828',
    'primary-darken-1': '#671515',
    secondary: '#8e0000',
    'secondary-darken-1': '#540101',
    error: '#f44336',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FFD54F',
  },
}

const theme = {
  defaultTheme: 'light',
  themes: {
    light,
    dark
  }
}

export default theme
