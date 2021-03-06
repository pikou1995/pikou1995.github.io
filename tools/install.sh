#!/bin/sh

export LC_ALL="en_US.UTF-8"
export LC_CTYPE="en_US.UTF-8"

apt update && apt install -y python3 python3-pip python3-distutils
pip3 install setuptools
pip3 install -U git+https://github.com/shadowsocks/shadowsocks.git@master
SS='ssserver -p port -k password -m aes-256-cfb -d start'

echo '#!/bin/sh -e' > /etc/rc.local
echo $SS >> /etc/rc.local
echo 'exit 0' >> /etc/rc.local
chmod 755 /etc/rc.local

systemctl enable rc-local.service
ln -fs /lib/systemd/system/rc-local.service /etc/systemd/system/rc-local.service
