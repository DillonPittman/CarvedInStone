// Get references to page elements
var $exampleText = $("#example-text");
var $exampleDescription = $("#example-description");
var $submitBtn = $("#submit");
var $commentSubmitBtn = $("#commentSubmit");
var $exampleList = $("#example-list");
var $commentList = $("#comment-list");

// The API object contains methods for each kind of request we'll make
var API = {
  saveExample: function(example) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/examples",
      data: JSON.stringify(example)
    });
  },
  saveComment: function(comment) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/comment",
      data: JSON.stringify(comment)
    });
  },
  getExamples: function() {
    return $.ajax({
      url: "api/examples",
      type: "GET"
    });
  },
  getComments: function() {
    return $.ajax({
      url: "api/comments",
      type: "GET"
    });
  },
  deleteExample: function(id) {
    return $.ajax({
      url: "api/examples/" + id,
      type: "DELETE"
    });
  }
};

// refreshExamples gets new examples from the db and repopulates the list
var refreshExamples = function() {
  API.getExamples().then(function(data) {
    var $examples = data.map(function(example) {
      var $a = $("<a>")
        .text(example.text)
        .attr("href", "/example/" + example.id);

      var $li = $("<li>")
        .attr({
          class: "list-group-item",
          "data-id": example.id
        })
        .append($a);

      var $button = $("<button>")
        .addClass("btn btn-danger float-right delete")
        .text("ｘ");

      $li.append($button);

      return $li;
    });

    $exampleList.empty();
    $exampleList.append($examples);
  });
};
// refreshExamples gets new examples from the db and repopulates the list
var refreshComments = function() {
  API.getComments().then(function(data) {
    var $comments = data.map(function(comment) {
      var $a = $("<a>")
        .text(comment.text)
        .attr("href", "/example/" + comment.id);

      var $li = $("<li>")
        .attr({
          class: "list-group-item",
          "data-id": comment.id
        })
        .append($a);

      return $li;
    });

    $commentList.empty();
    $commentList.append($comments);
  });
};

// handleFormSubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list
var handleFormSubmit = function(event) {
  event.preventDefault();

  var example = {
    text: $exampleText.val().trim(),
    description: $exampleDescription.val().trim()
  };
  // console.log("log check" + $exampleText);
  if (!(example.text && example.description)) {
    alert("You must enter an example text and description!");
    return;
  }

  API.saveExample(example).then(function() {
    refreshExamples();
  });

  $exampleText.val("");
  $exampleDescription.val("");
};

// handleCommentSubmit is called whenever we submit a new comment
// Save the new comment to the db and refresh the list
var handleCommentSubmit = function(event) {
  event.preventDefault();

  var example = {
    text: $comment.val().trim()
  };
  // console.log("log check" + $exampleText);
  if (!comment) {
    alert("You must enter a comment!");
    return;
  }

  API.saveComment(example).then(function() {
    refreshComments();
  });

  $comment.val("");
};

// handleDeleteBtnClick is called when an example's delete button is clicked
// Remove the example from the db and refresh the list
var handleDeleteBtnClick = function() {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deleteExample(idToDelete).then(function() {
    refreshExamples();
  });
};

// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
$commentSubmitBtn.on("click", handleCommentSubmit);
$exampleList.on("click", ".delete", handleDeleteBtnClick);
