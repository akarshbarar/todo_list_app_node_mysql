// api url 
const api_url = 'http://localhost:8000/retrive'; 
  
// Defining async function 
async function getapi(url) { 
    
    // Storing response 
    const response = await fetch(url);//GET
    
    // Storing data in form of JSON 
    var data = await response.json(); 
    console.log(data); 
  
    show(data); 
} 
// Calling that async function 
getapi(api_url); 
  

// Function to define innerHTML for HTML table 
function show(data) { 
    let tab =  ``; 
    
    // Loop to access all rows  
    for (let r of data) { 
        tab += `
        <li class='todo-list-item'>
        <div class='todo-list-item-name'>${r.data}</div>
        
        
                <p 
                onclick='myfunction("${r.data}")'>
                    <span class='edit fas fa-edit'>
                    </span>
                </p>
        

        <form action='/remove/${r.id}' method='POST'>
               <button type='submit'>
                    <span class='remove fas fa-times' id='remove' >
                    </span>
               </button>
        </form>
        </li>
        
        `; 
    } 
    // Setting innerHTML as tab variable 
    document.getElementById('list').innerHTML = tab; 

   
} 

function myfunction(obj){
    console.log("clicked",obj)
    var txt;
    var data = prompt("Please Edit the Text:", obj);
    if (data == null || data == "") {
      alert("Please insert something")
    } else {

        fetch(
            "http://localhost:8000/edit",
             {
                 method:"POST",
                 body: JSON.stringify({ 
                    oldData: obj, 
                    newData: data
                }),
                // Adding headers to the request 
                headers: { 
                    "Content-type": "application/json; charset=UTF-8"
                } 
             }

        ).then(()=>{
            location.reload()
        })
    }

}