class AddCommentTemplateToArticle < ActiveRecord::Migration[4.2][5.1]
  def change
    add_column :articles, :comment_template, :string
  end
end
