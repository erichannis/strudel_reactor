import { useEffect, useRef } from "react";
import * as d3 from "d3";

// Extract the gain values from strudel hap log line
function parseGain(logLine) {
    if (!logLine) return 0;

    const parts = logLine.split(/\s+/);
    for (const p of parts) {
        if (p.startsWith("gain:")) {
            const val = Number(p.substring(5));
            if (!isNaN(val)) {
                return val;
            }
        }
    }

    return 0;
}

export default function D3Graph({ data }) {
    // Reference to the SVG element
    const svgRef = useRef(null);

    useEffect(() => {
        // Do nothing until logs start
        if (!data || data.length === 0) {
            return;
        }

        const values = data.map(parseGain);

        // Select the SVG and remove previous content before redrawing
        const svg = d3.select(svgRef.current);
        svg.selectAll("*").remove();

        // determine width and height
        const rect = svg.node().getBoundingClientRect();
        const width = rect.width - 40;
        const height = rect.height - 30;

        // xScale maps the index of the datapoint
        const xScale = d3.scaleLinear()
            .domain([0, values.length - 1])
            .range([0, width]);

        // find max gain to scale y properly
        const maxGain = d3.max(values) || 1;

        // yScale maps gain values
        const yScale = d3.scaleLinear()
            .domain([0, maxGain])
            .range([height, 0]);

        // shift everything to the right
        const chartGroup = svg.append("g")
            .attr("transform", "translate(30,10)");

        // set gradient
        const gradient = chartGroup.append('linearGradient')
            .attr('id', 'line-gradient')
            .attr('gradientUnits', 'userSpaceOnUse')
            .attr('x1', 0)
            .attr('y1', yScale(0))
            .attr('x2', 0)
            .attr('y2', yScale(maxGain));

        // gradient start and end colours
        gradient.append('stop')
            .attr('offset', '0%')
            .attr('stop-color', 'green');

        gradient.append('stop')
            .attr('offset', '100%')
            .attr('stop-color', 'red');

        // line gen for numeric values into a line
        const lineGen = d3.line()
            .x((d, i) => xScale(i))
            .y(d => yScale(d));

        // draw the line graph using the gradient
        chartGroup.append("path")
            .datum(values)
            .attr("fill", "none")
            .attr("stroke", "url(#line-gradient)")
            .attr("stroke-width", 2)
            .attr("d", lineGen);

        // add axis
        const yAxis = d3.axisLeft(yScale);
        chartGroup.append("g").call(yAxis);

    }, [data]);

    return (
        <div className="card shadow-sm border-0 mt-4">
            <div className="card-header bg-info text-white fw-semibold">
                Live D3 Gain Visualiser
            </div>

            <div className="card-body">
                <svg ref={svgRef} width="100%" height="260px" className="border rounded p-1" />
            </div>
        </div>
    );
}
