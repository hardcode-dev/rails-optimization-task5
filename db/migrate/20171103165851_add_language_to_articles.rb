class AddLanguageToArticles < ActiveRecord::Migration[4.2][5.1]
  def change
    add_column :articles, :language, :string
  end
end
