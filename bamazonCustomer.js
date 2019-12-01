var mysql = require("mysql");
var inquirer = require("inquirer");
require("dotenv").config();


var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: process.env.MY_SQL_PASS,
  database: "bamazon_db"
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  displayItems();
  
});

function displayItems() {

  var displayString = "\nItem id:   ";
  displayString += "Item:" + addSpaces(18);
  displayString += "Department:" + addSpaces(13);
  displayString += "Price:" + addSpaces(17);
  displayString += "Inventory:" + "\n\n";

  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    for (var i = 0; i < res.length; i++) {
      displayString += "    " +  res[i].item_id;
      if(res[i].item_id<10){
        displayString += "    ";
      }
      else if(res[i].item_id>=10 && res[i].item_id<100){
        displayString += "   ";
      }
      displayString += " | " + res[i].product_name;
      displayString += addSpaces(20-res[i].product_name.length);
      displayString += " | " + res[i].department_name;
      displayString += addSpaces(20-res[i].department_name.length);
      displayString += " | " + res[i].price;

      var priceString = res[i].price.toString();

      displayString += addSpaces(20-priceString.length);
      displayString += " | " + res[i].stock_quantity;
      displayString += "\n";
    }
    console.log(displayString);
    console.log("-----------------------------------");
    customerPrompt();
  });
  console.log("\n");
  
}

function customerPrompt(){
  inquirer.prompt([

    {
      type: "input",
      name: "itemId",
      message: "Please enter the ID of the item you'd like to buy (enter q to quit): "
    }
  ]).then(function(response){
    if(response.itemId==="q"){
      connection.end();
    }
    else{
      inquirer.prompt( {
        type: "input",
        name: "howMany",
        message: "How many would you like to buy?"
      }).then(function(answer) {
        console.log("You want to buy " + answer.howMany + " of them");
        readProducts(response.itemId, answer.howMany);
        
        });
  
    }
  }) 
}

function addSpaces(num){

  var spaces = "";
  for(var i=0;i<num;i++){
    spaces += " ";
  }
  return spaces;
}

function readProducts(itemId, amount) {
  var queryText = "SELECT * FROM products WHERE ?"
  connection.query(queryText, [
    {
      item_id: itemId
    }
  ], function(err, res) {
    if (err) throw err;
    // Log all results of the SELECT statement
    console.log("You want to buy a " + res[0].product_name);
    console.log("res[0].stock_quantity is " + res[0].stock_quantity);

    // Checks if the user is asking to buy more of an item than is in the inventory. If so, they are given an error message, and brought back to the beginning, where the items are initially displayed.
    if(amount>res[0].stock_quantity){
      console.log("I'm sorry, there are only " + res[0].stock_quantity + " " + res[0].product_name + "(s) in stock. Please try again!");
      displayItems();
    }
    //If the program runs the next part, then the amount of an item the user is asking to buy is less than or equal to the available inventory. 


    //console.log(res);


  });
}

function updateProducts(itemId, amount){
    var queryText = "UPDATE products SET ? WHERE ?"


}