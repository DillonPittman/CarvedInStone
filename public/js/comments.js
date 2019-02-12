
$(document).ready(function () {
  var commentBtn = $(".commentBtn");
  var revealBtn = $(".revealCommentBtn")
  var postId = $("#post-id").text().trim();

    commentBtn.on("click", function (event) {
        event.preventDefault();
        var submitBtn = $("<button id= '" + postId + "'>submit</button>");
        $("#postHead").append("<textarea class ='commentText'>").append(submitBtn);
        submitBtn.on("click", function (event) {
            event.preventDefault();
            var commentText = $(".commentText").val()
    
            var newComment = {
                text: commentText,
                ExampleId: postId
            }
    
            if (!newComment.text) {
                return;
            }
            
            return $.ajax({
                headers: {
                    "Content-Type": "application/json"
                },
                type: "POST",
                url: "../api/comments",
                data: JSON.stringify(newComment)
            });
            

        })
        
        

    });
    
    revealBtn.on("click", function (event) {
        event.preventDefault();
        getComments()
        $(".hidex").toggle()
        
        });
    function getComments(){
            $(".hidex").empty()
            $.get("/api/examples/" + postId,function( data ){
                console.log(data.Comments)
                for(i = 0; i < data.Comments.length; i++){
                    $(".hidex").append($("<li>"+ data.Comments[i].text +"</li>"))
                }
        })
    }        
    
});



    


