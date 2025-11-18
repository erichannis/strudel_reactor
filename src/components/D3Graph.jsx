import { useEffect, useRef } from "react";
import * as d3 from "d3";

export default function D3Graph({ data }) {
    const svgRef = useRef(null);

    useEffect(() => {
        if (!data || data.length === 0) return;

        const svg = d3.select(svgRef.current);
        svg.selectAll("*").remove();

        // Temporary placeholder
        svg.append("text")
            .text("Graph initialised…")
            .attr("x", 10)
            .attr("y", 20)
            .attr("fill", "gray");
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
