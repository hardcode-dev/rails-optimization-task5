class AddVideoDurationInSecondsToArticles < ActiveRecord::Migration[4.2][5.1]
  def change
    add_column :articles, :video_duration_in_seconds, :float, default: 0
  end
end
