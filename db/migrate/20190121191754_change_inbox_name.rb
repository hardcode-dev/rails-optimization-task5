class ChangeInboxName < ActiveRecord::Migration[4.2][5.1]
  def change
    rename_column :users, :inbox, :inbox_type
  end
end
