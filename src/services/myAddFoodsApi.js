export const myAddFoodsPromise = email => {
    return fetch(`https://food-circle-server-five.vercel.app/foods?email=${email}`)
    .then(res => res.json())
}