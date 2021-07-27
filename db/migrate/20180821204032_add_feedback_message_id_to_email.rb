class AddFeedbackMessageIdToEmail < ActiveRecord::Migration[4.2][5.1]
  def change
    add_column :ahoy_messages, :feedback_message_id, :integer
  end
end
