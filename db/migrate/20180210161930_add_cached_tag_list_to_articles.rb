class AddCachedTagListToArticles < ActiveRecord::Migration[4.2][5.1]
  def change
    add_column :articles, :cached_tag_list, :string
  end
end
