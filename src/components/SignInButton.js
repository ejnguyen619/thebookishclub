import React from 'react';
import './Button.css';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export function SignInButton() {
  const { t } = useTranslation();
  return (
    <Link to='/sign-in'>
      <button className='btn' data-testid="main">
        {t("sign_in")}
      </button>
    </Link>
  );
}