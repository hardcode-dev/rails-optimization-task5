class AddStatusToChatChannelMemberships < ActiveRecord::Migration[4.2][5.1]
  def change
    add_column :chat_channel_memberships, :status, :string, default: "active"
  end
end
