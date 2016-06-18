require './server'
run Rack::URLMap.new "/" => Sinatra::Application