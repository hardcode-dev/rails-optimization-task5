class AddUpdatedTimestampsToUsers < ActiveRecord::Migration[4.2][5.1]
  def change
    add_column :users, :mentee_form_updated_at, :timestamp
    add_column :users, :mentor_form_updated_at, :timestamp
  end
end
