class CultureSimulation 
  attr :grid, :fdistances, :changes, :uniques, :mask, :mask_array, :size
  
  def initialize(size=36) 
    @grid = Grid.new(size)
    @size = size
    @mask = 0x000000F
    @mask_array = [0xFFFFF0, 0xFFFF0F, 0xFFF0FF, 0xFF0FFF, 0xF0FFFF, 0x0FFFFF]
    @fdistances, @changes, @uniques = [], [], []      
  end
  
  def tick
  	change = 0
  	2000.times do |c|
  		r = Random.rand(@grid.size)
  		neighbours = @grid.find_neighbours_index(r)
  		neighbours.each do |neighbour|
  			d = diff(r, neighbour)
  			probability = 1 - d/96.0
  			if Random.rand < probability then
  				i = Random.rand(6)
  				if d != 0 then
  					rp = 0
  					if Random.rand(1) == 0 then
  						replacement = extract(@grid[r], i)
  						rp = replace(@grid[neighbour], replacement, i)
  					else 
  						replacement = extract(@grid[neighbour], i)
  						rp = replace(@grid[r], replacement, i)
            end
  					@grid[neighbour] = rp
  					change += 1
          end
        end
      end
    end
  	@fdistances << feature_distance_average
  	@changes << change/@size
  	@uniques << @grid.uniq.size
  end
  
  def diff(a1, a2)
    difference = 0
    6.times do |i|
  		difference += trait_distance(@grid[a1], @grid[a2], i)
    end
  	difference
  end
  
  def feature_distance_average
  	count, dist = 0, 0
    @grid.size.times do |c|
  		neighbours = @grid.find_neighbours_index(c)
  		neighbours.each do |neighbour|
  			count += 1
  			dist += feature_distance(@grid[c], @grid[neighbour])
      end
    end
  	dist/@size
  end
  
  def feature_distance(n1, n2)
  	features = 0
  	6.times do |i|
  		f1, f2 = extract(n1, i), extract(n2, i)
  		features += 1 if f1 == f2 
    end
  	6 - features
  end
  
  def trait_distance(n1, n2, pos) 
  	d = extract(n1, pos) - extract(n2, pos)
  	if d < 0 then
  		return d * -1
  	else
  		return d
    end
  end

  def extract(n, pos)
  	return (n >> (4 * pos)) & @mask
  end

  def replace(n, replacement, pos)
  	i1 = n & @mask_array[pos]
  	mask2 = replacement << (4 * pos)
  	return (i1 ^ mask2)
  end

  
end