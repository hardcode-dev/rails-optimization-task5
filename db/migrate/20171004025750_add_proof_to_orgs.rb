class AddProofToOrgs < ActiveRecord::Migration[4.2][5.1]
  def change
    add_column :organizations, :proof, :text
    add_column :organizations, :approved, :boolean, default: false
  end
end
