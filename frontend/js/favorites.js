
export function toggleFavorite(id){
 const f=JSON.parse(localStorage.getItem('fav'))||[];
 const n=f.includes(id)?f.filter(x=>x!==id):[...f,id];
 localStorage.setItem('fav',JSON.stringify(n));
}
