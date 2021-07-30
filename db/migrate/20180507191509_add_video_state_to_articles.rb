class AddVideoStateToArticles < ActiveRecord::Migration[4.2][5.1]
  def change
    add_column :articles, :video_state, :string
  end
end
