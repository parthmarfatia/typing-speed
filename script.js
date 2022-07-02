async function start() {
  try {
    let randNum = Math.floor(Math.random() * 51) + 1;
    let response = await fetch(`https://bible-api.com/john%201:${randNum}`);
    let data = await response.json();
    let placeHolderVal = data.text;
    placeHolderVal = placeHolderVal
      .replaceAll("”", '"')
      .replaceAll("“", '"')
      .replaceAll("’", "'")
      .replaceAll("‘", "'");
    let inputVal = document.querySelector("#inputVal");
    let errorCount = 0;
    let count = 0;
    let avgSpeed = 0;
    let errorFlag = false;
    document
      .querySelector("#placeHolderVal")
      .setAttribute("placeholder", placeHolderVal);
    inputVal.addEventListener("input", async function () {
      let store = this.value;
      let len = store.length;
      if (len === 1) {
        startTime = performance.now();
        console.log(startTime);
      }
      if (len === placeHolderVal.length - 1) {
        var endTime = performance.now();
        let speed = Math.floor(
          placeHolderVal.length / 6 / ((endTime - startTime) / (1000 * 60))
        );
        document.querySelector("#currentSpeed").textContent = speed + " wpm";
        let accuracy = Math.floor(
          ((placeHolderVal.length - errorCount) / placeHolderVal.length) * 100
        );
        document.querySelector("#accuracy").textContent = accuracy + "%";
        errorCount = 0;
        count++;
        avgSpeed += speed;
        document.querySelector("#avgSpeed").textContent =
          Math.floor(avgSpeed / count) + " wpm";
        randNum = Math.floor(Math.random() * 51) + 1;
        response = await fetch(`https://bible-api.com/john%201:${randNum}`);
        data = await response.json();
        placeHolderVal = data.text;
        placeHolderVal = placeHolderVal
          .replaceAll("”", '"')
          .replaceAll("“", '"')
          .replaceAll("’", "'")
          .replaceAll("‘", "'");
        inputVal = document.querySelector("#inputVal");
        inputVal.value = "";
        document
          .querySelector("#placeHolderVal")
          .setAttribute("placeholder", placeHolderVal);
      } else if (store === placeHolderVal.slice(0, len)) {
        this.style.outlineColor = "green";
        errorFlag = false;
      } else {
        this.style.outlineColor = "red";
        this.value = store.slice(0, len - 1);
        if (!errorFlag) {
          errorCount++;
          errorFlag = true;
        }
      }
    });
  } catch (e) {
    console.log("problem!");
  }
}

document.addEventListener("click", start());
