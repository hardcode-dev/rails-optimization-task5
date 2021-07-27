class AddStatusToChatChannels < ActiveRecord::Migration[4.2][5.1]
  def change
    add_column :chat_channels, :status, :string, default: "active"
  end
end
