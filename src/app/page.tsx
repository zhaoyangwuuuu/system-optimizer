"use client";

import Layout from "@/components/Layout";
import SystemInfo from "@/components/SystemInfo";

const Home: React.FC = () => {
  return (
    <Layout>
      <main className='flex-grow p-5'>{/* <SystemInfo /> */}</main>
    </Layout>
  );
};

export default Home;
