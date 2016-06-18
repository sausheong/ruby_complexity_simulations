class Grid < Array
  attr :width
  
  def initialize(size)
    @width = size
    (size*size).times do |i|
      self[i] = Random.rand(0xFFFFFF)
    end    
  end

  def find_neighbours_index(n)
    nb = []
  	case
  	when top_left(n)
  		nb << c5(n) << c7(n) << c8(n)
  	when top_right(n)
  		nb << c4(n) << c6(n) << c7(n)		
  	when bottom_left(n)
  		nb << c2(n) << c3(n) << c5(n)
  	when bottom_right(n)
  		nb << c1(n) << c2(n) << c4(n)
  	when top(n)
  		nb << c4(n) << c5(n) << c6(n) << c7(n) << c8(n)
  	when left(n)
  		nb << c2(n) << c3(n) << c5(n) << c7(n) << c8(n)
  	when right(n)
  		nb << c1(n) << c2(n) << c4(n) << c6(n) << c7(n)
  	when bottom(n)
  		nb << c1(n) << c2(n) << c3(n) << c4(n) << c5(n)
  	else
  		nb << c1(n) << c2(n) << c3(n) << c4(n) << c5(n) << c6(n) << c7(n) << c8(n)
    end
  	nb
  end


  def top_left(n)      n == 0; end
  def top_right(n)     n == @width-1; end
  def bottom_left(n)   n == @width*(@width-1); end
  def bottom_right(n)  n == (@width*@width)-1; end
  
  def top(n)    n < @width; end
  def left(n)   (n%@width) == 0; end
  def right(n)  (n%@width) == @width-1; end
  def bottom(n) n >= (@width*(@width-1)); end
  
  def c1(n) n - @width - 1; end
  def c2(n) n - @width; end    
  def c3(n) n - @width + 1; end
  def c4(n) n - 1; end
  def c5(n) n + 1; end
  def c6(n) n + @width - 1; end        
  def c7(n) n + @width; end
  def c8(n) n + @width + 1; end
      
end