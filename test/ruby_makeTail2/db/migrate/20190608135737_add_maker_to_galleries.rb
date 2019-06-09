class AddMakerToGalleries < ActiveRecord::Migration[5.2]
  def change
    add_column :galleries, :maker, :string
  end
end
