class RemoveSlugFromFeedbackMessages < ActiveRecord::Migration[4.2][5.1]
  def change
    remove_column :feedback_messages, :slug
  end
end
