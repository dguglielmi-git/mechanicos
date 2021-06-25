import React, { useState } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { Button } from 'primereact/button';
import { Form, Image } from 'semantic-ui-react';
import { useTranslation } from 'react-i18next';
import { setToken, decodeToken } from '../../../utils/token';
import { LOGIN } from "../../../gql/user";
import { useMutation } from "@apollo/client";
import useAuth from '../../../hooks/useAuth';
import '../../../locales/i18n';
import './LoginForm.scss';
import Logo from "../../../assets/meclogo.png";

const LoginForm = (props) => {
	const [error, setError] = useState('');
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
				// use 'formData' to get a successfull authentication
				// get 'token' value from database or backend in order to assign to the localStorage
				const { data } = await login({
					variables: {
						input:formData,
					}
				})
				const { token } = data.login;
				//const token = "Dsklj82$#%ksjkddWIUKkjsf9298s9d2";
				setToken(token);
				setUser(decodeToken(token));
			} catch (error) {
				setError(error.message);
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
					<Button fluid type="submit" className="p-button-outlined p-button-success btn-submit">
						{t('loginFormButton')}
					</Button>
				</div>
				{error && <p className="submit-error">{error}</p>}
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
