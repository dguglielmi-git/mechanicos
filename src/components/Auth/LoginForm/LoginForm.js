import { useState } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { Button } from 'primereact/button';
import { Form, Image } from 'semantic-ui-react';
import { useTranslation } from 'react-i18next';
import { setToken, decodeToken } from '../../../utils/token';
import { LOGIN } from '../../../gql/user';
import { useMutation } from '@apollo/client';
import useAuth from '../../../hooks/useAuth';
import Logo from '../../../assets/meclogo.png';
import { retryQuery } from '../../../utils/utils';
import Loader from '../../Loader';
import '../../../locales/i18n';
import './LoginForm.scss';

const LoginForm = () => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [login] = useMutation(LOGIN);
  const { t } = useTranslation();
  const { setUser } = useAuth();

  const formik = useFormik({
    initialValues: initialValues(),
    validateOnChange: false,
    validationSchema: Yup.object({
      username: Yup.string().required(t('loginFormUserRequired')),
      password: Yup.string().required(t('loginFormPassRequired')),
    }),
    onSubmit: async (formData) => {
      setError('');
      try {
        setLoading(true);
        const { data } = await retryQuery(
          login,
          {
            variables: {
              input: formData,
            },
          },
          6
        );
        const { token } = data.login;
        setToken(token);
        setUser(decodeToken(token));
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    },
  });

  return (
    <>
      <div className="title">
        Welcome to MechanicOS
        <div className="logo-image">
          <Image src={Logo} alt="" />
        </div>
      </div>

      <Form className="login-form" onSubmit={formik.handleSubmit}>
        {loading ? (
          <div className="login-form__loader">
            <Loader label="Loading..." />
          </div>
        ) : (
          <>
            <Form.Input
              className="input-form"
              type="text"
              placeholder={t('loginFormUserPass')}
              name="username"
              value={formik.values.username}
              onChange={formik.handleChange}
              error={formik.errors.username}
            />
            <Form.Input
              type="password"
              placeholder={t('loginFormPassRequired')}
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.errors.password}
            />
            <div className="button-login">
              <Button
                fluid
                type="submit"
                className="p-button-outlined p-button-success btn-submit"
              >
                {t('loginFormButton')}
              </Button>
            </div>
            {error && <p className="submit-error">{error}</p>}
          </>
        )}
      </Form>
    </>
  );
};
function initialValues() {
  return {
    username: '',
    password: '',
  };
}

export default LoginForm;
