const principal = document.querySelector("#principal");
const slider = document.querySelector("#interest");
const sliderOutput = document.querySelector("#interestoutput");
const compoundingFrequency = document.querySelector("#compfreq");
const time = document.querySelector("#years");
const total = document.querySelector("#total");
const interest = document.querySelector("#accumulate");

principal.addEventListener("input", calculator);
slider.addEventListener("input", calculator);
time.addEventListener("input", calculator);

slider.addEventListener("input", (e) => {
  sliderOutput.textContent = slider.value;
});

//turns the interest compounding interval select element into a calculable number
function interval(compfreq) {
  if (compfreq.value == "yearly") {
    const CF = 1;
    return CF;
  }
  if (compfreq.value == "quarterly") {
    const CF = 4;
    return CF;
  }
  if (compfreq.value == "monthly") {
    const CF = 12;
    return CF;
  }
  if (compfreq.value == "daily") {
    const CF = 365;
    return CF;
  }
}

//if the number is too high for js to represent,
//this function returns a message, to avoid the NaN error
function print_number(value, editable, isTotal) {
  if (isTotal == true) {
    editable.textContent = "Total: $" + value.toFixed(2);
  } else {
    editable.textContent = "Interest: $" + value.toFixed(2);
  }
}

//actual calculator
function calculator() {
  interest.textContent = "";
  total.textContent = "";
  const P = parseFloat(principal.value);
  const I = parseFloat(slider.value) / 100;
  const Y = parseFloat(time.value);
  const CF = interval(compoundingFrequency);
  if (isNaN(P) || isNaN(I) || isNaN(Y) || isNaN(CF)) {
    total.textContent = "...";
  } else {
    const returnable = P * (1 + 100) ** (Y * CF);
    const i = returnable - P;
    print_number(i, interest, false);
    print_number(returnable, total, true);
  }
}
