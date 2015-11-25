///////////////////////////////////////////////////////////////////////
//                             Variables                             //
///////////////////////////////////////////////////////////////////////

// html elements are given javascript variables:
var display = document.getElementById('display');
var ac = document.getElementById('ac');
var c = document.getElementById('c');
var root = document.getElementById('root');
var exp = document.getElementById('exp');
var seven = document.getElementById('7');
var eight = document.getElementById('8');
var nine = document.getElementById('9');
var divide = document.getElementById('divide');
var four = document.getElementById('4');
var five = document.getElementById('5');
var six = document.getElementById('6');
var times = document.getElementById('times');
var one = document.getElementById('1');
var two = document.getElementById('2');
var three = document.getElementById('3');
var minus = document.getElementById('minus');
var zero = document.getElementById('0');
var dec = document.getElementById('dec');
var equal = document.getElementById('equal');
var plus = document.getElementById('plus');

// Operands variables, operand strings, and operators
var operand1 = 0;
var operandString1 = "off";
var operand2 = 0;
var operandString2 = "";
var operator = "";

// Other variables
var operand1On = true;
var calculatorOn = false;

///////////////////////////////////////////////////////////////////////
//                          Event Listeners                          //
///////////////////////////////////////////////////////////////////////

// Clicking AC turns the calc on and off
ac.addEventListener('click', function(){
  calculatorOn = true;
  reset();
});
// Clicking C resets the calculator
c.addEventListener('click', function(){
  if(calculatorOn){reset();}});
// Clicking a number, zero, or decimal adds the respective unit to an
// operand
one.addEventListener('click', numPress1);
two.addEventListener('click', numPress2);
three.addEventListener('click', numPress3);
four.addEventListener('click', numPress4);
five.addEventListener('click', numPress5);
six.addEventListener('click', numPress6);
seven.addEventListener('click', numPress7);
eight.addEventListener('click', numPress8);
nine.addEventListener('click', numPress9);
dec.addEventListener('click', numPressDec);
zero.addEventListener('click', numPress0);

// Clicking an operator will store the first operand and
plus.addEventListener('click', addition);
minus.addEventListener('click', subtraction);
times.addEventListener('click', multiplication);
divide.addEventListener('click', division);
exp.addEventListener('click', powerExp);
root.addEventListener('click', powerRoot);

// Clicking on the equal button will evaluate the expression
equal.addEventListener('click', evaluate);

// Keystrokes listener:
document.addEventListener('keypress', function(k){
  if(k.keyCode === 49){numPress1()}
  else if(k.keyCode === 50){numPress2()}
  else if(k.keyCode === 51){numPress3()}
  else if(k.keyCode === 52){numPress4()}
  else if(k.keyCode === 53){numPress5()}
  else if(k.keyCode === 54){numPress6()}
  else if(k.keyCode === 55){numPress7()}
  else if(k.keyCode === 56){numPress8()}
  else if(k.keyCode === 57){numPress9()}
  else if(k.keyCode === 58){numPress0()}
  else if(k.keyCode === 46){numPressDec()}
  else if(k.keyCode === 61){addition()}
  else if(k.keyCode === 45){subtraction()}
  else if(k.keyCode === 42){multiplication()}
  else if(k.keyCode === 47){division()}
  else if(k.keyCode === 94){powerExp()}
  else if(k.keyCode === 63){powerRoot()} //not picked
  else if(k.keyCode === 13){evaluate()} //not picked
  else if(k.keyCode === 60){reset()} //not picked
});

///////////////////////////////////////////////////////////////////////
//                             Functions                             //
///////////////////////////////////////////////////////////////////////

// "print" prints values to the calculator display
function print(str){
  display.innerHTML = str;
}

// Reset is used to set the calculator display and operand1 value to 0
function reset(){
  operand1On = true;
  operand1 = 0;
  operandString1 = "";
  print(operand1);
}

// ShortEnough checks if the operandString is short enough to allow
// another character.
function shortEnough(str){
  if(str.length<11){
    return true;
  } else {
    return false;
  }
}

// The operator functions check if the calc is "on" and if the first
// operand string exists, then store it as a number, deletes it, and
// prints the operator to the screen while storing it's value.
function addition(){
  if(operandString1 != "" && calculatorOn){
    operand1 = Number(operandString1);
    operand1On = false;
    operandString1 = ""
    print("plus");
    operator = "plus"
  }
}
function subtraction(){
  if(operandString1 != "" && calculatorOn){
    operand1 = Number(operandString1);
    operand1On = false;
    operandString1 = ""
    print("minus");
    operator = "minus";
  }
}
function multiplication(){
  if(operandString1 != "" && calculatorOn){
    operand1 = Number(operandString1);
    operand1On = false;
    operandString1 = "";
    print("times");
    operator = "times";
  }
}
function division(){
  if(operandString1 != "" && calculatorOn){
    operand1 = Number(operandString1);
    operand1On = false;
    operandString1 = "";
    print("divided by");
    operator = "divided";
  }
}
function powerExp(){
  if(operandString1 != "" && calculatorOn){
    operand1 = Number(operandString1);
    operand1On = false;
    operandString1 = "";
    print("to the");
    operator = "power";
  }
}
function powerRoot(){
  if(operandString1 != "" && calculatorOn){
    operand1 = Number(operandString1);
    operand1On = false;
    operandString1 = "";
    print("rooted by");
    operator = "root";
  }
}

// Evaluate returns the value of the calcluation.  It checks that
// there's an operatorString 2 and that the calc is on, then it turns
// the operator string to a number and declares the result variable.
// The switch checks for the operator and makes result equal the
// operation result.  Operand1 is set to the result and operand2string
// is set to null.  The result only prints if it can fit in the calc.
function evaluate(){
  if(operandString2 != "" && calculatorOn){
    operand2 = Number(operandString2);
    var result = 0;
    switch(operator){
      case "plus":
        result = operand1 + operand2; break;
      case "minus":
        result = operand1 - operand2; break;
      case "times":
        result = operand1 * operand2; break;
      case "divided":
        result = operand1/operand2; break;
      case "power":
        result = Math.pow(operand1, operand2); break;
      case "root":
        operand2 = 1/operand2;
        result = Math.pow(operand1, operand2); break;
    }
    operandString1 = result.toString();
    if(operandString1.length<11){
      print(result);
    } else if(result < 10000000){
      result = Math.round(result * 1000)/1000;
      print(result);
      operandString1 = result.toString();
    } else{
      print("num big af");
      operand1On = true;
      operandString1 = "";
    }
    operandString2 = "";
  }
}

// The numPress functions add a number to the appropriate operand string
// and prints it, as long as the calc is on and the string isn't too
// long.
function numPress1(){
  if(calculatorOn){
    if(operand1On && shortEnough(operandString1)){
      operandString1 += "1";
      print(operandString1);
    }else if (!operand1On && shortEnough(operandString2)){
      operandString2 += "1";
      print(operandString2);
}}}
function numPress2(){
  if(calculatorOn){
    if(operand1On && shortEnough(operandString1)){
      operandString1 += "2";
      print(operandString1);
    }else if (!operand1On && shortEnough(operandString2)){
      operandString2 += "2";
      print(operandString2);
}}}
function numPress3(){
  if(calculatorOn){
    if(operand1On && shortEnough(operandString1)){
      operandString1 += "3";
      print(operandString1);
    }else if (!operand1On && shortEnough(operandString2)){
      operandString2 += "3";
      print(operandString2);
}}}
function numPress4(){
  if(calculatorOn){
    if(operand1On && shortEnough(operandString1)){
      operandString1 += "4";
      print(operandString1);
    }else if (!operand1On && shortEnough(operandString2)){
      operandString2 += "4";
      print(operandString2);
}}}
function numPress5(){
  if(calculatorOn){
    if(operand1On && shortEnough(operandString1)){
      operandString1 += "5";
      print(operandString1);
    }else if (!operand1On && shortEnough(operandString2)){
      operandString2 += "5";
      print(operandString2);
}}}
function numPress6(){
  if(calculatorOn){
    if(operand1On && shortEnough(operandString1)){
      operandString1 += "6";
      print(operandString1);
    }else if (!operand1On && shortEnough(operandString2)){
      operandString2 += "6";
      print(operandString2);
}}}
function numPress7(){
  if(calculatorOn){
    if(operand1On && shortEnough(operandString1)){
      operandString1 += "7";
      print(operandString1);
    }else if (!operand1On && shortEnough(operandString2)){
      operandString2 += "7";
      print(operandString2);
}}}
function numPress8(){
  if(calculatorOn){
    if(operand1On && shortEnough(operandString1)){
      operandString1 += "8";
      print(operandString1);
    }else if (!operand1On && shortEnough(operandString2)){
      operandString2 += "8";
      print(operandString2);
}}}
function numPress9(){
  if(calculatorOn){
    if(operand1On && shortEnough(operandString1)){
      operandString1 += "9";
      print(operandString1);
    }else if (!operand1On && shortEnough(operandString2)){
      operandString2 += "9";
      print(operandString2);
}}}
function numPressDec(){
  if(calculatorOn){
    if(operand1On && shortEnough(operandString1)){
      operandString1 += ".";
      print(operandString1);
    }else if (!operand1On && shortEnough(operandString2)){
      operandString2 += ".";
      print(operandString2);
}}}
// This one has an additional control making sure that "0" can only be
// added after a non-zero integer
function numPress0(){
  if(calculatorOn){
    if(operand1On && shortEnough(operandString1) && operandString1 != "0" && operandString1!= ""){
      operandString1 += "0";
      print(operandString1);
    }else if(!operand1On && shortEnough(operandString2) && operandString2 != "0" && operandString2 != ""){
      operandString2 += "0";
      print(operandString2);
}}}



///////////////////////////////////////////////////////////////////////
//                               To Do                               //
///////////////////////////////////////////////////////////////////////
/*

1. Allow for negatives.
2. Function for get operand1
3. Cut down on code for numb presses
4. cut down on codes for operator presses
5. Button click animations and sounds
6. Trig functions.

*/




