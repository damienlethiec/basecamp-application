class PagesController < ApplicationController

  def how_I_work
  	@arguments = YAML.load_file("#{Rails.root}/config/how_i_work.yml")
  end
end
