#!/bin/bash
#install docker on ubuntu16.04 LTS
sudo apt-get -y remove docker docker-engine docker.io
sudo apt-get update
sudo apt-get install -y\
    apt-transport-https \
    ca-certificates \
    curl \
    software-properties-common
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
sudo apt-key fingerprint 0EBFCD88
sudo add-apt-repository \
   "deb [arch=amd64] https://download.docker.com/linux/ubuntu \
   $(lsb_release -cs) \
   stable"
sudo apt-get update
sudo apt-get install -y docker-ce
sudo groupadd docker
sudo usermod -aG docker $USER
sudo docker run hello-world


#install nvidia-docker
# If you have nvidia-docker 1.0 installed: we need to remove it and all existing GPU containers
docker volume ls -q -f driver=nvidia-docker | xargs -r -I{} -n1 docker ps -q -a -f volume={} | xargs -r docker rm -f
sudo apt-get purge -y nvidia-docker

# Add the package repositories
curl -s -L https://nvidia.github.io/nvidia-docker/gpgkey | \
  sudo apt-key add -
distribution=$(. /etc/os-release;echo $ID$VERSION_ID)
curl -s -L https://nvidia.github.io/nvidia-docker/$distribution/nvidia-docker.list | \
  sudo tee /etc/apt/sources.list.d/nvidia-docker.list
sudo apt-get update

# Install nvidia-docker2 and reload the Docker daemon configuration
sudo apt-get install -y nvidia-docker2
sudo pkill -SIGHUP dockerd

# Test nvidia-smi with the latest official CUDA image
docker run --runtime=nvidia --rm nvidia/cuda:9.0-base nvidia-smi

# Check python version
if command -v python3 &>/dev/null &>/dev/null; then
    OUTPUT=`python3 --version 2>&1`
    echo "${OUTPUT} is detected."
    # Install python3 packages
    sudo apt-get install unzip
    sudo apt-get install python3-pip
    sudo apt-get update
    sudo pip3 install click
    sudo pip3 install requests
else
    if command -v python &>/dev/null &>/dev/null; then
        OUTPUT=`python --version 2>&1`
        echo "${OUTPUT} is detected."
        py=`echo ${OUTPUT} | cut -d' ' -f 2 | cut -d'.' -f 1`
        if [[ $py -ne "3" ]]; then
            echo "Installation Failed. Cannot detect Python3. Please install Python 3.5 or later version."
            $(`kill -SIGINT $$`)
        else
            # Install python packages
            sudo apt-get install unzip
            sudo apt-get install python-pip
            sudo apt-get update
            sudo pip install click
            sudo pip install requests
        fi
    fi
fi

# echo installation completed
echo "Installed Successfully."
