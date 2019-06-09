class MakeyourownsController < ApplicationController
  
  def makeyourown
  end

  def recommendation
  end

  def gallery
    render
  end
  
  def create
    @gallery = makeyourown.new(makeyourown_params)
 
    
  end

  def new
    @makeyourown = Makeyourown.new
  end


end
