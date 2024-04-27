// Sample data
const data = {
    operators: ['Operator A', 'Operator B', 'Operator C'],
    productivity: [85, 90, 88],
    errors: [5, 3, 7],
    duration: [3600, 4200, 3900] // Duration of work in seconds (e.g., 1 hour, 10 minutes, 00 seconds)
};

// Convert duration from seconds to hours
const durationHours = data.duration.map(seconds => seconds / 3600);

// Create Productivity chart
const productivityTrace = {
    x: data.operators,
    y: data.productivity,
    type: "bar",
    name: 'Productivity'
};

const productivityLayout = {
    title: 'Productivity by Operator'
};

Plotly.newPlot('productivity-chart', [productivityTrace], productivityLayout);

// Create Errors chart
const errorsTrace = {
    x: data.operators,
    y: data.errors,
    type: "bar",
    name: 'Errors'
};

const errorsLayout = {
    title: 'Errors by Operator'
};

Plotly.newPlot('errors-chart', [errorsTrace], errorsLayout);
// Create Duration chart
const durationTrace = {
    x: data.operators,
    y: durationHours, // Use duration in hours
    type: 'bar',
    name: 'Duration Worked (hours)'
};

const durationLayout = {
    title: 'Duration of Work by Operator'
};

Plotly.newPlot('duration-chart', [durationTrace], durationLayout);
