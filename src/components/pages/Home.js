import React from 'react';
import '../../App.css';
import Book from './Book';
import './Home.css';
import {Helmet} from "react-helmet";
import { useTranslation } from 'react-i18next';

export default function Home() {
    const { t } = useTranslation();
    return (
      <>
      <div className="background">
      <div className="backgroundBlur">
        <div class="homepagediv">
          <Helmet>
                  <meta name="description" content="Borrow a book online
                                                    Pick up and drop service avaiable
                                                    Book Recommendation system
                                                    Interesting Book suggestions"/>
                  <title>Home</title>
          </Helmet>
          <h1 className='home'>{t("home_msg")}</h1>
          <br />
            
          </div>
          <div class="recommenderdiv">
            <Book />
          </div>
      </div>
      </div>
      </>
    );
}
