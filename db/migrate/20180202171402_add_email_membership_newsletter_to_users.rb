class AddEmailMembershipNewsletterToUsers < ActiveRecord::Migration[4.2][5.1]
  def change
    add_column :users, :email_membership_newsletter, :boolean, default: false
  end
end
