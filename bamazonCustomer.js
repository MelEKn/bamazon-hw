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
  customerPrompt();
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
  });
  console.log("\n");
  
}

function customerPrompt(){
  inquirer.prompt([

    {
      type: "input",
      name: "itemId",
      message: "Please enter the ID of the item you'd like to buy (enter q to quit): "
    },
  
    {
      type: "input",
      name: "howMany",
      message: "How many would you like to buy?"
    }
  ]).then(function(answer) {
    if(answer.itemId==="q"){
      console.log("Thank you, please come again soon!");
      connection.end();
    }

  });
}

function addSpaces(num){

  var spaces = "";
  for(var i=0;i<num;i++){
    spaces += " ";
  }
  return spaces;
}