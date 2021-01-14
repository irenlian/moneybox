import React from 'react';
import { Button } from '@material-ui/core';
import i18n, { createi18n } from '../locales/i18n';
import ChartController from '~/components/chartController';

createi18n('en');
i18n.changeLanguage();

const App: React.FC = () => {
  const changeLanguage = (language: string) => () => {
    document.cookie = `i18next=${language}`;
    i18n.changeLanguage(language);
  };

  return (
    <div className="root">
      <main id="content">
        <div className="toolbar">
          <Button onClick={changeLanguage('en')}>en</Button>
          <Button onClick={changeLanguage('ru')}>ru</Button>
        </div>
        <ChartController />
      </main>
    </div>
  );
};

export default App;
