const objGetApi = {
  getQuestionsApi: async () => {
    const token = localStorage.getItem('token');
    const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
    const responseJson = await response.json();

    return responseJson;
  },
};

export default objGetApi;
