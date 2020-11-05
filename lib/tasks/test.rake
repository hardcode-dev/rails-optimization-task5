namespace :test do
  desc "run"
  task run: :environment do
    cmd = "rspec"
    cmd = "bundle exec rake 'parallel:spec[3]'"
    puts "Running rspec via `#{cmd}`"
    command = TTY::Command.new(printer: :quiet, color: true)

    start = Time.now
    begin
      command.run(cmd)
    rescue TTY::Command::ExitError
      puts 'TEST FAILED SAFELY'
    end

    # sleep(rand(10) + 3)
    finish = Time.now

    puts 'SENDING METRIC TO INFLUXDB'
    TestMetrics.write(user: 'spajic', run_time_seconds: (finish - start).to_i)
  end
end
