import { FC, SyntheticEvent, useState } from 'react';
import { RegisterUI } from '@ui-pages';
import { useDispatch, useSelector } from '../../services/store';
import { register } from '../../services/slices/userSlice';
import { useNavigate } from 'react-router-dom';

export const Register: FC = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const error = useSelector((state) => state.userData.error);
  const user = useSelector((state) => state.userData.user);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(
      register({
        email: email,
        name: userName,
        password: password
      })
    );

    if (!error && user) {
      navigate('/'); // Redirect to home page
    }
  };

  return (
    <RegisterUI
      errorText={error ? error : undefined}
      email={email}
      userName={userName}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      setUserName={setUserName}
      handleSubmit={handleSubmit}
    />
  );
};
