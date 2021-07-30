class AddBadgeNotificationSettingToChatChannelMemberships < ActiveRecord::Migration[4.2][5.1]
  def change
    add_column :chat_channel_memberships, :show_global_badge_notification, :boolean, default: true
  end
end
