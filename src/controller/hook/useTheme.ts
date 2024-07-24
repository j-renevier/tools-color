import { useEffect, useState } from "react";

import ThemeColor from "../../util/ThemeColorType";
import { useTypedSelector } from "../../model/redux/store";


const useTheme = () => {
  const themeColorValue = useTypedSelector((state) => state.Theme.value);
  const [theme, setTheme] = useState<string>(themeColorValue.toLowerCase());

  useEffect (()=>{
    if(themeColorValue === ThemeColor.OS){
      if (window.matchMedia('(prefers-color-scheme: dark)').matches){
        setTheme(() => ThemeColor.DARK.toLowerCase());
      } else {
        setTheme(() => ThemeColor.LIGHT.toLowerCase());
      }
      setTheme(() => ThemeColor.DARK.toLowerCase());
    } else  {
      setTheme(() => themeColorValue.toLowerCase());
    }
  }, [themeColorValue]);

  useEffect(() => {
    document.documentElement.setAttribute('theme', theme);
  }, [theme]);

  return theme;
}

export default useTheme;