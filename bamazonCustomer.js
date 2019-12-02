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

//The below shows the user the table of items for sale, their IDs, department, price, and how many are in the inventory

function displayItems() {
  var displayString = "\nItem ID:   ";
  displayString += "Item:" + addSpaces(18);
  displayString += "Department:" + addSpaces(13);
  displayString += "Price:" + addSpaces(17);
  displayString += "Inventory:" + "\n\n";

  var maxID = 0;

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
      maxID = i;
    }
    maxID++;
    console.log(displayString);
    console.log("-----------------------------------");
    customerPrompt(maxID);
  });
  console.log("\n");
  
}

function customerPrompt(maxID){
  inquirer.prompt([
    {
      type: "input",
      name: "itemId",
      message: "Please enter the ID of the item you'd like to buy (enter q to quit): "
    }
  ]).then(function(response){
    //Ends program if the user chooses "q"
    if(response.itemId==="q"){
      connection.end();
    }
    //Error response if the user choses an invalid ID number
    //And then goes back to the beginning of the program
    else if(response.itemId>maxID){
      console.log("I'm sorry, that is not a valid ID number. Please try again!");
      console.log("These are the items available for sale: ");
     displayItems(); 
    }
    else{
      inquirer.prompt( {
        type: "input",
        name: "howMany",
        message: "How many would you like to buy?"
      }).then(function(answer) {
      //sends the itemId the user chose and the amount and sends it to the function readProducts()
        readProducts(response.itemId, answer.howMany);
        
        });
  
    }
  }) 
}

//This function takes "num", which is the number of spaces that should be added to the display in order for the display of items for sale to line up correctly on the user's screen. It returns a string with "num" many spaces.

function addSpaces(num){
  var spaces = "";
  for(var i=0;i<num;i++){
    spaces += " ";
  }
  return spaces;
}

//The following function gets the information for the row of the table that matches the item_id the user entered

function readProducts(itemId, amount) {
  var queryText = "SELECT * FROM products WHERE ?"
  connection.query(queryText, [
    {
      item_id: itemId
    }
  ], function(err, res) {
    if (err) throw err;

    // Checks if the user is asking to buy more of an item than is in the inventory. 
    if(amount>res[0].stock_quantity){

    //If so, they are given an error message. It's a prompt so that the program doesn't take the user back to the opening screen until they enter any key (or "q" to quit)
    inquirer.prompt([
      {
        type: "input",
        name: "continue",
        message: "I'm sorry, there are only " + res[0].stock_quantity + " " + res[0].product_name + "(s) in stock. Please try again! \n Please choose any key to continue, or q to quit:"
      }
    ]).then(function(response){
     
   //if the user chooses "q", the program ends. Otherwise, it returns the user to the opening screen to buy more products

      if(response.itemId==="q"){
        connection.end();
      }
      else{
        displayItems();
      }
    });
  }
    //If the program runs the next part, then the amount of an item the user is asking to buy is less than or equal to the available inventory. 
    else{
    var newAmount = res[0].stock_quantity - amount;

    //calls the function that updates the database
    updateProducts(itemId, newAmount);
    var totalCost = res[0].price * amount;
    totalCost = totalCost.toFixed(2);

    //informs the user of the total cost
    //it's a prompt so that the message stays on the screen until the user chooses a key (or enters "q" for quit)
    inquirer.prompt([
      {
        type: "input",
        name: "userInput",
        message: "Successful purchase! You have bought " + amount + " " + res[0].product_name + "(s). \n Total Cost: $" + totalCost + ".\n Please choose any key to continue, or q to quit."
      }
    ]).then(function(response){
      switch(response.userInput){
        case "q": 
          connection.end();
          break;
        default: 
          displayItems();
      }
  });
}
});
}


//This function updates the database with the new amount of stock for the item that the user purchased
function updateProducts(itemId, newAmount){
    var queryText = "UPDATE products SET ? WHERE ?";

    var query = connection.query(queryText, 
      [
        {
          stock_quantity: newAmount
        },
        {
          item_id: itemId
        }
      ],
      function(err, res){
        if (err) throw err;
       // console.log(res.affectedRows + " products updated!\n");
      });
}