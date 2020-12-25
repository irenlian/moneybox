import React from 'react';
import ChartController from '~/components/chartController/chartController';

const App: React.FC = () => (
  <div className="root">
    <main id="content">
      <div className="toolbar" />
      <div>Main page</div>
      <ChartController />
    </main>
  </div>
);

export default App;
