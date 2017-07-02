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
var HTMLdat = "";
var math = "";
var arrayinfo = [];
var inputsHTML = "";
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
  if (
    document.getElementsByClassName("notnamed").length > 0 ||
    document.getElementsByClassName("named").length === 0
  ) {
    alert("please name all variables");
  } else {
    mynodelist = document.getElementsByClassName("named");
    // for (var V = 0; V < mynodelist.length; V++) {
    //   arrayinfo.push(mynodelist[V].value);
    // }
    // console.log(arrayinfo);
    for (var RN = 0; RN < 1000; RN++) {
      math = Math.floor(Math.random() * mynodelist.length);
      // simulationArea.innerhtml += RN + " " + math + arrayinfo + "<br>";s
      if (matharray.indexOf(mynodelist[math].value) === -1) {
        matharray.unshift(mynodelist[math].value);
        HTMLdat += "Literation " + matharray.length + "<div class='resultblock'> " + matharray[0] + "<br></div>";
      }
      if (matharray.length === mynodelist.length) {
        break;
      }
    }
    simulationArea.innerHTML = HTMLdat;
    Variables.innerHTML = "";
    Variables.style.width = "0px";
  }
};
// <input id='checkyes' type='checkbox' onclick='(document.getElementById(" + '"' +"checkno" + '"' + ").checked = false;) checked><input id='checkno' type='checkbox' onclick='(document.getElementById(" + '"' +"checkyes" + '"' + ").checked = false;)>
var equation = function equation() {
  if (
    document.getElementsByClassName("notnamed").length > 0 ||
    document.getElementsByClassName("named").length === 0
  ) {
    alert("please name all variables");
  } else {
    mynodelist = document.getElementsByClassName("named");
    Variables.innerHTML =
      "<span>Literations<input id='literations' type='number' step='1' min='10' max='1000' onchange='percentcheck(this)' value='10'></span>";
  }
};

function RunSimulationPercent() {
  var literations = parseInt(document.getElementById("literations").value);
  var Lsafe = true;
  var Ptotal = true;
  if (literations < 10 || literations > 1000) {
    alert("literations Cannot be more than 1000 or less than 10");
    Lsafe = false;
  }
  if (
    Number(percenttotalbox.innerHTML) > 100 &&
    document.getElementById("checkno").checked
  ) {
    alert(
      "the sum of the percents of your variables cannot exceed 100% if you do not allow multiple results per literation."
    );
    Ptotal = false;
  }
  if (Ptotal && Lsafe) {
    for (var P = 0; P < literations; P++) {
      if (document.getElementById("checkyes").checked){
      inputsHTML = "";
        for (var PL = 0; PL < mynodelist.length; PL++) {
       math = Math.floor(Math.random() * 100);
      console.log(math.toFixed(2));
        if (Number(mynodelist[PL].value) >= math) {
          inputsHTML += " " + arrayinfo[PL] + ". ";
        }
      } 
        math = P + 1;
simulationArea.innerHTML += "<div class='resultblock'>" + math + inputsHTML + "</div>";
    }
    }
  }
}
function percentcheck() {
  math = 0;
  for (var Ar = 0; Ar < mynodelist.length; Ar++) {
    math += Number(mynodelist[Ar].value);
  }
  percenttotalbox.innerHTML = math.toFixed(2);
}
var percentchoices = function percentchoices() {
  if (
    document.getElementsByClassName("notnamed").length > 0 ||
    document.getElementsByClassName("named").length === 0
  ) {
    alert("please name all variables");
  } else {
    mynodelist = document.getElementsByClassName("named");
    math = mynodelist.length;
    for (var Ar = 0; Ar < mynodelist.length; Ar++) {
      arrayinfo.push(mynodelist[Ar].value);
      inputsHTML +=
        "<br><span class='width'>" +
        mynodelist[Ar].value +
        "<input type='number' step='0.01' class='arrayodds'  min='0.01' max='99.98' onchange='percentcheck()' value='0.01'>&nbsp&nbsp&nbsp</span>";
    }
    Variables.innerHTML =
      "<p>Total amount of named variables: " +
      VariableAmount.value +
      "</p><br><p>Percent odds of variables: <span id='percent'></span></p>" +
      inputsHTML +
      "<br>Allow multiple results per literation? YES <input id='checkyes' type='checkbox' onclick='(document.getElementById(" + '"' + "checkno" + '"' + ").checked = false)' checked> NO <input id='checkno' type='checkbox' onclick='(document.getElementById(" + '"' + "checkyes" + '"' + ").checked = false)'><span>Literations<input id='literations' type='number' step='1' min='10' max='1000' onchange='percentcheck(this)' value='10'></span><input id='Submit' onclick='RunSimulationPercent()' type='submit' value='Submit for simulation'>";
    percenttotalbox = document.getElementById("percent");
    math = math * 0.01;
    percenttotalbox.innerHTML = math;
    mynodelist = document.getElementsByClassName("arrayodds");
  }
};
VariableAmount.addEventListener("input", pressEnter);
VariableAmount.addEventListener("change", VariableChange);
submitp.addEventListener("mouseup", percentchoices);
submit1.addEventListener("mouseup", randomorder);
submite.addEventListener("mouseup", equation);