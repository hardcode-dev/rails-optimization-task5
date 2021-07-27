class AddOrganizationToNotifications < ActiveRecord::Migration[4.2][5.1]
  def change
    add_column :notifications, :organization_id, :bigint
  end
end
