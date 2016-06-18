require 'sinatra' 
require 'json'
require './grid'
require './culture'
require './segregation'
require './volunteers'

set :culture_sim, CultureSimulation.new(36)
set :segregation_sim, SegregationSimulation.new(36)
set :volunteers_sim, VolunteerSimulation.new

# Segregation

get "/segregation/show" do
  @width = settings.segregation_sim.grid.width
  erb :segregation  
end

get "/segregation/start" do
  content_type :json
  settings.segregation_sim.populate(params[:n].to_i, params[:races].to_i, params[:vacancy].to_i, params[:limit].to_i)
  settings.segregation_sim.grid.to_json
end

get "/segregation" do
  content_type :json
  settings.segregation_sim.tick
  settings.segregation_sim.grid.to_json
end


# Culture

get "/culture/show" do
  @width = settings.culture_sim.grid.width
  erb :culture
end

get "/culture/start" do
  content_type :json
  settings.culture_sim = CultureSimulation.new(36)
  settings.culture_sim.grid.to_json
end

get "/culture" do
  content_type :json
  settings.culture_sim.tick
  settings.culture_sim.grid.to_json
end

get "/culture/stats/show" do
  erb :culture_stats
end

get "/culture/stats" do
  content_type :json
  count, stats = 0, []
  sim  = settings.culture_sim
  sim.fdistances.size.times do |n|
    stats[count] = [count, sim.fdistances[n], sim.changes[n], sim.uniques[n]]
    count += 1
  end
  stats.to_json
end

# Volunteer's Dilemma

get "/volunteers/show" do
  erb :volunteers
end

get "/volunteers" do
  content_type :json
  settings.volunteers_sim.experiment(params[:cost].to_f, params[:overall].to_f, params[:maxn].to_i).to_json  
end
