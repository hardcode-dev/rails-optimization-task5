class UpdateFeedbackMessageNoteSystem < ActiveRecord::Migration[4.2][5.1]
  def change
    remove_column :feedback_messages, :reviewer_id
    add_column :notes, :author_id, :integer
  end
end
