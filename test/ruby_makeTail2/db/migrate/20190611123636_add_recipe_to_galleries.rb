class AddRecipeToGalleries < ActiveRecord::Migration[5.2]
  def change
    add_column :galleries, :recipe, :text
  end
end
