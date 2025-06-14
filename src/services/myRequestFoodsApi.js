export const myRequestFoodsPromise = email => {
    return fetch(`https://food-circle-server-five.vercel.app/requests?email=${email}`)
    .then(res => res.json())
}