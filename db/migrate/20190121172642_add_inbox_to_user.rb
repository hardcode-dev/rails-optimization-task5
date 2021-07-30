class AddInboxToUser < ActiveRecord::Migration[4.2][5.1]
  def change
    add_column :users, :inbox, :string, default: "private"
  end
end
