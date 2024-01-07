'use client';

import SystemInfo from '../components/SystemInfo';

const Home: React.FC = () => {
  return (
    <div>
      <main className='main-container'>
        <SystemInfo />
      </main>
    </div>
  );
};

export default Home;