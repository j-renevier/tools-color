import { useState } from 'react';

import Button from '../atom/Button';
import { useTypedSelector } from '../../model/redux/store';
import ChangeMessageButton from '../molecule/ChangeMessageButton';
import { HelloServices } from '../../model/redux/slice/HelloSlice';

const Hello = () => {
  const helloMessage = useTypedSelector((state) => state.Hello.message); //getting data from store
  const [message, setMessage] = useState<string>('');

  const inputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(() => event?.target.value);
  }

  const cancelHandler = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    setMessage(() => '');
  }

  return (
    <div>
      <span>{helloMessage}</span>
      <input type='text' value={message} onChange={(event) => inputHandler(event)}/>
      <Button onClick={cancelHandler}>Anuler</Button>
      <ChangeMessageButton action={HelloServices.actions.clearMessage}>Effacer</ChangeMessageButton>
      <ChangeMessageButton action={HelloServices.actions.defaultMessage}>Défaut</ChangeMessageButton>
      <ChangeMessageButton action={HelloServices.actions.initialMessage}>Initial</ChangeMessageButton>
      <ChangeMessageButton action={HelloServices.actions.changeMessage} value={message}><span>Valider</span></ChangeMessageButton>
    </div>
  );
};

export default Hello;