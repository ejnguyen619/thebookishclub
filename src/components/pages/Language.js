import React from 'react';
import '../../App.css';
import i18n from '../../i18n';
import { useTranslation } from 'react-i18next';

export default function Language() {

    const { t } = useTranslation();
    const changeLanguage = (lng) => i18n.changeLanguage(lng);

    return (
      <>
        <h1 style={{textAlign: "center", marginTop: "20px"}}>{t("support_lang")}</h1>
        <div className="language">
            <button className='btnmain' onClick={() => changeLanguage('en')}>
                {t("english")}
            </button>
            <button className='btnmain' onClick={() => changeLanguage('es')}>
                {t("spanish")}
            </button>
            <button className='btnmain' onClick={() => changeLanguage('zh')}>
                {t("chinese")}
            </button>
        </div>
      </>
    );
}