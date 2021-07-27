class AddLastNotificationActivityToUsers < ActiveRecord::Migration[4.2][5.0]
  def change
    add_column :users, :last_notification_activity, :datetime
  end
end
