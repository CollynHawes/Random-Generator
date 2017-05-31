var submitp = document.getElementById("Submitp");
var submit1 = document.getElementById("Submit1");
var submite = document.getElementById("Submite");
var First = document.getElementById("First");
var VariableAmount = document.getElementById("VariableAmount");
var Variablelist = document.getElementById("VariableList");
var AvailableInputs = Variablelist.getElementsByTagName("input");
var Variables = document.getElementById("Variables");
var simulationArea = document.getElementById("simulationArea");
var percenttotalbox = "";
var mynodelist = "";
var matharray = [];
var math = "";
var arrayinfo = [];
var inputsHTML = "";
function RunSimulation() {}
function percentcheck(inputel) {
  //if this greater than 99.98
  percenttotal[0] = "yolo";
  percenttotalbox.innerHTML = "yolo";
}
function VariableChange() {
  var vartotal = Math.floor(parseFloat(this.value));
  this.value = vartotal;
  if (vartotal > 36) {
    this.value = 36;
    First.innerHTML = "No more than 36";
    First.style.color = "red";
  } else if (vartotal < 2) {
    this.value = 2;
    First.innerHTML = "must have atleast 2";
    First.style.color = "red";
  } else {
    First.innerHTML = "Total amount of named variables";
    First.style.color = "black";
  }
  while (AvailableInputs.length > parseFloat(this.value) - 1) {
    Variablelist.removeChild(Variablelist.lastChild);
  }
  while (AvailableInputs.length < parseFloat(this.value)) {
    var newInput = document.createElement("input");
    newInput.type = "text";
    var count = AvailableInputs.length + 1;
    newInput.value = "not named " + count;
    newInput.onclick = "newInput.select()";
    newInput.onchange = nowNamed;
    newInput.className = "notnamed";
    Variablelist.appendChild(newInput);
  }
}
var nowNamed = function nowNamed() {
  this.className = "named";
};
function pressEnter() {
  First.innerHTML = "press enter.";
  First.style.color = "darkred";
}
var randomorder = function randomorder() {
  if (document.getElementsByClassName("notnamed").length > 0 || document.getElementsByClassName("named").length === 0) {
    alert("please name all variables");
  } else {
    Variables.innerHTML = "";
    Variables.style.width = "0px";
    mynodelist = document.getElementsByClassName("named");
    for (var V = 0; V < mynodelist.length; V++) {
      arrayinfo.push(mynodelist[V].value);
    }

    for (var RN = 0; RN < 20; RN++) {
      math = Math.floor(Math.random() * arrayinfo.length);
      simulationArea.innerhtml += RN + " " + math + arrayinfo + "<br>";
      if (matharray.indexOf(arrayinfo[math]) !== -1) {
        matharray.push(arrayinfo[math]);
      }

      if (matharray.length === mynodelist.length) {
        break;
      }
    }
    
    simulationArea.innerhtml = matharray;
  }
};
var equation = function equation() {
  if (document.getElementsByClassName("notnamed").length > 0) {
    alert("please name all variables");
  } else {
    
    mynodelist = document.getElementsByClassName("named");
   
    // math = V + 1;
    //   inputsHTML += "varaible " + math + ": "+ mynodelist[V].value + "&nbsp&nbsp";
    Variables.innerHTML = "yolo";
  }
};
var percentchoices = function percentchoices() {
  if (document.getElementsByClassName("notnamed").length > 0) {
    alert("please name all variables");
  } else {
    mynodelist = document.getElementsByClassName("named");
    for (var Ar = 0; Ar < mynodelist.length; Ar++) {
      arrayinfo.push(mynodelist[Ar].value);
      inputsHTML +=
        mynodelist[Ar].value +
        "<input type='number' step='0.01' class='arrayodds'  min='0.01' max='99.98' onchange='percentcheck(this.value)' value='0.01'>&nbsp&nbsp&nbsp";
    }
    Variables.innerHTML =
      "<p>Total amount of named variables: " +
      VariableAmount.value +
      "</p><br><p>Percent odds of variables apearing:<p id='percent'></p></p><div classname='oddbox'>" +
      inputsHTML +
      "</div> <input id='Submit' onchange='RunSimulation()' type='submit' value='Submit for simulation'>";
    percenttotalbox = document.getElementById("percent");
    mynodelist = document.getElementsByClassName("arrayodds");
  }
};
VariableAmount.addEventListener("input", pressEnter);
VariableAmount.addEventListener("change", VariableChange);
submitp.addEventListener("mouseup", percentchoices);
submit1.addEventListener("mouseup", randomorder);
submite.addEventListener("mouseup", equation);
