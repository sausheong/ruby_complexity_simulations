var loading = false;

var Chart = React.createClass({
  load: function(cost, overall, maxn) {
    loading = true;
    var u = this.props.url + "?cost=" + cost + "&overall=" + overall + "&maxn=" + maxn;
    $.ajax({
      url: u,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({
          data: data,
        });
        loading = false;
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });

  },
  getInitialState: function() {
    return {
      data: [],
    };
  },
  componentWillMount: function() {
    this.load();
  },
  componentDidMount: function() { 
    this.handleSlider();   
    this.drawChart();
  },
  componentDidUpdate: function() {
    this.drawChart();
  },
  handleSlider: function(event) {
    console.log("handling slider");
    if (loading != true) {
      var cost = document.getElementById('costSlider').value;
      document.getElementById('cost').innerHTML = cost;
      var overall = document.getElementById('overallSlider').value;
      document.getElementById('overall').innerHTML = overall;
      var maxn = document.getElementById('agentSlider').value;
      document.getElementById('maxn').innerHTML = maxn;
      this.load(cost, overall, maxn);
    }
  },

  render: function() {
    return ( 
      <div>
        <div id="chart" style={chartStyle}/>
        <div style={slidersStyle}>          
          <div>
            <input style={sliderStyle} id="costSlider" type="range" 
                   min="0" max="100" defaultValue="50" onChange={this.handleSlider}/>
            <p>Volunteer Cost: <span id="cost">50</span></p>
          </div>       
          <div>
            <input style={sliderStyle} id="overallSlider" type="range" 
                   min="0" max="100" defaultValue="50" onChange={this.handleSlider}/>
            <p>Overall Cost: <span id="overall">50</span></p>
          </div>
          <div>
            <input style={sliderStyle} id="agentSlider" type="range" 
                   min="2" max="100" defaultValue="50" onChange={this.handleSlider}/>
            <p>Max Agents: <span id="maxn">50</span></p>
          </div>
        </div>
      </div>
    );
  },  
  drawChart: function() {
    // Create the data table.
    var array = this.state.data;
    if (array.length > 0) {
      array.unshift(["Agents", "Probability"]);
      var data = new google.visualization.arrayToDataTable(array, false);    
      var options = {
            curveType: 'function',
            legend: {position: 'none'},
            hAxis: {
              title: 'Number of agents',
              minValue: 2,
            },
            vAxis: {
              title: 'Probability of volunteering',
              minValue: 0,
              maxValue: 100,
            },
            title: 'Volunteers Dilemma',
      };
      var chart = new google.visualization.LineChart(document.getElementById('chart'));
      chart.draw(data, options);
    }
  }
});

var chartStyle = {
  height: '400px',
};

var slidersStyle = {
  fontFamily: 'Trebuchet MS, Tahoma, sans-serif',
  textAlign: 'center',
};

var sliderStyle = {
  width: '400px',
};


React.render(
  <Chart url="/volunteers"/>, document.getElementById('content')
);