import React from 'react';
import '../../App.css';
import './Language.css'
import i18n from '../../i18n';
import { useTranslation } from 'react-i18next';

export default function Language() {

    const { t } = useTranslation();
    const changeLanguage = (lng) => i18n.changeLanguage(lng);

    return (
      <>
      <div className="languageBackground">
        <div className="languageBackgroundBlur">
        <h1 style={{textAlign: "center"}}>{t("support_lang")}</h1>
        <div className="language">
            <button className='btnLanguage' onClick={() => changeLanguage('en')}>
                {t("english")}
            </button>
            <button className='btnLanguage' onClick={() => changeLanguage('es')}>
                {t("spanish")}
            </button>
            <button className='btnLanguage' onClick={() => changeLanguage('zh')}>
                {t("chinese")}
            </button>
            <button className='btnLanguage' onClick={() => changeLanguage('hi')}>
                {t("hindi")}
            </button>
        </div>
        </div>
        </div>
      </>
    );
}