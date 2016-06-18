var intervalId;

var Grid = React.createClass({  
  load: function(u) {
    $.ajax({
      url: u,
      dataType: 'json',
      cache: false,
      success: function(data) {
        console.log(u);
        this.setState({
          data: data,
        });
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(u, status, err.toString());
      }.bind(this)
    });
  },
  tick: function() {
    this.load(this.props.tick);
  },
  start: function(neighbourliness, races, vacancy, limit) {
    var url = this.props.start + "?n=" + neighbourliness + "&races=" + races + "&vacancy=" + vacancy + "&limit=" + limit
    this.load(url);
  },  
  getInitialState: function() {
    return {
      data: [],
    };
  },
  componentWillMount: function() {
    this.start(2, 2, 2, 8);
  },
  componentDidMount: function() {
  //   this.tick();
  //   setInterval(this.tick, 1000);
  },
  handleNeighbourliness: function() {
    var neighbourliness = document.getElementById('neighbourliness').value;
    document.getElementById('neighbourlinessDisplay').innerHTML = neighbourliness;
  },
  handleRaces: function() {
    var races = document.getElementById('races').value;
    document.getElementById('racesDisplay').innerHTML = races;
  },
  handleVacancy: function() {
    var vacancy = parseInt(document.getElementById('vacancy').value)*10;
    document.getElementById('vacancyDisplay').innerHTML = vacancy + "%";
  },
  handleLimit: function() {
    var limit = document.getElementById('limit').value;
    document.getElementById('limitDisplay').innerHTML = limit;
  },    
  handleSetup: function() {
    clearInterval(intervalId);
    var neighbourliness = document.getElementById('neighbourliness').value;
    var races = document.getElementById('races').value;
    var vacancy = document.getElementById('vacancy').value;
    var limit = document.getElementById('limit').value;
    this.start(neighbourliness, races, vacancy, limit);
  },
  handleStart: function() {
      this.tick();
      intervalId = setInterval(this.tick, 500);    
  },
  render: function() {
    return ( 
      <div className="container">
        <div className="row">
        {this.state.data.map((o, i) =>
            <div key={i} className="col-lg-1 col-sm-1 col-md-1 col-xs-1 nopadding">
              <div className="thumbnail nopadding" style={{backgroundColor: o}}>&nbsp;</div>
            </div>
          )}
        </div>
          <hr/>
        <div className="row text-center">          
          <div className="col-md-9">
            <input id="neighbourliness" type="range" min="0" max="8" defaultValue="2" onChange={this.handleNeighbourliness}/>
            Acceptable no of neighbours: <span id="neighbourlinessDisplay">2</span>          
          </div>
          <div className="col-md-9">          
            <input id="races" type="range" min="2" max="6" defaultValue="2" onChange={this.handleRaces}/>
            Number of races: <span id="racesDisplay">2</span>          
          </div>
          <div className="col-md-9">          
            <input id="vacancy" type="range" min="1" max="10" defaultValue="2" onChange={this.handleVacancy}/>
            Vacancy of cells: <span id="vacancyDisplay">20%</span>          
          </div>          
          <div className="col-md-9">          
            <input id="limit" type="range" min="2" max="8" defaultValue="8" onChange={this.handleLimit}/>
            Neighbour quota: <span id="limitDisplay">8</span>          
          </div>          
        </div>  
        <br/>
        <div className="text-center">          
          <button className="btn btn-default" onClick={this.handleSetup}>Setup</button>
          <button className="btn btn-default" onClick={this.handleStart}>Start</button>
        </div>          
      </div>      
    );
  },  
});


React.render(
  <Grid tick="/segregation" start="/segregation/start"/>, document.getElementById('content')
);