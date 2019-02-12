var postId = $("#post-id").text().trim();
getComments();


$(document).ready(function () {
    slideAnimation()
  var commentBtn = $(".commentBtn");
//   var revealBtn = $(".revealCommentBtn")
  

// comment button creates a text field to comment from
    commentBtn.on("click", function (event) {
        event.preventDefault();
        if($(".commentText")){
            $(".commentText").remove();
            $(".submitBtn").remove()
        }
        var submitBtn = $("<button class = 'submitBtn' id= '" + postId + "'>submit</button>");
        $("#postHead").append("<textarea class ='commentText'>").append(submitBtn);
        //the submit button posts a comment to comments table in mysql
        submitBtn.on("click", function (event) {
            event.preventDefault();
            var commentText = $(".commentText").val()
    
            var newComment = {
                text: commentText,
                ExampleId: postId // relational ID
            }
    
            if (!newComment.text) {// no text no comment
                return;
            }
            $(".commentText").val("")
            return $.ajax({//post method
                headers: {
                    "Content-Type": "application/json"
                },
                type: "POST",
                url: "../api/comments",
                data: JSON.stringify(newComment)
            });
            
            
        })
        
        

    });

//button reveals comments associated with chosen post
    // revealBtn.on("click", function (event) {
    //     event.preventDefault();
    //     getComments()
    //     slideAnimation()
        
        
    //     });



});
//ajax function to get comments from sql db

function getComments(){
    $("#example-list").empty()
    $.get("/api/examples/" + postId,function( data ){
        console.log(data.Comments)
        for(i = 0; i < data.Comments.length; i++){
            $("#example-list").append($("<div class='row animation-element slide-left'><div class='card mt-4 cardx'><div class='card-body'><p>"+ data.Comments[i].text +"</p></div></div></div>"))
        }
})
}        


// animation for comments

var slideAnimation = function() {
    // ANIMATION ////////////////////////////////////////////////
  
    //window and animation items
    var animation_elements = $.find('.animation-element');
    var web_window = $(window);
  
    //check to see if any animation containers are currently in view
    function check_if_in_view() {
      //get current window information
      var window_height = web_window.height();
      var window_top_position = web_window.scrollTop();
      var window_bottom_position = (window_top_position + window_height);
  
      //iterate through elements to see if its in view
      $.each(animation_elements, function() {
        //get the element sinformation
        var element = $(this);
        var element_height = $(element).outerHeight();
        var element_top_position = $(element).offset().top;
        var element_bottom_position = (element_top_position + element_height);
  
        //check to see if this current container is visible (its viewable if it exists between the viewable space of the viewport)
        if ((element_bottom_position >= (window_top_position + 50)) && (element_top_position <= (window_bottom_position - 50))) {
          element.addClass('in-view');
        } else {
          // element.removeClass('in-view');
        }
      });
    }
  
    //on or scroll, detect elements in view
    $(window).on("scroll resize", function () {
      check_if_in_view();
    });
    //trigger our scroll event on initial load
    $(window).trigger("scroll");
  };



