window.onload = function(){
    var searches = document.getElementsByClassName("Search"); // gets all "Search" buttons    

     //adds listener to fetch the PHP list to each button
    for(var i=0; i< searches.length;i++){
    searches[i].addEventListener("click", function(event){        
        event.preventDefault();
        //getting input from search bar and passing that text to query from PHP        
        searchPHP(document.getElementsByTagName('input')[0].value);        
        });
    }

    function searchPHP(str){

        //preparing div for output
        document.getElementById("result").classList.remove("notFound"); 

        if(str.length == 0){ //if nothing is in the search bar
            fetch('http://localhost/info2180-lab4/superheroes.php')
        .then(response => response.text())
        .then(data => {         
            //outputs list of superhero names
            document.getElementById("result").innerHTML = data;
            })
        .catch(error => {
            alert(error)
            });
        }
        else{
            var httpRequest = new XMLHttpRequest();
            httpRequest.onreadystatechange = function(){
                 if(httpRequest.status === 200){ //if request went through OK                                 
                    
                    var firstChar = httpRequest.responseText.charAt(0);                    
                    
                    if(firstChar != '{'){ //if superhero was not found
                        document.getElementById("result").innerHTML = "Superhero not found"; 
                        document.getElementById("result").classList.add("notFound");
                    }

                   else{ //if superhero was found

                    //preparing div for output
                    document.getElementById("result").innerHTML = "";                    ;

                    //receive info from PHP
                    var arr = JSON.parse(JSON.stringify(httpRequest.responseText)).split(':');

                    //processing, formatting and outputting data
                    var alias = arr[3].split(',');
                    var name = arr[2].split(',');
                    var biography = arr[4].split("}");
                    var h3 = document.createElement("h3");
                    var h4 = document.createElement("h4");
                    var p = document.createElement("p");
                    h3.classList.add("found");
                    h4.classList.add("found");
                    h3.innerHTML = apostrophe(alias[0].replaceAll('"',''));
                    h4.innerHTML = apostrophe("A.K.A. " + name[0].replaceAll('"',''));
                    var bio = biography[0].replaceAll('"','');
                    var bio1 = bio.split('}');                   
                    p.innerHTML = apostrophe(bio1[0]); 
                    document.getElementById("result").classList.remove("notFound"); 
                    document.getElementById("result").appendChild(h3);
                    document.getElementById("result").appendChild(h4);
                    document.getElementById("result").appendChild(p);
                    
                    }
            }
        }
            //sending query to PHP
            httpRequest.open("GET", "http://localhost/info2180-lab4/superheroes.php?query=" + str, true);
            httpRequest.send();

            //little utility to clean up the output
            var apostrophe = function(st){
                console.log("apostrophe called");
                return st.replaceAll("\\u2019","'");
            }
           
        
    }
  
  
}
    }