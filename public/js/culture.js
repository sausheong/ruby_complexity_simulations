var intervalId;

var Grid = React.createClass({  
  load: function(u) {
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
        console.error(u, status, err.toString());
      }.bind(this)
    });
  },
  tick: function() {
    this.load(this.props.tick);
  },
  start: function() {
    this.load(this.props.start);
  },  
  getInitialState: function() {
    return {
      data: [],
    };
  },
  componentDidMount: function() {
    this.start();
  },
  handleSetup: function() {
    clearInterval(intervalId);
    this.start();
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
              <div className="thumbnail nopadding" style={{backgroundColor: "#" + o.toString(16)}}>&nbsp;</div>
            </div>
          )}
        </div>
        <hr/>
        <div className="text-center">          
          <button className="btn btn-default" onClick={this.handleSetup}>Setup</button>
          <button className="btn btn-default" onClick={this.handleStart}>Start</button>
        </div>          
      </div>      
    );
  },  
});

React.render(
    <Grid tick="/culture" start="/culture/start"/>, document.getElementById('content')
);