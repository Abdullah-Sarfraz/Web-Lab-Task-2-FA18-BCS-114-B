$(function () {
  load_Products();
  $("#products").on("click", ".btn-danger", handle_Delete);
  $("#products").on("click", ".btn-warning", handle_Update);
  $("#addbtn").click(add_Product);
  $("#update_record").click(function () {
    var id = $("#updateID").val();
    var name = $("#updateName").val();
    var price = $("#updatePrice").val();
    var color = $("#updateColor").val();
    var department = $("#updateDepartment").val();
    var description = $("#updateDescription").val();
    $.ajax({
      url: "https://usman-recipes.herokuapp.com/api/products/" + id,
      data: { name, price, color, department, description },
      method: "PUT",
      success: function (response) {
        console.log(response);
        load_Products();
        $("#updateProduct").modal("hide");
      },
    });
  });
});

function handle_Update() {
  var btn = $(this);
  var parentDiv = btn.closest(".product");
  let id = parentDiv.attr("data-id");
  $.get(
    "https://usman-recipes.herokuapp.com/api/products/" + id,
    function (response) {
      $("#updateID").val(response._id);
      $("#updateName").val(response.name);
      $("#updatePrice").val(response.price);
      $("#updateColor").val(response.color);
      $("#updateDepartment").val(response.department);
      $("#updateDescription").val(response.description);
      $("#updateProduct").modal("show");
    }
  );
}

function add_Product() {
  var name = $("#name").val();
  var price = $("#price").val();
  var color = $("#color").val();
  var department = $("#department").val();
  var description = $("#description").val();
  $.ajax({
    url: "https://usman-recipes.herokuapp.com/api/products",
    method: "POST",
    data: { name, price, color, department, description },
    success: function (response) {
      console.log(response);
      $("#name").val("");
      $("#price").val("");
      $("#color").val("");
      $("#department").val("");
      $("#description").val("");
      load_Products();
    },
  });
}

function handle_Delete() {
  var btn = $(this);
  var parentDiv = btn.closest(".product");
  let id = parentDiv.attr("data-id");
  console.log(id);
  $.ajax({
    url: "https://usman-recipes.herokuapp.com/api/products/" + id,
    method: "DELETE",
    success: function () {
      load_Products();
    },
  });
}
function load_Products() {
  $.ajax({
    url: "https://usman-recipes.herokuapp.com/api/products",

    method: "GET",
    success: function (response) {
      console.log(response);
      var products = $("#products");
      products.empty();
      for (var i = 0; i < response.length; i++) {
        var rec = response[i];
        products.append(
          `<div class="product" data-id="${rec._id}">
          <h3 class="sub-heading"> ${rec.name} </h3>
          <p>  $${rec.price}<br>
               ${rec.color}
          <button class="btn btn-danger btt">Delete</button>
          <button class="btn btn-warning btt">Edit</button><br>
               ${rec.department}<br>
               ${rec.description}
          </p>
          </div>`
        );
      }
    },
  });
}
