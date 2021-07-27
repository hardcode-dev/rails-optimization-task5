class AddEmailDigestPeriodicToUser < ActiveRecord::Migration[4.2][5.1]
  def change
    add_column :users, :email_digest_periodic, :boolean, default: true, null: false
  end
end
