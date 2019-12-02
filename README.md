# bamazon-hw
Bamazon Project

The Bamazon Project is a command-line node application making use of a MySQL Database. 

When the user runs the program, it begins by displaying a table, "Products", which is contained in the database "Bamazon_db", that shows a variety of items for sale, as well as their Item ID, Department, Price, and Inventory (that is, how many of the items are available). It looks like this: 

![Initial User Display](/images/bamazon-initial-display.jpg)

The user is prompted to enter the ID number of the item they wish to buy. If they enter an invalid ID number, they are told so, and then the initial screen is shown again: 

![Invalid Item ID Zoomed In](/images/zoom-in-invalid-id.jpg)
![Invalid Item ID Whole Screen](/images/whole-screen-invalid-id.jpg)

If the user enters a valid ID number, then the app asks them how many of the item they wish to purchase. 

If they enter a number that is greater than the amount in stock-- than how many is in the "stock_quantity" column in the Products table-- then they are given an error message that says so, and then returns the user to the opening screen so they can try again: 

![Not Enough Items in Stock](/images/bamazon-not-enough-inventory.jpg)

If the user enters an amount that is less than or equal to how many are in stock, then the user is given a message that the purchase was successful, and is told the total price (to 2 decimal places, as in dollars and cents). Then they are told to either choose any key, or to press "q" to quit. 

![User makes purchase and then continues](/images/bamazon-continue-after-purchase.jpg)

If the user presses any key besides "q", they are returned to the opening screen so that they can complete another purchase. If they select "q", the connection is ended, and the program closes. 

Here is a video of the program being used: https://drive.google.com/file/d/11nT7mM954gfx8hx80-N_NcK3fy-XxSrw/view

NPM Packages used: MySQL, Inquirer, DotENV

Technologies used: Javascript, MySQL Workbench

Author: Melissa Knapp
Portfolio: https://melekn.github.io/Responsive-Portfolio/portfolio.html 

Melissa Knapp was the sole developer of this Liri Node App. She used instructions provided by Trilogy Education Services and received assistance from Instructor Dave Leonhardt and Teaching Assistants Shelby Reyes and Kathryn Breslyn. 