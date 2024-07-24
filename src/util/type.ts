import ThemeColor, { TThemeColor } from "./ThemeColorType";

export const isThemeColor = (value: any): value is TThemeColor => {
  return Object.values(ThemeColor).includes(value);
};