var Chart = React.createClass({
  load: function() {
    var u = this.props.url;
    $.ajax({
      url: u,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({
          data: data,
        });
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });

  },
  getInitialState: function() {
    return {
      data : {
      time: [],
      distances: [],
      changes: [],
      uniques: [],
      }
    };
  },
  componentWillMount: function() {
    this.load();
    setInterval(this.load, 500); 
  },
  componentDidMount: function() { 
    this.drawChart();
  },
  componentDidUpdate: function() {
    this.drawChart();
  },
  render: function() {
	  var a = [];
	  if (this.state.data.length > 0) {
		  a = this.state.data[this.state.data.length-1];
	  } 
  
    return ( 
		<div>
	        <div id="chart"/>
			<hr/>
			<div className="text-center">
				<div className="label label-info">Tick {a[0]}</div> &nbsp;
				<div className="label label-primary">Cultural distance {a[1]}</div>  &nbsp;
				<div className="label label-warning">Unique cultures {a[3]}</div>  &nbsp;
				<div className="label label-danger">Changes {a[2]}</div> 
			</div>
		</div>
    );
  },  
  drawChart: function() {
    // Create the data table.
    var array = this.state.data;
    if (array.length > 0) {
      array.unshift(["Time", "Distance", "Changes", "Uniques"]);
      var data = new google.visualization.arrayToDataTable(array, false);    
      var options = {
        title: 'Clash of Cultures',
        height: '400',
        hAxis: {
          title: "Time",          
        },
        legend: {
          position: "bottom",
        },
        chartArea: {
          width: "100%", 
          height: "80%",
        },
      };
      var chart = new google.visualization.LineChart(document.getElementById('chart'));
      chart.draw(data, options);
    }
  }
});

React.render(
    <Chart url="/culture/stats"/>, document.getElementById('content')
);