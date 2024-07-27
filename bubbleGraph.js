document.addEventListener('DOMContentLoaded', function () {
    const canvas = d3.select("#bubbleCanvas")
        .append("svg")
        .attr("width", 800)
        .attr("height", 600);

    console.log("Script loaded");

    fetch('https://antoninapopova.github.io/bubble-chart-data/data.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log("Data received:", data);
            
            // Access the 'Sheet1' property of the data object
            const bubblesData = data.Sheet1;
            console.log("Binding data:", bubblesData);

            const bubbles = canvas.selectAll(".bubble")
                .data(bubblesData)  // Use the fetched data
                .enter()
                .append("circle")
                .attr("class", "bubble")
                .attr("cx", d => d.x)
                .attr("cy", d => d.y)
                .attr("r", d => d.size)
                .style("fill", "blue")
                .on("click", function(event, d) {
                    d3.select(this).transition()
                        .duration(500)
                        .attr("r", d.size * 1.5);  // Enlarge on click
                    alert(`Size: ${d.size}, Order: ${d.order}`);
                });
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
});
