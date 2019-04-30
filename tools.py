import re
import os
import subprocess
import time
import requests
import json


def read_from_config(filename):
    try:
        v = {}
        replace_words = ["http_provider", "wallet", "host", "price_limit"]
        for replace_word in replace_words:
            with open(filename, "r+") as f:
                for line in f:
                    if replace_word + ":" in line:
                        v[replace_word] = str(line[len(replace_word) + 1:-1])

        return v

    except Exception:
        raise


container_state = False
default = read_from_config('config/config.ini')


def validate_price_limit(price_limit):
    if re.search("\d+", price_limit):
        return True
    else:
        return False


def validate_wallet(wallet_address):
    if re.search("^[a-fA-F0-9]{40}$", wallet_address):
        return True
    else:
        return False


def validate_url(url):
    regex = re.compile(
        r'^(?:http|ftp)s?://'  # http:// or https:// or ftp://
        r'(?:(?:[A-Z0-9](?:[A-Z0-9-]{0,61}[A-Z0-9])?\.)+(?:[A-Z]{2,6}\.?|[A-Z0-9-]{2,}\.?)|'  # domain...
        r'localhost|'  # localhost...
        r'\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}|'  # ...or ipv4
        r'\[?[A-F0-9]*:[A-F0-9:]+\]?)'  # ...or ipv6
        r'(?::\d+)?'  # optional port
        r'(?:/?|[/?]\S+)$', re.IGNORECASE)

    if regex.match(url):
        return True
    else:
        return False


def write_to_config(filename, **kwargs):
    try:
        replace_words = ["http_provider", "wallet", "host", "price_limit"]
        for replace_word in replace_words:
            with open(filename, "r+") as f:
                lines = [line.replace(line[:], replace_word + ":{}\n".format(kwargs[replace_word]))
                         if replace_word + ":" in line else line
                         for line in f]
                f.seek(0)
                f.truncate()
                f.writelines(lines)

    except Exception:
        raise


def save_data(provider, wallet, host, price_limit):
    f_path = "config/config.ini"
    write_to_config(f_path, http_provider=provider, wallet=wallet, host=host, price_limit=price_limit)


def tcplink_host(sock, addr):
    global container_state
    data = sock.recv(2048).decode()
    if data.endswith('\\r\\n'):
        data = data[:-4]
    print("Progress Status:", data)
    return data.strip()


def rm_container():
    # remove container
    subprocess.call(['docker', 'rm', '-f', 'worker'], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)


def leave_q(json_data):
    """  Leave queue if and only if the miner is still waiting for a task   """
    response = send_sig(json_data)
    msg = "LEAVE: Worker is leaving...  {}".format(response.status_code)
    print(msg)


def forfeit_q(json_data):
    """ Leave queue after getting a task  """
    response = send_sig(json_data)
    msg = "FORFEIT: Worker is forfeiting with a task...  {}".format(response.status_code)
    print(msg)


def send_sig(json_data):
    try:
        post_url = json_data["post_url"]
        del json_data["post_url"]
        response = requests.post(post_url, timeout=2, data=json.dumps(json_data))
        response.raise_for_status()
        return response
    except Exception as e:
        msg = "Network Connection Error: {}".format(e)
        print(msg)
        raise


def create_container(_sharefolder_path_out, _sharefolder_path_inside, _docker, _image):
    docker_info = subprocess.check_output('nvidia-docker run -d --privileged=True --network=host -v {}:{} --name={} {}'
                                          .format(_sharefolder_path_out, _sharefolder_path_inside, _docker, _image)
                                          , shell=True, stderr=subprocess.DEVNULL)
    time.sleep(1)


def manage():
    global container_state

    # create container and map <host data> to <container /nebula-ai/nebula-ai/nebula/config>
    _sharefolder_path_out = os.path.abspath(os.path.join(os.path.dirname(__file__), 'config'))
    _sharefolder_path_inside = "/nebula-ai/nebula-ai/nebula/config"
    _docker = "worker"
    _image = "nbaicloudplatform/tf1.8_torch_cuda9:latest"

    container_state = True

    try:
        create_container(_sharefolder_path_out, _sharefolder_path_inside, _docker, _image)

    except Exception:
        docker_name = subprocess.check_output(['docker', 'rm', '-f', 'worker'], stderr=subprocess.DEVNULL)
        time.sleep(1)
        create_container(_sharefolder_path_out, _sharefolder_path_inside, _docker, _image)

    return







