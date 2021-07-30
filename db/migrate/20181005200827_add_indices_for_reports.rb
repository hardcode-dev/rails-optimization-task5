class AddIndicesForReports < ActiveRecord::Migration[4.2][5.1]
  def change
    add_index :feedback_messages, [:reporter_id]
    add_index :feedback_messages, [:affected_id]
    add_index :feedback_messages, [:offender_id]
  end
end
