export const myAddFoodsPromise = email => {
  return fetch(`http://localhost:3000/api/foods?email=${email}`)
    .then(res => res.json());
};
