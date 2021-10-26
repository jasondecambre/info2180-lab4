window.onload = function(){
    var searches = document.getElementsByClassName("Search"); // gets all "Search" buttons
    // var httpRequest = new XMLHttpRequest();
    // var source = "http://localhost/info2180-lab4/superheroes.php";

     //adds listener to fetch the PHP list to each button
    for(var i=0; i< searches.length;i++){
    searches[i].addEventListener("click", function(){        
        fetch('http://localhost/info2180-lab4/superheroes.php')
        .then(response => response.text())
        .then(data => {        
            alert(data)
            console.log(data)
            })
        .catch(error => {
            alert(error)
            console.log(error);
            });
        });
    }
}