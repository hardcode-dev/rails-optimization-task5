class AddLiveNowBooleanToArticles < ActiveRecord::Migration[4.2][5.1]
  def change
    add_column :articles, :live_now, :boolean, default: false
  end
end
