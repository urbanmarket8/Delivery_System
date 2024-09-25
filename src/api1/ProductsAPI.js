// src/api/ProductsAPI.js
import AsyncStorage from "@react-native-async-storage/async-storage";
import axiosInstance from "./axiosInstance";

// export const getProducts = async () => {
//   try {
//     const locationString = await AsyncStorage.getItem("location");
//     const location = JSON.parse(locationString); // Parse location

//     const latitude = location?.coords?.latitude;
//     const longitude = location?.coords?.longitude;
//     console.log(latitude);
//     console.log(longitude);

//     const data = JSON.stringify({
//       searchText: "",
//       shopId: "",
//       category: "",
//       nearby: false,
//       page: 1,
//       limit: 50,
//     });
//     const response = await axiosInstance.post("/product/products", data, {
//       headers: {
//         "x-user-latitude": longitude,
//         "x-user-longitude": latitude,
//       },
//     });
//     console.log(response.data, "line 25");

//     return "response.data"; // Return the data from the response
//   } catch (error) {
//     console.error("Error sending request:", error);
//     if (error.response) {
//       // The request was made and the server responded with a status code outside of the 2xx range
//       console.error(
//         "Server responded with status code:",
//         error.response.status
//       );
//       console.error("Response data:", error.response.data);
//     } else if (error.request) {
//       // The request was made but no response was received
//       console.error("No response received:", error.request);
//     } else {
//       // Something else happened while setting up the request
//       console.error("Error:", error.message);
//     } // Throw the error so it can be caught in the component
//   }
// };

export const getProducts = async () => {
  try {
    const locationString = await AsyncStorage.getItem("location");
    const location = JSON.parse(locationString); // Parse location
    // const latitude = location?.coords?.latitude;
    // const longitude = location?.coords?.longitude;
    const latitude = 34.0653347;
    const longitude = -118.243891;

    const data = JSON.stringify({
      searchText: "",
    });
    const response = await axiosInstance.post("/product/products", data, {
      headers: {
        "x-user-latitude": latitude,
        "x-user-longitude": longitude,
      },
    });
    return response.data.products;
  } catch (error) {
    console.error("Error sending request:", error);

    if (error.response) {
      console.error(
        "Server responded with status code:",
        error.response.status
      );
      console.error("Response data:", error.response.data);
    } else if (error.request) {
      console.error("No response received:", error.request);
    } else {
      console.error("Error:", error.message);
    }
  }
};

export const getProductsByCategory = async (category, shopId) => {
  try {
    const locationString = await AsyncStorage.getItem("location");
    const location = JSON.parse(locationString); // Parse location
    const latitude = location?.coords?.latitude;
    const longitude = location?.coords?.longitude;
    
    // const latitude = 34.0653347;
    // const longitude = -118.243891;

    const data = JSON.stringify({
      shopId: shopId,
    });

    const response = await axiosInstance.get(`/product/products/shopId/${shopId}/category/${category}`, data, {
      headers: {
        "x-user-latitude": latitude,
        "x-user-longitude": longitude,
      },
    });
    return response.data.products;
  } catch (error) {
    console.log(error);
  }
};