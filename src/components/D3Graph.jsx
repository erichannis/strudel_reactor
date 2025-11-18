import { useEffect, useRef } from "react";
import * as d3 from "d3";

// Extract gain values from hap logs
function parseGain(logLine) {
    if (!logLine) return 0;
    const parts = logLine.split(/\s+/);
    for (const p of parts) {
        if (p.startsWith("gain:")) {
            const val = Number(p.substring(5));
            if (!isNaN(val)) return val;
        }
    }
    return 0;
}

export default function D3Graph({ data }) {
    const svgRef = useRef(null);

    useEffect(() => {
        if (!data || data.length === 0) return;

        const values = data.map(parseGain);

        const svg = d3.select(svgRef.current);
        svg.selectAll("*").remove();

        const rect = svg.node().getBoundingClientRect();
        const width = rect.width - 20;
        const height = rect.height - 20;

        const xScale = d3.scaleLinear()
            .domain([0, values.length - 1])
            .range([0, width]);

        const maxGain = d3.max(values) || 1;
        const yScale = d3.scaleLinear()
            .domain([0, maxGain])
            .range([height, 0]);

        const chartGroup = svg.append("g")
            .attr("transform", "translate(20,10)");

        const lineGen = d3.line()
            .x((d, i) => xScale(i))
            .y(d => yScale(d));

        chartGroup.append("path")
            .datum(values)
            .attr("fill", "none")
            .attr("stroke", "steelblue")
            .attr("stroke-width", 2)
            .attr("d", lineGen);
    }, [data]);

    return (
        <div className="card shadow-sm border-0 mt-4">
            <div className="card-header bg-info text-white fw-semibold">
                Live D3 Gain Visualiser
            </div>
            <div className="card-body">
                <svg
                    ref={svgRef}
                    width="100%"
                    height="260px"
                    className="border rounded p-1"
                />
            </div>
        </div>
    );
}
