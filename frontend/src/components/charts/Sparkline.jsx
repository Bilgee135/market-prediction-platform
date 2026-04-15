/*
 * components/charts/Sparkline.jsx
 *
 * What this is:
 *   A small inline chart used as a visual thumbnail inside model cards.
 *   Does not show axes or labels — purely decorative context.
 *
 * Where it is used:
 *   - ModelCard.jsx in the carousel on ModelsPage
 *   - MiniModelCard.jsx on EvaluationsPage
 *
 * What it should contain:
 *   - A compact SVG line chart
 *   - Generated from a seed value or a small hardcoded data array per model
 *   - Coloured to match the model's accent colour
 *
 * Props:
 *   data    array of numbers representing price points
 *   chartlineColour   hex string for the line colour
 *   width   optional width override
 *   height  optional height override
 *
 * Development order:
 *   Build when starting ModelCard. Keep it simple — a polyline SVG is
 *   sufficient. No interactivity required.
 */

export default function Sparkline({ data, chartlineColour = '#2563eb', width = 200, height = 80 }) {
  if (!data || data.length === 0) return null;

  //here I am finding the smallest and biggest numbers in the data array
  //everything needs to fit nicely inside the box
  const minimum = Math.min(...data);
  const maximum = Math.max(...data);

  /*
   * im converting each number in the data array into an x,y coordinate
   * so basically x is how far across left to right that points are spread evenly
   * then y is how far down so svg starts from the top so its flipped
   * higher values will need a smaller y to appear higher up on the chart
   */

  const points = data
    .map((value, index) => {
      const xPosition = (index / (data.length - 1)) * width;
      const yPosition = height - ((value - minimum) / (maximum - minimum)) * height;
      return `${xPosition}, ${yPosition}`;
    })
    .join(' ');

  /*
   * im creating a shaded area underneath the line
   * so it starts at the bottom left corner the follows the same line points
   * then it comes back down to the bottom right to close the shape
   * so basically a closed polygon shape that sits under the line
   */

  const shadedAreaCoordinates = [
    `0, ${height}`,
    ...data.map((value, index) => {
      const xPosition = (index / (data.length - 1)) * width;
      const yPosition = height - ((value - minimum) / (maximum - minimum)) * height;
      return `${xPosition},${yPosition}`;
    }),
    `${width},${height}`,
  ].join(' ');

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="none"
    >
      <defs>
        {/* using the color id so each model gets its own unique gradient because if not then all models would share the same gradient */}
        <linearGradient
          id={`sparkline-gradient-${chartlineColour.replace('#', '')}`}
          x1="0"
          y1="0"
          x2="0"
          y2="1"
        >
          <stop offset="0%" stopColor={chartlineColour} stopOpacity="0.2" />
          <stop offset="100%" stopColor={chartlineColour} stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* the shaded fill area underneath the line */}

      <polygon
        points={shadedAreaCoordinates}
        fill={`url(#sparkline-gradient-${chartlineColour.replace('#', '')})`}
      />

      {/* the actual line the polyline just connects a list of x,y position points with a line */}
      <polyline
        points={points}
        fill="none"
        stroke={chartlineColour}
        strokeWidth="2"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
}
