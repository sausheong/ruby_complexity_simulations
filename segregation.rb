class SegregationSimulation 
  attr :grid, :neighbourliness, :limit, :size
  
  def initialize(size=36) 
    @grid = Grid.new(size)
    @size = size
    @neighbourliness, @limit = 0, 0
  end
  
  def populate(nb, races, vacancy, lm) 
  	@neighbourliness = nb
  	@limit = lm
  	v = vacancy / 10.0    
    
    @grid.size.times do |n|
  		rnd = Random.rand
      # v % of the grid are empty
  		if rnd > v then
  			rnd2 = Random.rand(races)
  			case rnd2 
  			when 0
  				@grid[n] = "#FF5050"
  			when 1
  				@grid[n] = "#0099FF"
  			when 2
  				@grid[n] = "#FFCC00"
  			when 3
  				@grid[n] = "#009900"
  			when 4
  				@grid[n] = "#CC00CC"
  			when 5
  				@grid[n] = "#FF9900"
        end
  		else
  			@grid[n] = "white"
  		end   
    end  
  end
  
  # every tick processes all cells in the grid
  def tick
  	# check every cell
    @grid.each_with_index do |cell, cell_number|

  		# if cell is empty, go to the next cell
  		next if cell == "white" 
  		
  		# find all the cell's neighbours
  		neighbours = @grid.find_neighbours_index(cell_number)
  		# count of the neighbours that are the same as the cell
  		same_count = 0
  		# for every neighbour
      neighbours.each do |neighbour|
  			# if the cell is empty, go to the next neighbour
  			next if @grid[neighbour] == "white" 
        
  			# if the neighbour is the same, increment sameCount
  			if @grid[neighbour] == cell then
  				same_count += 1
        end
      end
  		# if there are 2 or less neighbours that are the same
  		# as this cell
  		if same_count <= neighbourliness || same_count > limit then
  			empty = find_empty
  			e = find_random_empty empty
  			@grid[e] = cell
  			@grid[cell_number] = "white"
      end
    end
  end
  
  
  # find the index of a random empty cell in the grid
  def find_random_empty(empty)
  	r = Random.rand(empty.size)
  	return empty[r]
  end

  # find all cells that are empty in the grid
  def find_empty
    empty = []
    @grid.each_with_index do |cell, n|
  		if cell == "white" then
  			empty << n
      end
    end
  	empty
  end
  
end