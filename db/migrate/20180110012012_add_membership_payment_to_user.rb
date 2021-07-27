class AddMembershipPaymentToUser < ActiveRecord::Migration[4.2][5.1]
  def change
    add_column :users, :monthly_dues, :integer, default: 0
  end
end
