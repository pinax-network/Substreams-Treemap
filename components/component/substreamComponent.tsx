import React from 'react';
import { useSubstreamsData } from './substreamData'; 

const SubstreamsComponent: React.FC = () => {
  const manifest = "https://spkg.io/pinax-network/erc20-balance-changes-mainnet-v1.2.0.spkg";
  const apiToken = "657047275aea337c6dd47fb19715f0df056096af91311c21";
  const { data, isLoading, isError } = useSubstreamsData(manifest, apiToken);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading data: {isError.message}</div>;

  return (
    <div>
      <h1>Substreams Data</h1>
      {/* Render your data here. Adjust the rendering logic based on your actual data structure */}
      <pre>{JSON.stringify(data?.exampleProperty ?? 'No data', null, 2)}</pre>
    </div>
  );
};

export default SubstreamsComponent;
