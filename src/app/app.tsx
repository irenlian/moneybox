import React from 'react';
import ChartController from '~/components/chartController';

const App: React.FC = () => (
  <div className="root">
    <main id="content">
      <div className="toolbar" />
      <ChartController />
    </main>
  </div>
);

export default App;
