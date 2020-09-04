// api url 
const api_url = "http://localhost:8000/retrive"; 
  
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
        <li class="todo-list-item">
        <div class="todo-list-item-name">${r.data}</div>
        <a href="" class="edit">
            <span class="fas fa-edit"></span></a>
            <a href="" class="remove">
                <span class="fas fa-times">
                </span>
            </a>
        </li>
        
        `; 
    } 
    // Setting innerHTML as tab variable 
    document.getElementById("list").innerHTML = tab; 
} 