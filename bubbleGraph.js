document.addEventListener('DOMContentLoaded', function () {
    const canvas = d3.select("#bubbleCanvas")
        .append("svg")
        .attr("width", 800)
        .attr("height", 600);

    console.log("Script loaded");

    fetch('https://antoninapopova.github.io/bubble-chart-data/data.json')  // Use the full URL
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log("Data received:", data);  // Check what data is received
            const bubbles = canvas.selectAll(".bubble")
                .data(data)  // Use the fetched data
                .enter()
                .append("circle")
                .attr("class", "bubble")
                .attr("cx", d => d.x)  // Ensure your Excel data has 'x' and 'y' columns
                .attr("cy", d => d.y)
                .attr("r", d => d.size)
                .style("fill", "blue")
                .on("click", function(event, d) {
                    d3.select(this).transition()
                        .duration(500)
                        .attr("r", d.size * 1.5);  // Enlarge on click

                    alert(`Size: ${d.size}, Order: ${d.order}`);  // Display data
                });
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
});
