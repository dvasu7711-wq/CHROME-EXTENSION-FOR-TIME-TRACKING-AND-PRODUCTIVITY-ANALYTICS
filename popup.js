function loadData() {
  fetch("http://localhost:3000/data")
    .then(res => res.json())
    .then(data => {

      let total = data.length;
      let productive = data.filter(d => d.category === "productive").length;
      let unproductive = data.filter(d => d.category === "unproductive").length;

      document.getElementById("result").innerHTML = `
        <p>Total Records: ${total}</p>
        <p style="color:green;">Productive: ${productive}</p>
        <p style="color:red;">Unproductive: ${unproductive}</p>
      `;
    });
}

document.getElementById("showStats").addEventListener("click", loadData);