export default async function getUser(id:string) {
    const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
  
    // if(!res.ok) throw new Error ('Failed to fetch the user info')
    if(!res.ok) return undefined //recommended in the docs
    return res.json();
  }
  