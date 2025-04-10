 1459  cd buildyourdream/
 1460  ll
 1461  sudo apt update
 1462  sudo apt install ruby-full build-essential zlib1g-dev
 1463  echo '# Install Ruby Gems to ~/.gem' >> ~/.bashrc
 1464  echo 'export GEM_HOME="$HOME/.gem"' >> ~/.bashrc
 1465  echo 'export PATH="$HOME/.gem/bin:$PATH"' >> ~/.bashrc
 1466  source ~/.bashrc
 1467  gem install jekyll bundler
 1468  bundle init
 1469  gem "jekyll"
 1470  bundle exec jekyll serve
 1471  bundle install
 1472  bundle exec jekyll serve
 1473  history
