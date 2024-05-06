
const fetchData = async (url) => {
  // console.log("loading...");
  try {
    const resp = await fetch(url);
    const data = await resp.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};


export default fetchData