const URL_API = 'https://opentdb.com/api_token.php?command=request';

const getApitrivia = async () => {
  const response = await fetch(URL_API);
  const responseJson = await response.json();

  return responseJson;
};

export default getApitrivia;
