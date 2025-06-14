export const myRequestFoodsPromise = email => {
    return fetch(`http://localhost:3000/requests?email=${email}`)
    .then(res => res.json())
}