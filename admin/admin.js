
document.getElementById('form').onsubmit=e=>{
 e.preventDefault();
 fetch('/api/content',{method:'POST',headers:{'Content-Type':'application/json'},
 body:JSON.stringify({title:title.value,content:content.value})})
 alert('Conteúdo enviado');
}
