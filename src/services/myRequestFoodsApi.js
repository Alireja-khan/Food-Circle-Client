export const myRequestFoodsPromise = email => {
    return fetch(`http://localhost:3000/api/requests?email=${email}`)
    .then(res => res.json())
}