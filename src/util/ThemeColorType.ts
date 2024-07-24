enum ThemeColor {
  LIGHT = 'LIGHT',
  DARK = 'DARK',
  OS = 'OS',
}

type TThemeColor = keyof typeof ThemeColor;

export default ThemeColor;
export  type {TThemeColor};