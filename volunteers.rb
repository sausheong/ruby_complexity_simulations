class VolunteerSimulation 
  def experiment(cost, overall, max_players)

    max_players == 0 ? 50 : max_players
    iterations = 2000
    vals = []
    (3..max_players).each do |n|
      vcount = 0
      p = 1 - (cost/overall)**(1.0/(n-1))
      iterations.times do |i|
        (0..n).each do |count|
          if Random.rand < p then 
            vcount += 1
            break
          end          
        end
      end
      vals << vcount
    end
    output = []
    vals.each_with_index do |v, c|
      output[c] = [c+3, v*100/iterations]      
    end
    output
  end
end