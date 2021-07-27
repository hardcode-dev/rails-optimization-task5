class AddMissingIndexes < ActiveRecord::Migration[4.2][5.1]
  def change
    add_index :users, :username, unique: true
    add_index :organizations, :slug, unique: true
    add_index :articles, :slug
    add_index :articles, :hotness_score
    add_index :articles, :featured_number
    add_index :articles, :published_at
  end
end
