let apiRequest = async (url = "", optionObj = null, errMsg = null) => {
  try {
    let response = await fetch(url, optionObj);
    if (!response.ok) throw Error("please reload the app");
  } catch (error) {
    errMsg = error.message;
  } finally {
    return errMsg;
  }
};
export default apiRequest;
