class AddAvatarToImages < ActiveRecord::Migration[5.2]
  def change
    add_column :images, :avatar, :string
  end
end
