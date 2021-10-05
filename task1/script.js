document.getElementById("file").onchange = function () {
  var file = this.files[0];

  var reader = new FileReader();
  reader.onload = function (progressEvent) {
    var lines = this.result.split("\n");
    let testCase = parseInt(lines[0]);
    let result = document.getElementById("result");
    let textResult = "";
    let newLine = "\n";

    function saveOutput() {
      var blob = new Blob([textResult], {
        type: "text/plain;charset=utf-8",
      });
      saveAs(blob, "output1.txt");
    }

    function personalScore(l, m, n, plc, index) {
      let cup = 0;
      let count = 0;
      for (let i = 0; i < l; i++) {
        count = count + plc[i];
        if (count > m) {
          cup++;
        }
      }
      textResult = textResult.concat(`Case #${index}: ${cup}` + newLine);
      if (index === testCase) {
        saveOutput();
      }
    }

    let j = 1;
    for (var i = 1; i <= testCase; i++) {
      let arrData = lines[j].split(" ").map(function (value) {
        return parseInt(value);
      });
      let arrPLC = lines[j + 1].split(" ").map(function (value) {
        return parseInt(value);
      });

      personalScore(arrData[0], arrData[1], arrData[2], arrPLC, i);
      j = j + 2;
    }
  };
  reader.readAsText(file);
};
