// Monthly Sales Data
let salesData = [12000, 15000, 18000, 22000, 20000, 25000];

// Weekly Revenue Data
let revenueData = [3000, 4000, 3500, 5000, 4200, 4800, 5200];

// Category Data
let categoryData = [40, 25, 20, 15];

// Bar Chart (Sales)
const salesChart = new Chart(
document.getElementById("salesChart"),
{
type: 'bar',

data: {
labels: ["Jan","Feb","Mar","Apr","May","Jun"],
datasets: [{
label: "Sales ($)",
data: salesData,
backgroundColor: "rgba(54,162,235,0.7)"
}]
}
});

// Doughnut Chart
const categoryChart = new Chart(
document.getElementById("categoryChart"),
{
type: 'doughnut',

data: {
labels: ["Electronics","Clothing","Groceries","Others"],
datasets: [{
data: categoryData,
backgroundColor: [
"#ff6384",
"#36a2eb",
"#ffce56",
"#4bc0c0"
]
}]
}
});

// Line Chart
const revenueChart = new Chart(
document.getElementById("revenueChart"),
{
type: 'line',

data: {
labels: ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],
datasets: [{
label: "Revenue ($)",
data: revenueData,
borderColor:"#4bc0c0",
fill:false
}]
}
});

// Interactive Update Button
function updateData(){

salesChart.data.datasets[0].data =
salesData.map(()=>Math.floor(Math.random()*30000));

revenueChart.data.datasets[0].data =
revenueData.map(()=>Math.floor(Math.random()*6000));

categoryChart.data.datasets[0].data =
categoryData.map(()=>Math.floor(Math.random()*50));

salesChart.update();
revenueChart.update();
categoryChart.update();
}