import React, { useEffect, useState } from 'react';

const Output = () => {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    // Example fetch call to your API endpoint or method to retrieve Substreams data
    fetch('/api/substreamData')
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error('Error fetching Substreams data:', error));
  }, []);

  return (
    <div>
      <h3>Substreams Data:</h3>
      <pre> {JSON.stringify(data, null, 2)} </pre>
    </div>
  );
};

export default Output;
