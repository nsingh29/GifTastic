$(document).ready(function(){
    
    let i, button="", toDoCount=0;

    // making variables

    let topic=["football","soccer","baseball","basketball","rugby","volleyball","tennis"];
    let loopCounter = sessionStorage.getItem("count");
    console.log(loopCounter)
    // loop to cycle through items the user added
    for(i=0; i <= loopCounter; i++){
       
      if(loopCounter!=null){
        topic.push(sessionStorage.getItem("topic-" + i));
        console.log(topic);
      }
      
    }

    createButtons();

    // creating a function that creates buttons using the elements inside the array
    function createButtons(){

        $("#imagebuttons").empty();
        $("#image-input").val("");
        for (i in topic){
            button = `<button type="button" class="imageButtons col-md-1 col-sm-2 col-xs-3 btn btn-primary" value= "${topic[i]}" >${topic[i]}</button>`;
            $("#imagebuttons").append(button);
         }
        
    }





    // Add an event on the submit button created
    
    $("#addImage").on("click", function(event) {

        event.preventDefault();

        let topic = $("#image-input").val().trim(); 
        // // Setting a storage session for every image added
        if (topic!==""){
            
            sessionStorage.setItem("topic-" + toDoCount, topic)
            // add tracker 

            sessionStorage.setItem('count', toDoCount)
            toDoCount++;
            topic

            .push(topic);
            createButtons();

        }
    });

    

   // ajax call api
    $(document).on("click",".imageButtons", function(){
        $("#image").empty();
        let imageName = $(this).val();
        
    
        let queryURL = "https://api.giphy.com/v1/gifs/search?q=" + imageName + "&api_key=FNSlJ3B5F3zJwMZdPxfukk7N8aZPgZjZ&limit=10"
        let j, images=""
        let x = "480w_still";
        $.ajax({
            url:queryURL,
// linking giphy api
            method: "GET"
            }).then(function(response){
                

                for (j in response.data){

                    console.log(response.data[j].images[x].url);
                    images =`<div class="panel panel-primary col-md-4 col-sm-4 col-xs-6">
                                <img class="staticImage img-circle col-md-12 " data-name="${j}" src="${response.data[j].images[x].url}" alt="${imageName}" width="250px" height="250px">
                                <h3 class="col-md-offset-3 col-md-3 col-sm-offset-3 col-sm-3 col-xs-offset-3 col-xs-3"><span class="label label-primary">${response.data[j].rating}</span></h3>
                                <a class="button col-md-offset-3 col-md-3 col-sm-offset-3 col-sm-3 col-xs-offset-3 col-xs-3" href="${response.data[j].images[x].url}" download="${imageName}.jpg"><span class="glyphicon glyphicon-download-alt"></span></a>
                            </div>`
                            console.log(imageName)
                    $("#image").append(images);
                    
                }
                
               // animate on click

                $(document).on("click",".staticImage", function(){
                    let dataNumber = $(this).attr("data-name")
                    $(this).attr("src",response.data[dataNumber].images.downsized.url);
                    $(this).removeClass("staticImage");
                    $(this).addClass("animatedImage");
                });  
                
                //freezes image on click https://stackoverflow.com/questions/5818003/stop-a-gif-animation-onload-on-mouseover-start-the-activation
                $(document).on("click",".animatedImage", function(){
                    let dataNumber = $(this).attr("data-name");
                    $(this).attr("src",response.data[dataNumber].images[x].url); 
                    $(this).removeClass("animatedImage");
                    $(this).addClass("staticImage");
                });  

            });

         

    });

   
});