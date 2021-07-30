class RemoveBannedFromUsers < ActiveRecord::Migration[4.2][5.1]
  def change
    remove_column :users, :banned
  end
end
