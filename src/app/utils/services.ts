export const getAvailableStates = async () => {
  const states = await fetch(`http://localhost:3000/api/states`);
  return states.json();
};

export const getResults = async (state: string) => {
  const response = await fetch(`http://localhost:3000/api/results`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ state }),
  });
  console.log(`status: ${response.status}`);
  return { results: await response.json(), status: response.status };
};
