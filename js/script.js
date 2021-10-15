
function AreaChart(container){

	// initialization

    const margin = ({top: 20, right: 20, bottom: 60, left: 50})

    const width = 850 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;
    
    const svg = d3.select(container).append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    
    const xScale = d3
        .scaleTime()
        .domain()
        .nice()
    
    const yScale = d3
        .scaleLinear()
        .domain()
        .range([0,height])
    
    
    const xAxis = d3.axisBottom()
        .scale(xScale)
        .ticks(10, "s")
    
        svg.append("g")
        .attr("class", "axis x-axis")
        .call(xAxis)
        .attr("transform", `translate(0, ${height})`)
    
    const yAxis = d3.axisLeft()
        .scale(yScale)
        .ticks(10, "s")
    
        svg.append("g")
        .attr("class", "axis y-axis")
        .call(yAxis)
        .attr("transform", `translate(0, 0)`)
    
        svg.append("text")
        .attr("class", "y label")
        .attr("text-anchor", "end")
        .attr("y", -50)
        .attr("dy", ".75em")
        .attr("transform", "rotate(-90)")
        .text("Unemployment");

	function update(data){ 

        xScale.domain(d3.extent(d=>d.date))
        yScale.domain([0, d3.max(d=>d.total)])


		// update scales, encodings, axes (use the total count)
		
	}

	return {
		update // ES6 shorthand for "update": update
	};
}



//data.map(d => d.stores)
d3.csv('unemployment.csv', d3.autoType).then(data=>{
    
    for (let i=0 ; i<data.length; i++) {
        x = data[i]
        let total = 0
        for (let property in x) {
            if (`${property}` != 'date') {
                total += x[property]
            }
        }
        x.total = total;
        //console.log('total', total)
    }

    console.log(data)

    svg.selectAll('rect')
		.data(data, (d) => d)
		.enter()
		.append('rect')
        .attr('x', d=>xScale(d.date))
        .attr('y', d=>yScale(d.Manufacturing))
        .attr('width', xScale.bandwidth())
        //.attr('height', d=>height - yScale(d.date))
        .attr('height', height)
        .attr('stroke', 'black')
        .attr('fill', '#69a3b2');

})