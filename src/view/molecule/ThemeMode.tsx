import { useEffect } from 'react';

import { isThemeColor } from '../../util/type';
import ThemeColor from '../../util/ThemeColorType';
import { useAppDispatch, useTypedSelector } from '../../model/redux/store';
import { ThemeColorServices } from '../../model/redux/slice/ThemeColorSlice';

const ThemeMode = () => {
  const dispatch = useAppDispatch();
  const themeColorValue = useTypedSelector((state) => state.Theme.value);

  const handleSelectChange: React.ChangeEventHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    try {
      const value = event.target.value
      if (!isThemeColor(value)) {
        throw new Error(`Invalid theme color: ${value}`);
      }
      dispatch(ThemeColorServices.actions.changeTheme(value));
    } catch (error:any){
      console.error(error);
    }
  };
  useEffect (()=>console.log(themeColorValue), [themeColorValue]);

  const selectContent = () => {
    const optionContent = (option: string, index:number) => {
      return (
        <option value={option} key={index} >
          {option?.charAt(0).toUpperCase() + option?.slice(1).toLowerCase()}
        </option>
      )
    }
    return(
      <select name='themeColor' id='select-theme' value={themeColorValue} onChange={(event)=>handleSelectChange(event)}>
        {
          Object.keys(ThemeColor).map((option, index) => 
            optionContent(option, index)
          )
        }
      </select>
    )
  }

  return (
    <div>
      <label htmlFor='select-theme'>Color theme:</label>
      {selectContent()}
    </div>
  );
};

export default ThemeMode;