#!/usr/bin/env bash
export DEBIAN_FRONTEND=noninteractive

source ./src/tools/colors.sh

rm -rf /var/cache/debconf/*.*

echo -e "\n"
header "Preparing Environment For The Installer"

info "Updating Packages ..."
update=`apt-get -qq update 2>&1`
if [[ $update == *" NO_PUBKEY "* ]]; then
    key=`echo "$update" | cut -d " " -f 21`
    if [[ ${#key} -gt 1 ]]; then
        warning "Adding ${key} to keyserver ..."
        addKey=`gpg --keyserver keyserver.ubuntu.com --recv ${key} && gpg --export --armor ${key} 2>&1 | sudo apt-key add -`
        warning ${addKey}
    fi
fi
success "OK"

info "Installing NodeJS and NPM ..."
curl -sL https://deb.nodesource.com/setup_14.x > "/dev/null" 2>&1 | sudo -E bash -
apt-get install -qq nodejs > "/dev/null" 2>&1
success "OK"

header "Launching The Installer ..."

node 'build/installer.js' $@
