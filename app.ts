#! /usr/bin/env node
import inquirer from "inquirer"; 
import chalk from "chalk";

// initialize user balance and pincode
let myBalance = 10000;
let myPin = 1999;

//print welcome message at start 
console.log(chalk.blue("\n\t WELCOME to CodeWithBhagwati - ATM machine \n"));

let pinAnswer = await inquirer.prompt([
    {
        name : 'userpin',
        type : 'number' ,
        message : chalk.yellowBright('enter your pin :'),
    }
])
if(pinAnswer.userpin === myPin){
  console.log(chalk.green('\nyour pin is correct, login sucessfully\n'));


  let operationAns = await inquirer.prompt([
     {
       name:"operation",
       type : "list",
       message: chalk.yellowBright("select your operation"),
       choices : ['withdraw Amount', 'Checkout Balance'],
     }
  ])

if(operationAns.operation === 'withdraw Amount'){
  let withdrawAns = await inquirer.prompt([
    {
      name:"withdrawMethod",
      type:"list",
      message: chalk.yellowBright("select withdraw method"),
      choices:["fast cash","enter amount"]
    } 
  ])
    if(withdrawAns.withdrawMethod === "fast cash"){
      let fastCashAns = await inquirer.prompt([
        {
          name: "fashCash",
          type:'list',
          message : chalk.yellowBright("Select your Amount"),
          choices:[1000,2000,5000,10000,20000]
        }
      ])
      if(fastCashAns.fashCash > myBalance){
        console.log(chalk.redBright('\nInsufficient Balance'))
      }
      else{
           myBalance -=fastCashAns.fashCash
           console.log(chalk.greenBright(`\n${fastCashAns.fashCash}  Withdraw Successfully!`))
           console.log(chalk.cyanBright(`\n\tyour remaining balance is : ${myBalance}`))
      }
    }
    else if(withdrawAns.withdrawMethod === "enter amount"){
    let amountAns = await inquirer.prompt([
      {
         name:'Amount',
         type:'number',
         message: chalk.green('enter your amount to withdraw :'),
      }
  ])
      if(amountAns.Amount >myBalance){
      console.log(chalk.redBright('\nInsufficient Balance'));
      }
      else{
        myBalance -= amountAns.Amount
        console.log(chalk.green(`\n${amountAns.Amount}  withdraw Successfully!`));
        console.log( chalk.cyanBright(`\n\tyour remaining balance is : ${myBalance}\n`));
         }
  }
    
}
     else if(operationAns.operation === 'Checkout Balance'){
         console.log(chalk.cyanBright(`\nyour amount balance is : ${myBalance}\n`));
     }

        }       
else{
  console.log(chalk.redBright('\n\tpin is incorrect \n\t try again!'));
    }