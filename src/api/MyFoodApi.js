export const myFoodsPromise = (email) =>{
   return fetch(`http://localhost:3000/myfoods?email=${email}`).then(res=>res.json())
}