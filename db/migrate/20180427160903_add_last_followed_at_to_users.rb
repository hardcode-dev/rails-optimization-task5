class AddLastFollowedAtToUsers < ActiveRecord::Migration[4.2][5.1]
  def change
    add_column :users, :last_followed_at, :datetime
  end
end
