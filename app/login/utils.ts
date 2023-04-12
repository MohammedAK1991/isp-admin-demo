import * as Yup from 'yup';

export const loginSchema = Yup.object().shape({
  email: Yup.string().email().required('Email address is required'),
  password: Yup.string().required('No password provided').min(3, 'Passowrd is too short!'),
});
