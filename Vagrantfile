Vagrant.configure(2) do |config|

  # Config params
  config.vm.box = "ubuntu/xenial64"

  # Machine spec
  config.vm.provider "virtualbox" do |v|
    v.memory = 2048
    v.cpus = 2
    v.customize ["setextradata", :id, "VBoxInternal2/SharedFoldersEnableSymlinksCreate/SHARE_NAME", "1"]
  end

  # Forward port for connecting to guest from host machine
  config.vm.network "forwarded_port", guest: 3000, host: 4567

  # Install required programs
  config.vm.provision "shell", :run => 'once', inline: <<-SHELL
    sudo apt-get update
    sudo apt-get install --yes docker docker-compose nodejs npm
    curl https://install.meteor.com | /bin/sh
  SHELL

  # Set up meteor and run
  config.vm.provision "shell", :run => 'always', inline: "/bin/sh /vagrant/cleanup.sh"
  config.vm.provision "shell", :run => 'always', inline: "/bin/sh /vagrant/meteor_install.sh"
  config.vm.provision "shell", :run => 'always', inline: "/bin/sh /vagrant/meteor_run.sh"
end