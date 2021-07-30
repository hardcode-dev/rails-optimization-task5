class AddMobileCommentNotificationsToUsers < ActiveRecord::Migration[4.2][5.1]
  def change
    add_column :users, :mobile_comment_notifications, :boolean, default: true
  end
end
