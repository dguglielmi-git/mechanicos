import React from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import { Form, Button } from 'semantic-ui-react';
import { useTranslation } from 'react-i18next';
import '../../../locales/i18n';
import './RegisterForm.scss';

export default function RegisterForm(props) {
	const { setShowLogin } = props;
	const { t } = useTranslation();
	const regEx = /^[a-zA-Z0-9-]*$/;

	const formik = useFormik({
		initialValues: initialValues(),
		validationSchema: Yup.object({
			name: Yup.string().required(true),
			username: Yup.string().matches(regEx, t('registerFormUserNameNoSpaces')).required(true),
			email: Yup.string().email(t('registerFormInvalidEmail')).required(true),
			password: Yup.string()
				.required(t('registerFormPassRequired'))
				.oneOf([Yup.ref('repeatPassword')], t('registerFormPassNotEqual')),
			repeatPassword: Yup.string()
				.required(t('registerFormPassRequired'))
				.oneOf([Yup.ref('password')], t('registerFormPassNotEqual')),
		}),
		onSubmit: async (formData) => {
			try {
				const newUser = formData;
				delete newUser.repeatPassword;

                /**
                 * Add the code to register a new user
                 * 
                 *  code...
                 */
			
				toast.success(t('registerFormUserRegistered'));
				setShowLogin(true);
			} catch (error) {
				toast.error(error.message);
			}
		},
	});

	return (
		<Form className="register-form" onSubmit={formik.handleSubmit}>
			<h3>{t('registerFormTitleComplete')}</h3>
			<Form.Input
				type="text"
				placeholder={t('registerFormNameLastname')}
				name="name"
				value={formik.values.name}
				onChange={formik.handleChange}
				error={formik.errors.name}
			/>
			<Form.Input
				type="text"
				placeholder={t('registerFormUsername')}
				name="username"
				value={formik.values.username}
				onChange={formik.handleChange}
				error={formik.errors.username}
			/>
			<Form.Input
				type="text"
				placeholder={t('registerFormEmail')}
				name="email"
				value={formik.values.email}
				onChange={formik.handleChange}
				error={formik.errors.email}
			/>
			<Form.Input
				type="password"
				placeholder={t('registerFormEnterPass')}
				name="password"
				value={formik.values.password}
				onChange={formik.handleChange}
				error={formik.errors.password}
			/>
			<Form.Input
				type="password"
				placeholder={t('registerFormRepeatPass')}
				name="repeatPassword"
				value={formik.values.repeatPassword}
				onChange={formik.handleChange}
				error={formik.errors.repeatPassword}
			/>
			<Button fluid type="submit" className="btn-submit">
				{t('registerFormRegisterButton')}
			</Button>
		</Form>
	);
}

function initialValues() {
	return {
		name: '',
		username: '',
		email: '',
		password: '',
		repeatPassword: '',
	};
}
