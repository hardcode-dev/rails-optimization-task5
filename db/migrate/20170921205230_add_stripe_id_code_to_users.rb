class AddStripeIdCodeToUsers < ActiveRecord::Migration[4.2][5.1]
  def change
    add_column :users, :stripe_id_code, :string
  end
end
