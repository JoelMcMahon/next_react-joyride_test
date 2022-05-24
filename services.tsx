import axios from "axios";

export const getSteps = (url: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    axios({
      method: "get",
      url: url,
    })
      .then((response) => {
        resolve(response.data);
      })
      .then((err) => {
        console.log(err, "error");
        reject("Error: Response Rejected");
      });
  });
};
