fetch("http://localhost:3000/data")
  .then(res => res.json())
  .then(data => {

    let productive = 0;
    let unproductive = 0;
    let neutral = 0;

    let html = "";

    data.forEach(d => {
      if (d.category === "productive") productive += d.time;
      else if (d.category === "unproductive") unproductive += d.time;
      else neutral += d.time;

      html += `
        <div class="card ${d.category}">
          <b>${d.site}</b><br>
          Time: ${d.time.toFixed(2)} sec<br>
          Category: ${d.category}
        </div>
      `;
    });

    html =
      `<h3>Summary</h3>
      <p>🟢 Productive: ${productive.toFixed(2)} sec</p>
      <p>🔴 Unproductive: ${unproductive.toFixed(2)} sec</p>
      <p>🟡 Neutral: ${neutral.toFixed(2)} sec</p>
      <hr>` + html;

    document.getElementById("chart").innerHTML = html;
  });