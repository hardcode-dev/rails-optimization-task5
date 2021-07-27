class AddEmailMentionNotificationsToUsers < ActiveRecord::Migration[4.2][5.1]
  def change
    add_column :users, :email_mention_notifications, :boolean, default: true
  end
end
