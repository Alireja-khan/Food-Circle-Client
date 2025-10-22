export const myRequestFoodsPromise = email => {
    return fetch(`http://localhost:5000/api/requests?email=${email}`)
    .then(res => res.json())
}