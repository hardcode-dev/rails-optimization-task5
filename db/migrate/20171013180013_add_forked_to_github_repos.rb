class AddForkedToGithubRepos < ActiveRecord::Migration[4.2][5.1]
  def change
    add_column :github_repos, :fork, :boolean, default: false
  end
end
