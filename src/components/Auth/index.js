/** @format */

export const auth = {
    users: JSON.parse(localStorage.getItem("users")),
    token: localStorage.getItem("token"),
  };
  
  export const shop = {
    cart: localStorage.getItem("shopCar"),
  };
  