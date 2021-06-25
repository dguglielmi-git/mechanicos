import React from 'react';
import { Container } from 'semantic-ui-react';
import LoginForm from '../../components/Auth/LoginForm';
import '../../locales/i18n';
import './Auth.scss';

export default function Auth() {

	return (
		<Container fluid className="auth">
			<div className="container-form">
				<LoginForm />
			</div>
		</Container>
	);
}
