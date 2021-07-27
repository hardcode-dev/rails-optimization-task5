class DropLinksTable < ActiveRecord::Migration[4.2][5.1]
  def change
    drop_table :links
  end
end
